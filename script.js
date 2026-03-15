
import { 
    collection, addDoc, onSnapshot, query, orderBy, doc, getDoc, updateDoc, arrayUnion, arrayRemove 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { db } from "./firebase-config.js";

const movies = [
    { id: 1, title: "Interstellar", year: 2014, rating: 8.7, genre: "Bilim Kurgu", image: "img/interstellar.jpg", type: "Film", desc: "Dünya yaşanmaz bir hal alınca bir grup astronot yeni bir yuva bulmak için yola çıkar. Satürn yakınlarındaki bir solucan deliğinden geçerek bilinmez galaksilere adım atarlar. Zaman ve sevginin boyutlarını aşan epik bir yolculuk başlar." },
    { id: 2, title: "Inception", year: 2010, rating: 8.8, genre: "Aksiyon", image: "img/inception.jpg", type: "Dizi", desc: "Rüyalar alemi, bir hırsızın en değerli sırları çalabileceği en savunmasız yerdir. Dom Cobb, bu tehlikeli dünyada bir fikri çalmak yerine onu yerleştirmekle görevlendirilir. Gerçeklik ile rüya arasındaki çizgi hiç bu kadar bulanık olmamıştı." },
    { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genre: "Dram", image: "img/dark-knight.jpg", type: "Film", desc: "Batman, Gotham şehrini suçtan arındırmak için var gücüyle savaşmaktadır. Ancak kaosun temsilcisi Joker'in ortaya çıkmasıyla her şey altüst olur. Şehrin kaderi, bir kahramanın fedakarlığı ile bir delinin oyunları arasında asılı kalır." },
    { id: 4, title: "The 100", year: 2014, rating: 7.6, genre: "Macera", image: "img/the100.jpg", type: "Dizi", desc: "Nükleer kıyametten 97 yıl sonra, insanlığın son temsilcileri uzay istasyonunda yaşamaktadır. Dünyanın yaşanabilir olup olmadığını test etmek için 100 genç suçlu aşağıya gönderilir. Vahşi doğada hayatta kalmak, beklediklerinden çok daha zor olacaktır." },
    { id: 5, title: "The Martian", year: 2015, rating: 8.0, genre: "Bilim Kurgu", image: "img/martian.jpg", type: "Film", desc: "Mars'a düzenlenen bir görev sırasında çıkan fırtına, bir astronotun öldü sanılıp geride bırakılmasına neden olur. Mark Watney, kısıtlı imkanlarla bu ıssız gezegende hayatta kalmanın yollarını arar. Zekası ve azmiyle dünyaya 'buradayım' demeye çalışır." },
    { id: 6, title: "Avatar", year: 2009, rating: 7.9, genre: "Bilim Kurgu", image: "img/avatar.jpg", type: "Film", desc: "Pandora'nın gizemli dünyası, paha biçilemez kaynaklar için insanların istilasına uğrar. Eski bir asker olan Jake, bir avatar aracılığıyla yerel halkın arasına karışır. Kendi türü ile kalbinin seçtiği halk arasında zorlu bir seçim yapmak zorunda kalır." },
    { id: 7, title: "Titanic", year: 1997, rating: 7.9, genre: "Romantik", image: "img/titanic.jpg", type: "Film", desc: "Döneminin en lüks ve 'batmaz' denilen gemisi Titanik, ilk seferine çıkar. Farklı sosyal sınıflardan Jack ve Rose, bu devasa gemide imkansız bir aşka tutulur. Ancak Atlas Okyanusu'ndaki bir buz dağı, bu hikayeyi sonsuz bir trajediye dönüştürür." },
    { id: 8, title: "Gladiator", year: 2000, rating: 8.5, genre: "Aksiyon", image: "img/gladiator.jpg", type: "Film", desc: "General Maximus, ihanete uğrayarak ailesini kaybeder ve köle pazarında satılır. Bir gladyatör olarak arenalarda yükselip Roma'nın kalbine kadar ilerler. Tek amacı, imparatordan intikamını almak ve Roma'ya özgürlüğünü geri vermektir." },
    { id: 9, title: "Joker", year: 2019, rating: 8.4, genre: "Dram", image: "img/joker.jpg", type: "Film", desc: "Toplum tarafından dışlanan Arthur Fleck, başarısız bir komedyen olarak hayatını sürdürür. Şehrin kaosu ve uğradığı haksızlıklar onu yavaş yavaş karanlığa sürükler. Sonunda, Gotham'ın görüp göreceği en büyük anarşi sembolüne dönüşür." },
    { id: 10, title: "Fight Club", year: 1999, rating: 8.8, genre: "Dram", image: "img/fight-club.jpg", type: "Film", desc: "Uykusuzluk çeken bir ofis çalışanı, hayatının monotonluğundan kurtulmak için Tyler Durden ile tanışır. Birlikte kurdukları dövüş kulübü, kısa sürede yeraltı bir orduya dönüşür. Tüketim toplumuna karşı başlatılan bu isyan, beklenmedik gerçekleri ortaya çıkarır." },
    { id: 11, title: "The Matrix", year: 1999, rating: 8.7, genre: "Bilim Kurgu", image: "img/matrix.jpg", type: "Film", desc: "Sıradan bir yazılımcı olan Neo, yaşadığı dünyanın aslında bir simülasyon olduğunu keşfeder. Morpheus önderliğindeki isyancılara katılarak makinelerle savaşa başlar. Gerçeği seçmek, insanlığın son umudu olmayı kabul etmek demektir." },
    { id: 12, title: "Forrest Gump", year: 1994, rating: 8.8, genre: "Dram", image: "img/forrest-gump.jpg", type: "Film", desc: "Düşük IQ'lu bir adamın, çocukluk aşkı Jenny'yi beklerken yaşadığı inanılmaz maceraları konu alır. Farkında olmadan Amerikan tarihinin en önemli anlarına tanıklık ve eşlik eder. Forrest, saf kalbiyle herkese hayatın bir kutu çikolata gibi olduğunu gösterir." },
    { id: 13, title: "Avengers: Endgame", year: 2019, rating: 8.4, genre: "Aksiyon", image: "img/endgame.jpg", type: "Film", desc: "Thanos'un evrenin yarısını yok etmesinden sonra geride kalan kahramanlar umutlarını yitirmez. Kaybettikleri dostlarını geri getirmek için zamanın ötesinde tehlikeli bir plan yaparlar. Bu savaş, Marvel dünyasının en büyük ve son hesaplaşması olacaktır." },
    { id: 14, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genre: "Dram", image: "img/shawshank.jpg", type: "Film", desc: "İşlemediği bir suçtan ömür boyu hapse mahkum edilen Andy, Shawshank hapishanesinin sert koşullarına alışmaya çalışır. Zekasıyla hapishanede kendine bir yer edinir ve Red ile derin bir dostluk kurar. Umudun en karanlık yerlerde bile parlayabileceğini kanıtlar." },
    { id: 15, title: "Jurassic Park", year: 1993, rating: 8.2, genre: "Macera", image: "img/jurassic-park.jpg", type: "Film", desc: "Genetik teknoloji sayesinde milyonlarca yıl önce yaşamış dinozorlar yeniden hayata döndürülür. Kurulan devasa tema parkı, bir güvenlik felaketiyle kabusa dönüşür. İnsanlar, doğanın en vahşi avcılarına karşı hayatta kalma mücadelesi verir." },
    { id: 16, title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001, rating: 8.8, genre: "Macera", image: "img/lotr1.jpg", type: "Film", desc: "Kadim bir yüzük, Orta Dünya'nın kaderini belirlemek üzere küçük bir hobbitin ellerine geçer. Yüzüğü yok etmek için farklı ırklardan oluşan bir kardeşlik kurulur. Karanlıklar Efendisi Sauron'un orduları, yüzüğü geri almak için peşlerine düşer." },
    { id: 17, title: "The Lord of the Rings: The Two Towers", year: 2002, rating: 8.7, genre: "Macera", image: "img/lotr2.jpg", type: "Film", desc: "Yüzük Kardeşliği dağılmış, Frodo ve Sam yüzüğü yok etmek için Mordor yoluna devam etmektedir. Aragorn ve dostları, Rohan halkını yaklaşan savaşa karşı örgütlemeye çalışır. İki kule arasındaki karanlık ittifak, tüm dünyayı tehdit etmektedir." },
    { id: 18, title: "The Lord of the Rings: The Return of the King", year: 2003, rating: 9.0, genre: "Macera", image: "img/lotr3.jpg", type: "Film", desc: "Orta Dünya'nın nihai savaşı kapıdadır ve Gondor'un savunması çökmek üzeredir. Aragorn, krallığını geri almak ve halkını zafere taşımak için ordularını toplar. Frodo ve Sam ise Hüküm Dağı'nın zirvesinde yüzükle olan son imtihanlarına çıkar." },
    { id: 19, title: "Spider-Man: No Way Home", year: 2021, rating: 8.2, genre: "Aksiyon", image: "img/spiderman.jpg", type: "Film", desc: "Örümcek Adam'ın kimliği ifşa olunca, Peter Parker büyü yaparak her şeyi düzeltmesi için Doktor Strange'den yardım ister. Ancak büyü yanlış gider ve çoklu evrenlerden eski düşmanlar gelmeye başlar. Peter, şimdiye kadarki en büyük sorumluluğuyla yüzleşmek zorundadır." },
    { id: 20, title: "Doctor Strange", year: 2016, rating: 7.5, genre: "Fantastik", image: "img/doctor-strange.jpg", type: "Film", desc: "Kibirli bir cerrah olan Stephen Strange, geçirdiği kaza sonrası ellerini kullanamaz hale gelir. Şifa bulmak için gittiği Nepal'de, mistik sanatların ve alternatif boyutların kapısını aralar. Artık sadece kendi hayatını değil, tüm gerçekliği koruyan bir büyücüdür." },
    { id: 21, title: "Black Panther", year: 2018, rating: 7.3, genre: "Aksiyon", image: "img/black-panther.jpg", type: "Film", desc: "Babasının ölümünden sonra T'Challa, teknolojik olarak ileri seviyedeki gizli krallık Wakanda'nın başına geçer. Ancak geçmişten gelen bir rakip, hem tahtı hem de Wakanda'nın geleneklerini tehdit eder. T'Challa, gerçek bir kral olmanın ne demek olduğunu keşfedecektir." },
    { id: 22, title: "Dune", year: 2021, rating: 8.0, genre: "Bilim Kurgu", image: "img/dune.jpg", type: "Film", desc: "Uzak gelecekte, galaksinin en değerli maddesinin tek kaynağı olan çöl gezegeni Arrakis'in yönetimi Atreides ailesine verilir. Genç Paul Atreides, büyük bir kaderin ve tehlikeli bir komplonun ortasında kalır. Kum fırtınaları ve devasa solucanlar arasında hayatta kalmalıdır." },
    { id: 23, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genre: "Aksiyon", image: "img/madmax.jpg", type: "Film", desc: "Dünyanın sonu gelmiş, su ve petrol en değerli hazine haline dönüşmüştür. Max, Furiosa adlı cesur bir kadının önderliğindeki isyancı gruba katılmak zorunda kalır. Çölde, acımasız bir tiranın ordularıyla nefes kesen bir takip başlar." },
    { id: 24, title: "The Social Network", year: 2010, rating: 7.7, genre: "Dram", image: "img/social-network.jpg", type: "Dizi", desc: "Harvard öğrencisi Mark Zuckerberg'in, bir yurt odasında başlattığı proje dünyayı değiştirecek bir sosyal ağa dönüşür. Bu başarı, beraberinde büyük davaları ve kaybedilen dostlukları da getirir. Modern dünyanın iletişim biçimini değiştiren adamın hikayesi." },
    { id: 25, title: "La La Land", year: 2016, rating: 8.0, genre: "Müzikal", image: "img/lalaland.jpg", type: "Film", desc: "Hayaller şehri Los Angeles'ta yolları kesişen Sebastian ve Mia, tutkularının peşinden koşmaktadır. Biri caz müziğini kurtarmak, diğeri ise başarılı bir oyuncu olmak ister. Başarı kapılarını çaldığında, aşkları bu hayallerin neresinde kalacaktır?" },
    { id: 26, title: "Parasite", year: 2019, rating: 8.6, genre: "Gerilim", image: "img/parasite.jpg", type: "Dizi", desc: "Fakir bir aile olan Kim'ler, zengin Park ailesinin malikanesine sinsi bir planla sızar. Her biri farklı kimliklerle evin çalışanları haline gelir. Ancak bu parazit yaşam, öngörülemez ve şiddetli olayların fitilini ateşler." },
    { id: 27, title: "Whiplash", year: 2014, rating: 8.5, genre: "Dram", image: "img/whiplash.jpg", type: "Film", desc: "Genç ve hırslı bir baterist, ülkenin en iyi müzik konservatuvarına kabul edilir. Orada, sınırları zorlayan ve öğrencilerini psikolojik olarak yıpratan bir hocayla tanışır. Mükemmeliyete ulaşmak için ne kadar acı çekilmesi gerektiğini sorgulayan bir film." },
    { id: 28, title: "The Revenant", year: 2015, rating: 8.0, genre: "Macera", image: "img/revenant.jpg", type: "Film", desc: "Bir av ekibiyle karda ilerleyen Hugh Glass, vahşi bir ayının saldırısına uğrar. Ekibi tarafından ölüme terk edilen Glass, imkansızı başararak doğaya karşı direnir. İhanete uğramış bir adamın, intikam ateşiyle hayata tutunma öyküsü." },
    { id: 29, title: "Blade Runner 2049", year: 2017, rating: 8.0, genre: "Bilim Kurgu", image: "img/bladerunner.jpg", type: "Film", desc: "Yeni bir Blade Runner olan Memur K, toplumdan geri kalan kaosu bitirebilecek bir sırrı keşfeder. Bu sır onu, 30 yıldır kayıp olan eski Blade Runner Rick Deckard'ı bulmaya iter. İnsanlığın ve makinelerin geleceği bu arayışa bağlıdır." },
    { id: 30, title: "John Wick", year: 2014, rating: 7.4, genre: "Aksiyon", image: "img/johnwick.jpg", type: "Film", desc: "Emekli olmuş efsanevi tetikçi John Wick, karısından kalan tek anı olan köpeğinin öldürülmesiyle sessizliğini bozar. Suç dünyasına geri dönerek kendisine yapılanın hesabını sormaya başlar. Tek bir adamın, koca bir mafya ordusuna karşı başlattığı intikam savaşı." },
    { id: 31, title: "Train to Busan", year: 2016, rating: 7.6, genre: "Korku", image: "img/train-to-busan.jpg", type: "Film", desc: "Seul'den Busan'a giden hızlı trende, gizemli bir virüs hızla yayılmaya başlar. Yolcular, daracık vagonlarda zombilere dönüşen insanlara karşı hayatta kalmaya çalışır. Bir baba ve kızının, kurtuluş noktasına ulaşmak için verdiği amansız mücadele." },
    { id: 32, title: "Parasite", year: 2019, rating: 8.6, genre: "Gerilim", image: "img/parasitee.jpg", type: "Film", desc: "Sınıf farklarının yarattığı uçurumu çarpıcı bir şekilde ele alan bu yapım, iki ailenin yollarının kesişmesini anlatır. Kim ailesinin lüks yaşama duyduğu açlık, beklenmedik sırlar ve trajedilerle sonuçlanır. Güney Kore sinemasının dünyayı sarsan başyapıtı." },
    { id: 33, title: "Oldboy", year: 2003, rating: 8.4, genre: "Gerilim", image: "img/oldboy.jpg", type: "Film", desc: "Bir adam, hiçbir açıklama yapılmadan 15 yıl boyunca tek bir odada kilitli tutulur. Serbest bırakıldığında, kendisine bu zulmü yapanı bulmak için sadece 5 günü vardır. Ancak bu arayış, hayal bile edemeyeceği kadar karanlık bir intikam oyunudur." },
    { id: 34, title: "The Handmaiden", year: 2016, rating: 8.1, genre: "Dram", image: "img/handmaiden.jpg", type: "Film", desc: "1930'ların Kore'sinde bir dolandırıcı, zengin bir Japon mirasçıyı kandırmak için bir hizmetçi kiralar. Hizmetçi ve mirasçı arasında beklenmedik bir bağ kurulunca planlar değişmeye başlar. Entrika, tutku ve aldatmacayla örülü bir aşk hikayesi." },
    { id: 35, title: "A Taxi Driver", year: 2017, rating: 7.9, genre: "Dram", image: "img/taxi-driver-korea.jpg", type: "Film", desc: "Borç içindeki bir taksi şoförü, çok para teklif eden Alman bir gazeteciyi Gwangju'ya götürmeyi kabul eder. Şehre vardıklarında, halkın ayaklanmasına ve ordunun müdahalesine tanık olurlar. Gerçek bir hikayeden uyarlanan, dokunaklı bir direniş öyküsü." },
    { id: 36, title: "Squid Game", year: 2021, rating: 8.0, genre: "Gerilim", image: "img/squid-game.jpg", type: "Dizi", desc: "Borç batağındaki yüzlerce kişi, büyük ödül için gizemli bir oyun davetini kabul eder. Çocuk oyunları üzerine kurulu bu yarışmada, kaybedenlerin bedeli ölümdür. İnsan doğasının ve hayatta kalma içgüdüsünün en uç noktalarını gösterir." },
    { id: 37, title: "Crash Landing on You", year: 2019, rating: 8.7, genre: "Romantik", image: "img/crash-landing.jpg", type: "Dizi", desc: "Güney Koreli bir mirasçı, yamaç paraşütü yaparken çıkan fırtına sonucu Kuzey Kore topraklarına düşer. Orada, kendisini koruyan ve saklayan bir Kuzey Koreli subaya aşık olur. Sınırları aşan, tehlikeli ve imkansız bir aşkın hikayesi." },
    { id: 38, title: "Vincenzo", year: 2021, rating: 8.4, genre: "Suç", image: "img/vincenzo.jpg", type: "Dizi", desc: "İtalyan mafyası için danışmanlık yapan bir avukat, özel bir görev için Güney Kore'ye döner. Orada, kötülüğe kötülükle karşılık veren adaletsiz bir düzene karşı savaş başlatır. Kendi mafya yöntemleriyle adaleti arayan bir anti-kahraman hikayesi." },
    { id: 39, title: "All of Us Are Dead", year: 2022, rating: 7.5, genre: "Korku", image: "img/all-of-us-are-dead.jpg", type: "Dizi", desc: "Bir lisede aniden patlak veren zombi virüsü, öğrencileri okulda mahsur bırakır. Dış dünya ile iletişimleri kesilen gençler, hayatta kalmak için kendi yöntemlerini geliştirirler. Dostluk ve ihanetin sınandığı kanlı bir lise macerası." },
    { id: 40, title: "Goblin", year: 2016, rating: 8.6, genre: "Fantastik", image: "img/goblin.jpg", type: "Dizi", desc: "Ölümsüz bir yaşamla lanetlenen Goblin, bu hayatına son verecek tek kişi olan 'gelinini' aramaktadır. Yüzyıllar süren arayışı, kaderini beklenmedik bir şekilde değiştiren insanlarla kesişir. Mitolojik unsurlarla dolu, hüzünlü ve destansı bir aşk." },
    { id: 41, title: "Ayla", year: 2017, rating: 8.4, genre: "Dram", image: "img/ayla.jpg", type: "Film", desc: "Kore Savaşı'na katılan Süleyman Astsubay, savaşın ortasında kimsesiz küçük bir Koreli kız bulur. Ona Ayla adını verir ve aralarında sarsılmaz bir baba-kız bağı oluşur. Savaşın sona ermesiyle ayrılmak zorunda kalan ikilinin yarım asırlık kavuşma öyküsü." },
    { id: 42, title: "Mucize Aşk", year: 2018, rating: 7.6, genre: "Dram", image: "img/mucizeaşk.jpg", type: "Film", desc: "Engelli bir adam olan Aziz, görücü usulüyle Mızgin ile evlenir. Şehirlerinden göç ederek gittikleri yerde, aşkın ve azmin gücüyle tüm engelleri aşmaya çalışırlar. İnsanlığın, sevginin ve mucizelerin kalpleri nasıl iyileştirdiğinin hikayesi." },
    { id: 43, title: "7. Koğuştaki Mucize", year: 2019, rating: 8.2, genre: "Dram", image: "img/7-kogustaki-mucize.jpg", type: "Film", desc: "Zihinsel engelli bir baba olan Memo, işlemediği bir suç yüzünden idama mahkum edilir. Küçük kızı Ova, babasının suçsuzluğunu kanıtlamak için her şeyi yapar. Hapishanedeki diğer mahkumların yardımıyla gerçekleşen bir adaleti arayış destanı." },
    { id: 44, title: "Dağ 2", year: 2016, rating: 8.2, genre: "Aksiyon", image: "img/dag2.jpg", type: "Film", desc: "Fırtına Getiren timi, sınır ötesinde çok riskli bir kurtarma görevi için yola çıkar. Kısıtlı imkanlara rağmen imkansız bir savunma yaparak masum insanları korumaya çalışırlar. Türk askerinin cesaretini ve kardeşlik bağını anlatan sürükleyici bir yapım." },
    { id: 45, title: "Kış Uykusu", year: 2014, rating: 8.1, genre: "Dram", image: "img/kis-uykusu.jpg", type: "Film", desc: "Eski bir tiyatrocu olan Aydın, Kapadokya'da küçük bir otel işletmektedir. Kışın gelmesiyle otel bir nevi hapishaneye dönüşür, aile içi çatışmalar ve içsel hesaplaşmalar başlar. Nuri Bilge Ceylan'ın insan ruhunun derinliklerine indiği ödüllü filmi." },
    { id: 46, title: "Diriliş: Ertuğrul", year: 2014, rating: 7.9, genre: "Tarih", image: "img/ertugrul.jpg", type: "Dizi", desc: "13. yüzyılda Kayı Obası'nın lideri Ertuğrul Bey, halkı için yeni bir yurt arayışına girer. Haçlılar, Moğollar ve iç hainlerle savaşarak büyük bir imparatorluğun temellerini atar. Adalet ve cesaretle yoğrulmuş bir kahramanlık hikayesi." },
    { id: 47, title: "Kuruluş: Osman", year: 2019, rating: 7.5, genre: "Tarih", image: "img/osman.jpg", type: "Dizi", desc: "Ertuğrul Gazi'nin oğlu Osman Bey, babasından devraldığı sancağı daha da ileriye taşır. Dağınık Türk boylarını birleştirerek Osmanlı Devleti'nin temellerini atar. Zorlu kuşatmalar ve siyasi dehalarla örülü bir devletin doğuş süreci." },
    { id: 48, title: "Ezel", year: 2009, rating: 8.6, genre: "Dram", image: "img/ezel.jpg", type: "Dizi", desc: "En yakın dostları ve sevdiği kadın tarafından ihanete uğrayan Ömer, hapishanede öldü sanılıp yeni bir yüzle geri döner. Ezel olarak, geçmişin intikamını tek tek almak için dahi bir plan hazırlar. Ama aşk, intikam yolundaki en büyük engelidir." },
    { id: 49, title: "Leyla ile Mecnun", year: 2011, rating: 9.1, genre: "Komedi", image: "img/leyla-mecnun.jpg", type: "Dizi", desc: "Aynı gün aynı hastanede doğan ve beşikleri yan yana konan iki bebeğin kaderi birleşir. Kireçburnu sahilinde geçen absürt olaylar, derin dostluklar ve imkansız bir aşkın hikayesi. Türk televizyon tarihinin en özgün ve duygusal komedi yapımı." },
    { id: 50, title: "Çukur", year: 2017, rating: 7.4, genre: "Aksiyon", image: "img/cukur.jpg", type: "Dizi", desc: "İstanbul'un en belalı mahallelerinden biri olan Çukur, Koçovalı ailesinin koruması altındadır. Yamaç, ailesini ve mahallesini korumak için kaçtığı bu dünyaya geri dönmek zorunda kalır. Çukur'da hayatta kalmak için kurallar bellidir: Aile her şeydir." },
    { id: 51, title: "Masum", year: 2017, rating: 8.5, genre: "Suç", image: "img/masum.jpg", type: "Dizi", desc: "Emekli bir komiser olan Cevdet ve ailesi, sakin bir hayat sürmek için kasabaya çekilir. Ancak büyük oğullarının gelişiyle saklanan sırlar ve karanlık bir cinayet davası gün yüzüne çıkar. Adalet ve aile sevgisi arasındaki o ince çizginin hikayesi." },
    { id: 52, title: "Breaking Bad", year: 2008, rating: 9.5, genre: "Suç", image: "img/breaking-bad.jpg", type: "Dizi", desc: "Lisede kimya öğretmeni olan Walter White, ölümcül bir hastalık teşhisi aldıktan sonra ailesine para bırakabilmek için eski öğrencisiyle birlikte uyuşturucu üretmeye başlar." },
    { id: 53, title: "Game of Thrones", year: 2011, rating: 9.2, genre: "Fantastik", image: "img/game-of-thrones.jpg", type: "Dizi", desc: "Demir Taht için verilen büyük mücadelede krallıklar, ihanetler ve savaşlar iç içe geçer. Westeros'ta güç ve hayatta kalma savaşı başlar." },
    { id: 54, title: "Stranger Things", year: 2016, rating: 8.7, genre: "Bilim Kurgu", image: "img/stranger-things.jpg", type: "Dizi", desc: "Küçük bir kasabada kaybolan bir çocuk sonrası ortaya çıkan doğaüstü olaylar ve gizli hükümet deneyleri bir grup çocuğun hayatını değiştirir." },
    { id: 55, title: "Money Heist", year: 2017, rating: 8.2, genre: "Suç", image: "img/money-heist.jpg", type: "Dizi", desc: "Profesör lakaplı bir deha, İspanya Kraliyet Darphanesi'ni soymak için birbirini tanımayan insanlardan oluşan bir ekip kurar." },
    { id: 56, title: "Dark", year: 2017, rating: 8.8, genre: "Bilim Kurgu", image: "img/dark.jpg", type: "Dizi", desc: "Almanya'nın küçük bir kasabasında iki çocuğun kaybolmasıyla başlayan olaylar, zaman yolculuğu ve karmaşık aile sırlarını ortaya çıkarır." },
    { id: 57, title: "The Witcher", year: 2019, rating: 8.1, genre: "Fantastik", image: "img/witcher.jpg", type: "Dizi", desc: "Canavar avcısı Geralt of Rivia, kaderlerin iç içe geçtiği bir dünyada prensesler, büyücüler ve krallar arasında hayatta kalmaya çalışır." },
    { id: 58, title: "Prison Break", year: 2005, rating: 8.3, genre: "Aksiyon", image: "img/prison-break.jpg", type: "Dizi", desc: "Kardeşinin haksız yere idam cezası alması üzerine Michael Scofield, onu hapishaneden kaçırmak için karmaşık bir plan yapar." },
    { id: 59, title: "The Godfather", year: 1972, rating: 9.2, genre: "Suç", image: "img/godfather.jpg", type: "Film", desc: "Corleone ailesinin mafya dünyasındaki yükselişi ve aile içindeki güç mücadelesini anlatan sinema tarihinin en önemli filmlerinden biri." },
    { id: 60, title: "Pulp Fiction", year: 1994, rating: 8.9, genre: "Suç", image: "img/pulp-fiction.jpg", type: "Film", desc: "Birbirine bağlı suç hikayeleri, sıra dışı karakterler ve unutulmaz diyaloglarla dolu kült bir film." },
    { id: 61, title: "The Prestige", year: 2006, rating: 8.5, genre: "Dram", image: "img/prestige.jpg", type: "Film", desc: "İki sihirbazın rekabeti zamanla takıntıya dönüşür ve birbirlerini alt etmek için tehlikeli oyunlara girişirler." },
    { id: 62, title: "Se7en", year: 1995, rating: 8.6, genre: "Gerilim", image: "img/se7en.jpg", type: "Film", desc: "İki dedektif, yedi ölümcül günahı temsil eden cinayetler işleyen bir seri katilin peşine düşer." },
    { id: 63, title: "The Pianist", year: 2002, rating: 8.5, genre: "Dram", image: "img/pianist.jpg", type: "Film", desc: "II. Dünya Savaşı sırasında Varşova'da hayatta kalmaya çalışan Yahudi bir piyanistin gerçek hikayesi." },
    { id: 64, title: "Gladiator", year: 2000, rating: 8.5, genre: "Aksiyon", image: "img/gladiator.jpg", type: "Film", desc: "Roma İmparatorluğu'nda ihanete uğrayan bir general, gladyatör olarak arenaya çıkar ve intikamını almak için savaşır." },
    { id: 65, title: "Dune", year: 2021, rating: 8.0, genre: "Bilim Kurgu", image: "img/dune.jpg", type: "Film", desc: "Uzak bir gelecekte genç Paul Atreides, evrenin en değerli kaynağı için verilen mücadelede kaderini keşfeder." },
    { id: 66, title: "Joker", year: 2019, rating: 8.4, genre: "Dram", image: "img/joker.jpg", type: "Film", desc: "Toplum tarafından dışlanan Arthur Fleck'in yavaş yavaş Gotham'ın en korkulan suçlularından biri olan Joker'e dönüşmesini anlatır." }
];
let currentType = 'all'; 
let currentGenre = 'all'; 
let watchlist = JSON.parse(localStorage.getItem('nextwatch_favorites')) || [];
let currentUser = localStorage.getItem('activeUser') || null;
let currentUnsubscribe = null;

/* --- FİLTRELEME VE KARTLAR --- */
function applyFilters() {
    const movieGrid = document.getElementById('movie-grid');
    if(!movieGrid) return;
    const filtered = movies.filter(item => {
        const isFav = currentType === 'favorites';
        const typeMatch = isFav ? watchlist.includes(item.id) : (currentType === 'all' || item.type === currentType);
        const genreMatch = (currentGenre === 'all' || item.genre === currentGenre);
        return typeMatch && genreMatch;
    });
    renderCards(filtered);
}
function renderCards(data) {
    const movieGrid = document.getElementById('movie-grid');
    movieGrid.innerHTML = data.map(movie => `
        <div class="movie-card" onclick="openDetails(${movie.id})">
            <div class="card-image">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="card-overlay">
                    <button class="watchlist-btn" onclick="event.stopPropagation(); toggleWatchlist(${movie.id})">
                        <i class="${watchlist.includes(movie.id) ? 'fas' : 'far'} fa-clock"></i>
                    </button>
                </div>
            </div>
            <div class="card-info">
                <h3>${movie.title}</h3>
                <div class="meta"><span>${movie.year}</span><span><i class="fas fa-star"></i> ${movie.rating}</span></div>
            </div>
        </div>`).join('');
}

/* --- DETAY VE YORUM SİSTEMİ (FIREBASE) --- */
function openDetails(id) {
    const movie = movies.find(m => m.id === id);
    if(!movie) return;

    document.getElementById('modal-title').innerText = movie.title;
    document.getElementById('modal-img').src = movie.image;
    document.getElementById('modal-desc').innerText = movie.desc;
    document.getElementById('movie-modal').setAttribute('data-current-id', id);
    
    listenToComments(id); // Yorumları Firebase'den canlı dinle
    document.getElementById('movie-modal').style.display = "block";
}

function listenToComments(movieId) {
    if (currentUnsubscribe) currentUnsubscribe();
    // Yorumları 'comments/movie_ID/items' yolundan çekiyoruz
    const q = query(collection(db, 'comments', `movie_${movieId}`, 'items'), orderBy("timestamp", "desc"));

    currentUnsubscribe = onSnapshot(q, (snapshot) => {
        const list = document.getElementById('comments-list');
        list.innerHTML = snapshot.docs.map(docSnap => {
            const c = docSnap.data();
            const cid = docSnap.id;
            const hasLiked = c.likedBy?.includes(currentUser);
            
            return `
            <div class="single-comment">
                <div><strong>@${c.user}:</strong> ${c.text}</div>
                <div class="comment-actions">
                    <button class="action-btn ${hasLiked ? 'liked' : ''}" onclick="toggleLike('${movieId}', '${cid}')">
                        <i class="fas fa-heart"></i> ${c.likes || 0}
                    </button>
                    <button class="action-btn" onclick="showReplyInput('${cid}')">
                        <i class="fas fa-reply"></i> Yanıtla
                    </button>
                </div>
                <div class="replies-container">
                    ${(c.replies || []).map(r => `<div class="single-reply"><strong>@${r.user}:</strong> ${r.text}</div>`).join('')}
                </div>
                <div class="reply-input-wrapper" id="reply-wrapper-${cid}" style="display:none; margin-top:10px;">
                    <input type="text" placeholder="Yanıtın..." id="reply-input-${cid}">
                    <button onclick="addReply('${movieId}', '${cid}')">Gönder</button>
                </div>
            </div>`;
        }).join('');
    });
}

// YENİ YORUM EKLEME
async function addComment() {
    const input = document.getElementById('user-comment');
    const movieId = document.getElementById('movie-modal').getAttribute('data-current-id');
    if(!input.value.trim() || !currentUser) return alert("Önce giriş yap kanka!");

    await addDoc(collection(db, 'comments', `movie_${movieId}`, 'items'), {
        user: currentUser,
        text: input.value,
        likes: 0,
        likedBy: [],
        replies: [],
        timestamp: Date.now()
    });
    input.value = "";
}

// BEĞENİ ÖZELLİĞİ (FIREBASE)
async function toggleLike(movieId, commentId) {
    if(!currentUser) return alert("Beğenmek için giriş yap!");
    const dRef = doc(db, 'comments', `movie_${movieId}`, 'items', commentId);
    const dSnap = await getDoc(dRef);
    const data = dSnap.data();

    const hasLiked = data.likedBy?.includes(currentUser);
    await updateDoc(dRef, {
        likedBy: hasLiked ? arrayRemove(currentUser) : arrayUnion(currentUser),
        likes: hasLiked ? (data.likes - 1) : (data.likes + 1)
    });
}

// CEVAP VERME ÖZELLİĞİ (FIREBASE)
async function addReply(movieId, commentId) {
    const input = document.getElementById(`reply-input-${commentId}`);
    if(!input.value.trim()) return;

    const dRef = doc(db, 'comments', `movie_${movieId}`, 'items', commentId);
    await updateDoc(dRef, {
        replies: arrayUnion({
            user: currentUser || "Misafir",
            text: input.value,
            timestamp: Date.now()
        })
    });
    input.value = "";
}

/* --- PROFİL VE AUTH --- */
function handleProfileClick() {
    if(currentUser) {
        if(confirm(`Çıkış yapmak istiyor musun ${currentUser}?`)) {
            localStorage.removeItem('activeUser');
            location.reload();
        }
    } else {
        document.getElementById('auth-modal').style.display = "block";
    }
}

function handleAuth() {
    const user = document.getElementById('username').value;
    if(!user) return alert("İsim yaz kanka!");
    localStorage.setItem('activeUser', user);
    location.reload();
}

/* --- WINDOW EXPORTS (HTML'den erişim için şart!) --- */
window.openDetails = openDetails;
window.addComment = addComment;
window.toggleLike = toggleLike;
window.addReply = addReply;
window.showReplyInput = (id) => {
    const el = document.getElementById(`reply-wrapper-${id}`);
    el.style.display = el.style.display === 'none' ? 'block' : 'none';
};
window.handleAuth = handleAuth;
window.handleProfileClick = handleProfileClick;
window.setMainFilter = (t, e) => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    if(e) e.classList.add('active');
    currentType = t;
    applyFilters();
};
window.showFavorites = () => { currentType = 'favorites'; applyFilters(); };
window.toggleWatchlist = (id) => {
    const idx = watchlist.indexOf(id);
    idx === -1 ? watchlist.push(id) : watchlist.splice(idx, 1);
    localStorage.setItem('nextwatch_favorites', JSON.stringify(watchlist));
    applyFilters();
};
window.closeModal = () => { document.getElementById('movie-modal').style.display = "none"; document.body.style.overflow = 'auto'; };

/* --- AÇILIŞ --- */
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('main-logo').className = 'logo-nav';
        setTimeout(() => {
            document.getElementById('site-wrapper').classList.add('show-content');
            applyFilters();
        }, 800);
    }, 1000);
});
