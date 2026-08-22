/**
 * scripts/update_events_rich_descriptions.mjs
 * ====================================================
 * Mengembalikan narasi deskripsi 20 event menjadi 3 paragraf lengkap
 * (Bahasa Indonesia & English) sesuai standar master katalog pariwisata.
 * ====================================================
 */

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDocs } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const RICH_EVENTS = [
  {
    id: "ev1",
    title: "Pacu Jawi (Atraksi Balap Sapi Lumpur)",
    titleEn: "Pacu Jawi (Traditional Mud Bull Race)",
    category: "Budaya & Tradisi",
    categoryEn: "Culture & Tradition",
    regency: "Kabupaten Tanah Datar",
    tag: "KEN / Tradisi",
    tagEn: "KEN / Tradition",
    isKen: true,
    schedule: "Setiap Akhir Pekan (Sabtu & Minggu Bergilir Pasca Panen)",
    scheduleEn: "Every Weekend (Saturday & Sunday on Rotating Nagari Post-Harvest)",
    monthIndex: 0,
    highlights: [
      "Atraksi Balap Sapi Sawah Berlumpur Terpopuler",
      "Ajang Bergilir di 4 Kecamatan Tanah Datar",
      "Surga Fotografi Internasional"
    ],
    highlightsEn: [
      "World Famous Mud Bull Racing Spectacle",
      "Rotating Across 4 Tanah Datar Sub-Districts",
      "International Photography Mecca"
    ],
    description: "Pacu Jawi adalah atraksi budaya Minangkabau legendaris yang telah berlangsung ratusan tahun di Kabupaten Tanah Datar, khususnya di empat kecamatan adat yaitu Pariangan, Rambatan, Lima Kaum, dan Sungai Tarab. Tradisi ini berawal sebagai bentuk rasa syukur para petani atas hasil panen padi yang melimpah sekaligus menjadi ajang menguji ketangkasan dan kekuatan sapi ternak anak nagari.\n\nKeunikan utama Pacu Jawi terletak pada aksi joki yang berdiri bertumpu pada bilah bajak kayu (kayu bajak) tanpa roda, sambil memegang erat ekor sepasang sapi yang berlari kencang menerjang lumpur sawah basah. Joki seringkali menggigit ekor sapi untuk memacu kecepatan maksimal, di mana sapi yang berlari paling lurus dan tercepat akan dinobatkan sebagai pemenang serta mendongkrak harga jual sapi tersebut di pasar ternak.\n\nDigelar secara bergilir setiap akhir pekan pasca panen, Pacu Jawi kini telah menjadi magnet pariwisata kelas dunia dan surga bagi fotografer internasional yang memburu momen dramatis cipratan lumpur dan ekspresi heroik sang joki. Suasana semakin meriah dengan alunan musik tradisional talempong dan aneka kuliner nagari yang disajikan di tepian pematang sawah.",
    descriptionEn: "Pacu Jawi is a legendary Minangkabau cultural tradition celebrated for centuries across Tanah Datar Regency, notably in the historic sub-districts of Pariangan, Rambatan, Lima Kaum, and Sungai Tarab. Originating as a festive post-harvest thanksgiving ritual, it also serves as an arena for local farmers to showcase the agility, speed, and health of their prized working cattle.\n\nThe signature thrill of Pacu Jawi lies in the daring jockey balancing bare-foot on a wooden plow frame while gripping the tails of a pair of charging bulls sprinting across deep, wet mud. Jockeys often bite the bulls' tails to urge maximum speed; the pair that runs the straightest and fastest commands the highest prestige and significantly increases the bull's market value.\n\nRotating weekly across rural villages after each rice harvest, Pacu Jawi has evolved into a world-class tourism spectacle and a mecca for international photographers seeking dramatic mud-splashing action shots. The festive atmosphere is amplified by the rhythmic clanging of traditional talempong music and authentic countryside delicacies served along the paddy ridges.",
    locationName: "Sawah Bergilir Pariangan & Lima Kaum, Tanah Datar",
    locationNameEn: "Rotating Fields in Pariangan & Lima Kaum, Tanah Datar",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787133702/bc873ed1-7f25-4af0-b48b-6d09093e993b_yymwwj.png",
    lat: -0.471111,
    lng: 100.621111
  },
  {
    id: "ev2",
    title: "Tour de Singkarak (Balap Sepeda Internasional)",
    titleEn: "Tour de Singkarak (International Cycling Tour)",
    category: "Olahraga & Bahari",
    categoryEn: "Sport Tourism",
    regency: "Lintas Provinsi Sumatera Barat",
    tag: "Vakum / Ditunda (2027)",
    tagEn: "Postponed (Return in 2027)",
    isKen: false,
    schedule: "Vakum / Ditunda (Direncanakan Kembali Tahun 2027)",
    scheduleEn: "On Hiatus / Postponed (Planned Return in 2027)",
    monthIndex: 9,
    highlights: [
      "Ajang Balap Sepeda Internasional UCI",
      "Rute Melintasi 16+ Kota/Kabupaten Sumbar",
      "Konsep Baru Sport Tourism 2027"
    ],
    highlightsEn: [
      "UCI Sanctioned International Cycling Event",
      "Route Traversing 16+ West Sumatra Cities/Regencies",
      "New Sport Tourism Concept in 2027"
    ],
    description: "Tour de Singkarak (TdS) adalah kejuaraan balap sepeda jalan raya internasional bergengsi yang digagas sejak tahun 2009 untuk memadukan kompetisi olahraga kelas dunia dengan promosi keindahan alam dan kekayaan budaya Sumatera Barat. Dinamai menurut danau ikonik Danau Singkarak, ajang ini telah tercatat dalam kalender resmi Union Cycliste Internationale (UCI) Asia Tour.\n\nLintasan balap TdS membentang melintasi belasan kota dan kabupaten di Sumatera Barat, menyuguhkan tantangan rute berliku yang ekstrem di lereng Bukit Barisan, kelokan tajam legendaris Kelok 44 dan Kelok 9, hingga pemandangan memukau danau-danau vulkanik dan garis pantai Samudra Hindia. Ribuan warga nagari selalu tumpah ruah ke pinggir jalan menyambut iring-iringan pembalap dengan sorak sorai dan tarian tradisi.\n\nMeski sempat mengalami masa vakum sejak pandemi global, Tour de Singkarak saat ini tengah dipersiapkan secara matang oleh pemerintah daerah dan pusat untuk kembali digelar pada tahun 2027 dengan konsep sport tourism yang lebih segar, ramah lingkungan, dan berdampak ekonomi langsung bagi masyarakat lokal di sepanjang rute perlintasan.",
    descriptionEn: "Tour de Singkarak (TdS) is a prestigious international road cycling race established in 2009, ingeniously designed to combine elite world-class sports competition with the celebration of West Sumatra's breathtaking landscapes and rich cultural heritage. Named after the iconic Lake Singkarak, the race is officially sanctioned under the UCI Asia Tour calendar.\n\nThe challenging race course winds across more than a dozen regencies and cities throughout West Sumatra, testing world-class cyclists against punishing mountain climbs along the Barisan Range, legendary hairpin curves like Kelok 44 and Kelok 9, and scenic coastal highways facing the Indian Ocean. Cheering local villagers line the roadsides en masse to greet peloton riders with traditional music and vibrant festivities.\n\nFollowing a temporary hiatus during the global pandemic, Tour de Singkarak is currently being revitalized by regional and national authorities for a triumphant return in 2027, featuring a modernized sport tourism concept that emphasizes sustainability, eco-tourism, and direct economic empowerment for communities along the route.",
    locationName: "Lintas 16 Kabupaten/Kota di Sumatera Barat",
    locationNameEn: "Across 16 Cities and Regencies in West Sumatra",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787136925/ChatGPT_Image_Aug_19_2026_05_55_00_PM_mjgylw.png",
    lat: -0.6125,
    lng: 100.5375
  },
  {
    id: "ev3",
    title: "Pesona Budaya Hoyak Tabuik Piaman (KEN)",
    titleEn: "Hoyak Tabuik Cultural Festival (KEN)",
    category: "Budaya & Tradisi",
    categoryEn: "Culture & Tradition",
    regency: "Kota Pariaman",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "16 – 28 Juni 2026 (Puncak 10 Muharram 1448 H)",
    scheduleEn: "June 16 – 28, 2026 (Peak 10 Muharram 1448 H)",
    monthIndex: 5,
    highlights: [
      "Ritual Maarak & Hoyak Tabuik Spektakuler",
      "Pelepasan Tabuik ke Laut di Pantai Gandoriah",
      "Karisma Event Nusantara 2026"
    ],
    highlightsEn: [
      "Spectacular Maarak & Hoyak Tabuik Procession",
      "Tabuik Cast into the Ocean at Gandoriah Beach",
      "Karisma Event Nusantara 2026"
    ],
    description: "Pesona Budaya Hoyak Tabuik Piaman merupakan salah satu festival budaya kolosal tertua dan paling spektakuler di pesisir barat Pulau Sumatera yang diselenggarakan setiap tanggal 1 hingga 10 Muharram di Kota Pariaman. Tradisi ini telah berakar sejak awal abad ke-19 dan secara resmi dinobatkan ke dalam agenda utama Karisma Event Nusantara (KEN) oleh Kementerian Pariwisata dan Ekonomi Kreatif.\n\nRangkaian ritual adat Tabuik berlangsung selama sepuluh hari penuh melalui tahapan sakral yang sarat makna filosofis, mulai dari prosesi Maambiak Tanah (mengambil tanah), Manabang Batang Pisang (menebang batang pisang), Maatam, Maarak Jari-Jari, hingga Maarak Saroban. Puncaknya ditandai dengan pembuatan dua menara Tabuik megah setinggi 12 meter—Tabuik Pasa dan Tabuik Subarang—yang diarak serta digoyangkan (dihoyak) oleh puluhan ribu warga diiringi tabuhan gandang tasa yang bertalu-talu.\n\nMenjelang senja di Pantai Gandoriah, kedua struktur Tabuik diusung menuju bibir pantai dan dilarung ke tengah Samudra Hindia saat matahari terbenam, melambangkan pelepasan duka dan pembersihan diri menyongsong tahun baru Hijriah. Keagungan visual pelarungan berlatar lembayung senja menjadikan festival ini daya tarik wisata internasional yang tak tertandingi.",
    descriptionEn: "Hoyak Tabuik Cultural Festival is one of the oldest and most colossal coastal heritage spectacles in Western Sumatra, held annually from the 1st to the 10th of Muharram in Pariaman City. Rooted in traditions dating back to the early 19th century, this iconic festival is officially recognized in the prestigious Karisma Event Nusantara (KEN) calendar by the Ministry of Tourism and Creative Economy.\n\nThe ten-day ritual sequence unfolds through a series of sacred symbolic stages: Maambiak Tanah (gathering sacred soil), Manabang Batang Pisang (cleaving the banana stalk), Maatam, and Maarak Saroban. The monumental climax features two towering 12-meter effigies—Tabuik Pasa and Tabuik Subarang—paraded, danced, and energetically hoisted (dihoyak) by tens of thousands of participants to the thunderous, hypnotic beats of gandang tasa drums.\n\nAt dusk on Gandoriah Beach, both massive Tabuik towers are carried into the crashing waves of the Indian Ocean and cast into the sea against a fiery sunset, symbolizing spiritual catharsis and communal renewal for the Islamic New Year. The awe-inspiring maritime ritual stands as an internationally renowned cultural tourism landmark.",
    locationName: "Pantai Gandoriah & Lapangan Merdeka, Kota Pariaman",
    locationNameEn: "Gandoriah Beach & Merdeka Square, Pariaman City",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787195562/1787195461378_iaaghr.png",
    lat: -0.626389,
    lng: 100.119444
  },
  {
    id: "ev4",
    title: "Festival Rang Solok Baralek Gadang (KEN)",
    titleEn: "Rang Solok Baralek Gadang Festival (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Arts & Cultural Festival",
    regency: "Kota Solok",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "September 2026 (Jadwal Pasti Segera Dikonfirmasi)",
    scheduleEn: "September 2026 (Exact Dates To Be Confirmed)",
    monthIndex: 8,
    highlights: [
      "Hamparan Sawah Solok Organik Kota Solok",
      "Prosesi Batulak Bala & Permainan Tradisional",
      "Masuk Agenda Resmi KEN 2026"
    ],
    highlightsEn: [
      "Set Amid Organic Sawah Solok Paddy Landscapes",
      "Batulak Bala Procession & Folk Games",
      "Official KEN 2026 National Calendar"
    ],
    description: "Festival Rang Solok Baralek Gadang adalah perayaan agraris akbar yang mengangkat kemasyhuran Beras Solok (Bareh Solok) sebagai warisan pangan terbaik Nusantara dan pilar kebudayaan masyarakat Minangkabau. Festival unggulan Karisma Event Nusantara (KEN) ini dipusatkan langsung di tengah bentangan sawah organik produktif Hamparan Sawah Solok yang berlatar Gunung Talang.\n\nBeragam prosesi adat dan atraksi tradisional digelar di atas tanah sawah berlumpur, termasuk upacara Batulak Bala (ritual tolak bala memohon berkah panen), pawai arak-arakan jamba oleh ratusan Bundo Kanduang, lomba pacu upiah, dan permainan tradisional anak nagari seperti sipak rago dan silat lumpur. Nuansa kebersamaan yang hangat tercermin saat seluruh tamu dan masyarakat duduk bersila menikmati jamuan Makan Bajamba di pematang sawah.\n\nMelalui festival ini, Kota Solok tidak hanya merayakan hasil bumi tetapi juga mengedukasi wisatawan mengenai pentingnya ketahanan pangan, pertanian organik berkelanjutan, dan kearifan lokal sistem pengairan persawahan tradisional. Keindahan visual bentang sawah kuning keemasan menjadikannya destinasi favorit pencinta budaya dan ekowisata.",
    descriptionEn: "Rang Solok Baralek Gadang Festival is a grand agrarian cultural celebration honoring the legendary Solok Rice (Bareh Solok) as one of the archipelago's finest heritage grains and a cultural cornerstone of Minangkabau society. Selected for the national Karisma Event Nusantara (KEN) roster, the festival takes place directly within the sprawling organic paddy fields of Hamparan Sawah Solok facing Mount Talang.\n\nA rich variety of ancestral ceremonies and lively folk games take center stage in the muddy fields, including the sacred Batulak Bala blessing rite, ceremonial jamba food tray processions by hundreds of Bundo Kanduang elders, upiah palm leaf racing, and mud martial arts (silek lumpur). The spirit of communal solidarity culminates in a massive open-air Makan Bajamba communal banquet on the field dykes.\n\nBeyond celebrating agricultural bounty, the festival actively educates visitors on food sovereignty, sustainable organic farming practices, and centuries-old traditional irrigation wisdom. The breathtaking visual panorama of golden paddy fields makes it a premier destination for cultural and eco-tourism enthusiasts alike.",
    locationName: "Kawasan Hamparan Sawah Solok, Kota Solok",
    locationNameEn: "Sawah Solok Heritage Landscape, Solok City",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196765/1787196753351_wnl0cn.png",
    lat: -0.798611,
    lng: 100.658333
  },
  {
    id: "ev5",
    title: "Sawahlunto International Songket Carnival / SISSCa (KEN)",
    titleEn: "Sawahlunto Int. Songket Silungkang Carnival (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Fashion & Heritage Carnival",
    regency: "Kota Sawahlunto",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "4 – 6 September 2026",
    scheduleEn: "September 4 – 6, 2026",
    monthIndex: 8,
    highlights: [
      "Karnaval Busana Adat Songket Silungkang",
      "Latar Kota Tua Warisan Dunia UNESCO Ombilin",
      "Top Karisma Event Nusantara 2026"
    ],
    highlightsEn: [
      "Silungkang Songket Haute Couture Street Carnival",
      "Set Against UNESCO Ombilin Heritage Architecture",
      "Top Karisma Event Nusantara 2026 Selection"
    ],
    description: "Sawahlunto International Songket Silungkang Carnival (SISSCa) adalah festival adibusana dan karnaval jalanan bertaraf internasional yang diselenggarakan di Kota Sawahlunto, kota tambang batu bara bersejarah yang dinobatkan sebagai Situs Warisan Dunia UNESCO. Festival ini secara konsisten terpilih dalam jajaran Karisma Event Nusantara (KEN) sebagai wadah pelestarian dan diplomasi tenun Songket Silungkang ke kancah global.\n\nSelama karnaval berlangsung, jalanan kota tua peninggalan era kolonial Belanda disulap menjadi panggung catwalk terbuka terpanjang di Sumatera Barat. Ratusan desainer lokal, nasional, dan internasional berkolaborasi menampilkan kostum karnaval spektakuler dan busana kontemporer bertema modern yang memadukan kemilau motif benang emas Songket Silungkang dengan kreativitas tanpa batas.\n\nSelain parade kostum, SISSCa dimeriahkan dengan pameran kriya tenun langsung dari pengrajin nagari, simposium fashion warisan budaya, expo kuliner kota tua, dan tur terowongan tambang bersejarah Lubang Mbah Soero. Perpaduan pesona arsitektur Eropa abad ke-19 dan kemegahan kain tenun warisan leluhur menciptakan atmosfer magis yang memikat wisatawan mancanegara.",
    descriptionEn: "Sawahlunto International Songket Silungkang Carnival (SISSCa) is an internationally acclaimed street couture and heritage textile festival held in the historic mining city of Sawahlunto, a designated UNESCO World Heritage site. Consistently curated within the national Karisma Event Nusantara (KEN) program, SISSCa serves as a premier global platform for celebrating and preserving authentic Silungkang Songket weaves.\n\nThroughout the festival, the cobblestone streets and Dutch colonial avenues of the old town transform into the longest open-air runway in West Sumatra. Hundreds of visionary designers from across Indonesia and abroad showcase breathtaking avant-garde carnival costumes that integrate intricate gold-threaded Songket motifs with modern artistic creativity.\n\nComplementing the grand street parade, SISSCa features live artisan weaving demonstrations, heritage fashion symposiums, old-town culinary fairs, and guided tours of historic coal-mining sites like Lubang Mbah Soero. The captivating juxtaposition of 19th-century European industrial architecture and glittering heritage textiles delivers an unforgettable travel experience.",
    locationName: "Kawasan Kota Tua Sawahlunto (UNESCO World Heritage)",
    locationNameEn: "Sawahlunto Old Town (UNESCO World Heritage)",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196738/1787196723111_ytqeq2.png",
    lat: -0.681667,
    lng: 100.776667
  },
  {
    id: "ev6",
    title: "Payakumbuh Botuang Festival",
    titleEn: "Payakumbuh Botuang Festival",
    category: "Festival Seni & Budaya",
    categoryEn: "Music & Eco-Arts Festival",
    regency: "Kota Payakumbuh",
    tag: "Festival Unggulan",
    tagEn: "Featured Festival",
    isKen: false,
    schedule: "Juli / Agustus 2026 (Jadwal Dikonfirmasi Ulang)",
    scheduleEn: "July / August 2026 (Schedule To Be Confirmed)",
    monthIndex: 6,
    highlights: [
      "Eksplorasi Artistik Bambu (Botuang)",
      "Pertunjukan Musik Etnik & Instalasi Seni Bambu",
      "Pentas Seni & Budaya Luak Limopuluah"
    ],
    highlightsEn: [
      "Artistic Exploration of Bamboo (Botuang)",
      "Ethnic Music Performances & Bamboo Art Installations",
      "Luak Limopuluah Cultural Arts Stage"
    ],
    description: "Payakumbuh Botuang Festival adalah perhelatan seni dan ekologi inovatif yang mengeksplorasi tanaman botuang (bambu) sebagai unsur vital dalam kebudayaan masyarakat Luak Limopuluah. Diselenggarakan di kawasan perbukitan hijau Panorama Ampangan, festival ini menggabungkan kesenian tradisional Minangkabau dengan eksplorasi artistik kontemporer berwawasan lingkungan.\n\nSeniman musik, perajin kriya, arsitek, dan koreografer dari berbagai penjuru tanah air berkumpul untuk menciptakan instalasi megah dari bambu, memainkan alat musik bambu langka seperti talempong botuang dan sampelong, serta menggelar pertunjukan teater alam. Pengunjung juga disuguhi tradisi kuliner lamang tapai dan aneka masakan nagari yang dimasak langsung di dalam bilah bambu segar.\n\nFestival ini menjadi ruang edukasi penting tentang pelestarian ekosistem rumpun bambu serta potensi ekonominya bagi pemberdayaan masyarakat pedesaan. Di malam hari, tata lampu artistik yang menyinari instalasi bambu raksasa berpadu dengan udara sejuk pegunungan, menghadirkan pesona magis yang memanjakan panca indera wisatawan.",
    descriptionEn: "Payakumbuh Botuang Festival is an innovative arts and ecological celebration that explores the multifaceted significance of botuang (bamboo) in the cultural fabric of the Luak Limopuluah region. Staged amidst the verdant highlands of Panorama Ampangan, the festival bridges ancient Minangkabau heritage with eco-conscious contemporary artistic expression.\n\nMaster musicians, artisans, architects, and choreographers from across the nation gather to craft monumental bamboo sculptures, perform on rare ethnic bamboo instruments such as talempong botuang and sampelong flutes, and present immersive open-air nature theatricals. Visitors are also treated to traditional lamang tapai and authentic dishes slow-cooked inside freshly harvested bamboo tubes.\n\nThe festival serves as an invaluable platform for environmental education, highlighting bamboo conservation and its vast potential for rural community empowerment. As night falls, artistic illuminations cast a warm glow over massive bamboo installations against the crisp mountain air, offering an enchanting visual and acoustic sanctuary.",
    locationName: "Kawasan Wisata Panorama Ampangan, Payakumbuh",
    locationNameEn: "Ampangan Highland Tourism Area, Payakumbuh",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196698/1787196442270_ybz0i1.png",
    lat: -0.224722,
    lng: 100.632222
  },
  {
    id: "ev7",
    title: "Festival Pesona Minangkabau (KEN)",
    titleEn: "Festival Pesona Minangkabau (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Cultural Festival",
    regency: "Kabupaten Tanah Datar",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "25 – 27 Juni 2026 (Sudah Terselenggara)",
    scheduleEn: "June 25 – 27, 2026 (Completed)",
    monthIndex: 5,
    highlights: [
      "Pawai Budaya Autentik Istano Pagaruyung",
      "Pameran Matrilineal & Rekor MURI Bundo Kanduang",
      "Event Puncak Karisma Event Nusantara 2026"
    ],
    highlightsEn: [
      "Grand Cultural Parade at Pagaruyung Palace",
      "Matrilineal Exhibitions & Bundo Kanduang Feats",
      "Grand Finale of Karisma Event Nusantara 2026"
    ],
    description: "Festival Pesona Minangkabau adalah mahakarya perayaan kebudayaan terbesar di Sumatera Barat yang digelar secara megah di pelataran bersejarah Istano Basa Pagaruyung, Kabupaten Tanah Datar. Sebagai ajang puncak dalam kalender Karisma Event Nusantara (KEN), festival ini menjadi etalase utama yang merepresentasikan seluruh spektrum adat, seni pertunjukan, dan nilai-nilai luhur Alam Minangkabau.\n\nPerhelatan akbar ini menampilkan ragam prosesi spektakuler, termasuk pawai budaya ribuan Bundo Kanduang dengan busana adat kebesaran dari 19 kabupaten/kota, pemecahan rekor MURI prosesi Makan Bajamba terpanjang, festival tari piring di atas pecahan kaca, pertunjukan silat tradisi (silek tuo), dan pagelaran musik tradisi Minang klasik.\n\nPengunjung festival dapat berinteraksi langsung dengan para tetua adat, menikmati pameran kriya dan artefak kerajaan Minangkabau kuno, serta mencicipi aneka kuliner langka yang disajikan secara otentik. Dengan latar kemegahan Istano Basa Pagaruyung beratap gonjong bertingkat tiga, festival ini menawarkan pengalaman budaya yang tak terlupakan bagi wisatawan nusantara maupun mancanegara.",
    descriptionEn: "Festival Pesona Minangkabau is the crowning cultural extravaganza in West Sumatra, staged against the majestic historical backdrop of Istano Basa Pagaruyung Palace in Tanah Datar Regency. As a flagship event within the national Karisma Event Nusantara (KEN) calendar, it serves as the ultimate showcase representing the full spectrum of Minangkabau customs, performing arts, and philosophical values.\n\nThe grand festival features awe-inspiring spectacles including a grand cultural parade of thousands of Bundo Kanduang matriarchs in regal traditional attire from all 19 cities and regencies, MURI record-breaking Makan Bajamba communal feasts, plate-dancing feats over shattered glass, ancient silek tuo martial arts exhibitions, and classical orchestral performances.\n\nVisitors can engage directly with traditional clan elders, admire historical artifact exhibitions from the ancient Minangkabau kingdom, and savor rare heirloom culinary recipes. Framed by the three-tiered gonjong roofs of Pagaruyung Palace, this festival delivers an immersive cultural journey of unmatched authenticity.",
    locationName: "Kompleks Istano Basa Pagaruyung, Tanah Datar",
    locationNameEn: "Istano Basa Pagaruyung Palace, Tanah Datar",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196919/1787196899703_tdjyml.png",
    lat: -0.471111,
    lng: 100.621111
  },
  {
    id: "ev8",
    title: "Festival Siti Nurbaya (KEN)",
    titleEn: "Siti Nurbaya Cultural Festival (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Heritage Festival",
    regency: "Kota Padang",
    tag: "KEN / CoE",
    tagEn: "KEN / CoE",
    isKen: true,
    schedule: "4 – 7 Agustus 2026 (HUT Kota Padang)",
    scheduleEn: "August 4 – 7, 2026 (Padang City Anniversary)",
    monthIndex: 7,
    highlights: [
      "Pentas Seni Kolosal Legenda Siti Nurbaya",
      "Pawai Baju Kuruang Basiba Terbanyak",
      "Perayaan Hari Jadi Kota Padang"
    ],
    highlightsEn: [
      "Colossal Theatrical Drama of Siti Nurbaya Legend",
      "Baju Kuruang Basiba Traditional Attire Parade",
      "Padang City Anniversary Celebration"
    ],
    description: "Festival Siti Nurbaya adalah perhelatan seni, budaya, dan sejarah pesisir yang diselenggarakan setiap tahun bertepatan dengan peringatan Hari Jadi Kota Padang. Mengangkat mahakarya sastra klasik novel Roman Siti Nurbaya karya Marah Rusli, festival Karisma Event Nusantara (KEN) ini memusatkan kegiatannya di kawasan bersejarah Kota Tua Padang, Jembatan Siti Nurbaya, dan tepian Sungai Batang Arau.\n\nBeragam agenda atraktif memeriahkan festival, mulai dari pentas drama musikal kolosal riwayat Siti Nurbaya, pawai Baju Kuruang Basiba yang diikuti ribuan perempuan Minang, lomba memasak Marandang masal, parade selaju sampan tradisional di muara sungai, hingga karnaval budaya multi-etnis yang mencerminkan harmoni kebersamaan warga Minang, Tionghoa, Nias, dan Jawa di Kota Padang.\n\nFestival ini menjadi pintu gerbang bagi wisatawan untuk menjelajahi keindahan arsitektur heritage tempo doeloe, menikmati panorama matahari terbenam di puncak Gunung Padang tempat makam legenda Siti Nurbaya berada, serta mencicipi aneka jajanan legendaris di sepanjang pesisir Pantai Padang yang memikat.",
    descriptionEn: "Siti Nurbaya Cultural Festival is a coastal arts, heritage, and literary celebration held annually to commemorate the founding anniversary of Padang City. Inspired by Marah Rusli's timeless Minangkabau literary masterpiece, this Karisma Event Nusantara (KEN) festival unfolds across historic landmarks including Padang Old Town, Siti Nurbaya Bridge, and the Batang Arau riverfront.\n\nThe festival lineup features grand musical theatrical reenactments of the Siti Nurbaya romance, an elaborate parade of thousands wearing traditional Baju Kuruang Basiba attire, mass rendang cooking competitions (marandang), traditional riverboat regattas, and multicultural parades showcasing peaceful coexistence among Minang, Chinese, Nias, and Javanese communities.\n\nThe event offers travelers a wonderful opportunity to wander through vintage colonial heritage quarters, hike up Mount Padang to visit the legendary Siti Nurbaya vantage point at sunset, and indulge in iconic culinary delicacies along the bustling Padang waterfront promenade.",
    locationName: "Jembatan Siti Nurbaya & Kawasan Batang Arau, Padang",
    locationNameEn: "Siti Nurbaya Bridge & Batang Arau Waterfront, Padang",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787156727/ChatGPT_Image_Aug_19_2026_11_24_31_PM_uid5ii.png",
    lat: -0.9575,
    lng: 100.36
  },
  {
    id: "ev9",
    title: "Festival Rakik-Rakik Danau Maninjau (KEN)",
    titleEn: "Maninjau Rakik-Rakik Floating Festival (KEN)",
    category: "Budaya & Tradisi",
    categoryEn: "Heritage & Water Festival",
    regency: "Kabupaten Agam",
    tag: "KEN / Tradisi",
    tagEn: "KEN / Tradition",
    isKen: true,
    schedule: "Malam Idul Fitri & 28 – 30 Juni 2026",
    scheduleEn: "Eid al-Fitr Eve & June 28 – 30, 2026",
    monthIndex: 5,
    highlights: [
      "Parade Rakik Bambu Terapung Berhias Cahaya",
      "Dentuman Meriam Karbit Bambu Menggelegar",
      "Tradisi Malam Hari Raya Idul Fitri"
    ],
    highlightsEn: [
      "Parade of Illuminated Floating Bamboo Rafts",
      "Echoing Traditional Carbide Bamboo Cannons",
      "Timeless Eid Night Festivity"
    ],
    description: "Festival Rakik-Rakik adalah tradisi maritim danau yang sangat sakral dan telah diwariskan turun-temurun oleh masyarakat salingka Danau Maninjau di Kabupaten Agam. Digelar khusus pada malam perayaan Hari Raya Idul Fitri (1 Syawal) dan libur lebaran, tradisi ini merupakan bentuk sukacita kemenangan spiritual anak nagari setelah sebulan penuh berpuasa Ramadan.\n\nSetiap nagari di sekeliling danau bergotong royong merakit bambu raksasa (rakik) yang dihias megah menyerupai miniatur Rumah Gadang, Masjid bertingkat, atau perahu perang tradisional yang diterangi ratusan obor dan lampu hias kelap-kelip. Di atas rakik terapung di tengah perairan danau, warga menyalakan meriam karbit bambu yang menghasilkan dentuman menggelegar bersahut-sahutan di antara tebing-tebing kaldera Danau Maninjau.\n\nKeindahan pantulan cahaya lampu rakik di atas permukaan air danau yang tenang berpadu dengan gemerlap kembang api dan dentuman meriam menciptakan panorama malam hari raya yang magis dan sangat fotogenik. Wisatawan dapat menyaksikan keajaiban ini dari dermaga tepi danau sambil menikmati hangatnya secangkir Kawa Daun dan hidangan Palai Rinuak khas Maninjau.",
    descriptionEn: "Rakik-Rakik Floating Festival is a sacred lacustrine heritage tradition cherished for generations across the villages surrounding Lake Maninjau in Agam Regency. Celebrated on the eve of Eid al-Fitr (1st of Shawwal) and during the holiday season, this vibrant festival expresses the communal joy and spiritual triumph of the villagers following the holy month of Ramadan.\n\nEach lakeside nagari unites to construct massive floating bamboo rafts (rakik), elaborately sculpted into illuminated miniatures of traditional Rumah Gadang palaces, multi-tiered mosques, or ancient royal barges adorned with hundreds of oil torches. Floating across the lake waters, villagers ignite traditional carbide bamboo cannons, producing thunderous booming echoes that reverberate against the towering volcanic caldera walls.\n\nThe magical glow of hundreds of floating lanterns reflected upon the tranquil lake surface, paired with fireworks and celebratory cannonades, creates an unforgettable photographic spectacle. Visitors can enjoy this enchanting night from lakeside piers while savoring warm cups of Kawa Daun coffee-leaf tea and authentic grilled Palai Rinuak fish.",
    locationName: "Tepian Nagari Maninjau & Sungai Batang, Danau Maninjau",
    locationNameEn: "Shores of Maninjau & Sungai Batang, Lake Maninjau",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787156603/GDLDe_hphc4k.jpg",
    lat: -0.301389,
    lng: 100.178611
  },
  {
    id: "ev10",
    title: "Festival 5 Danau Solok (KEN)",
    titleEn: "Solok 5 Lakes Ecotourism Festival (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Nature & Cultural Festival",
    regency: "Kabupaten Solok",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "9 – 11 Juli 2026",
    scheduleEn: "July 9 – 11, 2026",
    monthIndex: 6,
    highlights: [
      "Eksplorasi 5 Danau Alami Kabupaten Solok",
      "Pentas Seni Danau Atas & Danau Bawah",
      "Terpilih Masuk Kalender KEN 2026"
    ],
    highlightsEn: [
      "Exploration of 5 Pristine Volcanic Lakes",
      "Lakeside Cultural Shows at Upper & Lower Lakes",
      "Official KEN 2026 Tourism Calendar"
    ],
    description: "Festival 5 Danau Solok adalah perhelatan pariwisata dan ekowisata terpadu yang mempromosikan keajaiban alam Kabupaten Solok sebagai daerah dengan danau alami terbanyak di Sumatera Barat. Terpilih dalam agenda bergengsi Karisma Event Nusantara (KEN), festival ini merayakan kekayaan ekologis lima danau vulkanik yaitu Danau Singkarak, Danau Diatas, Danau Dibawah, Danau Talang, dan Danau Tuo.\n\nKegiatan festival tersebar di berbagai titik danau dengan menggabungkan atraksi olahraga air, kompetisi dayung perahu naga, pendakian jalur danau kawah Gunung Talang, parade budaya anak nagari, dan festival kopi arabika dataran tinggi Alahan Panjang. Di tepian Danau Diatas dan Dibawah yang berhawa dingin sejuk 1.500 mdpl, panggung seni menampilkan tari piring dan dendang musik Minang kontemporer.\n\nFestival ini menjadi sarana strategis dalam mengedukasi wisatawan mengenai pentingnya konservasi ekosistem daerah tangkapan air dan danau vulkanik, sekaligus membuka potensi agrowisata perkebunan teh dan sayur organik Alahan Panjang. Pemandangan danau kembar berlatar langit biru dan perbukitan pinus menjadikannya destinasi liburan keluarga yang sangat menyegarkan.",
    descriptionEn: "Solok 5 Lakes Ecotourism Festival is an integrated nature, culture, and sports festival celebrating the unique geography of Solok Regency, home to the largest collection of natural volcanic lakes in West Sumatra. Featured in the prestigious Karisma Event Nusantara (KEN) calendar, it spotlights five pristine lakes: Lake Singkarak, Lake Diatas, Lake Dibawah, Lake Talang, and Lake Tuo.\n\nFestival events span multiple scenic lakeside venues, combining competitive dragon boat regattas, crater trekking excursions around Mount Talang, local cultural parades, and highland specialty Arabica coffee exhibitions from Alahan Panjang. Set against the crisp, cool 1,500-meter altitude climate of the Twin Lakes, open-air stages host energetic plate dancing and contemporary Minang musical compositions.\n\nThe festival serves as a vital platform for promoting lacustrine conservation and watershed protection while driving eco-tourism across Alahan Panjang's vast tea plantations and organic farms. The breathtaking lake vistas framed by pine-clad volcanic ridges make it an idyllic holiday haven for families and eco-travelers.",
    locationName: "Kawasan Danau Kembar & Danau Singkarak, Kab. Solok",
    locationNameEn: "Twin Lakes & Lake Singkarak Area, Solok Regency",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787136230/ChatGPT_Image_Aug_19_2026_05_43_33_PM_b6m6r9.png",
    lat: -1.066667,
    lng: 100.733333
  },
  {
    id: "ev11",
    title: "Sawahlunto International Music Festival / SIMFes (KEN)",
    titleEn: "Sawahlunto Int. Music Festival / SIMFes (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "World Music Festival",
    regency: "Kota Sawahlunto",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "17 – 18 Juli 2026",
    scheduleEn: "July 17 – 18, 2026",
    monthIndex: 6,
    highlights: [
      "Panggung Musik Etnik Kontemporer Dunia",
      "Musisi Mancanegara & Maestro Tradisi Minang",
      "Karisma Event Nusantara 2026"
    ],
    highlightsEn: [
      "World Contemporary & Ethnic Music Stage",
      "International Virtuosos & Minang Heritage Masters",
      "Karisma Event Nusantara 2026"
    ],
    description: "Sawahlunto International Music Festival (SIMFes) adalah festival musik etnik dan kontemporer berskala internasional yang diselenggarakan di Kota Sawahlunto, Sumatera Barat. Masuk dalam jajaran Karisma Event Nusantara (KEN), SIMFes menghadirkan panggung dialog musikal lintas benua yang mempertemukan musisi-musisi dunia dengan para maestro musik tradisional Minangkabau dan Nusantara.\n\nKeunikan luar biasa dari SIMFes terletak pada pemilihan panggung konsernya yang memanfaatkan bangunan-bangunan cagar budaya bekas industri tambang batu bara Ombilin UNESCO, seperti Museum Gudang Ransum, Silo Batubara, dan Lapangan Segitiga. Alunan seruling saluang, ketukan talempong, dan petikan rabab berpadu harmonis dengan instrumen modern seperti jazz, world music, perkusi Afrika, hingga musik klasik Eropa.\n\nSelain konser musik spektakuler di malam hari, SIMFes menyelenggarakan workshop musik etnik bagi generasi muda, masterclass komposisi, dan sesi jamming interaktif di kafe-kafe vintage kota tua. Atmosfer artistik berpadu dengan eksotisme arsitektur kolonial menjadikan SIMFes salah satu festival musik paling berkarakter di Asia Tenggara.",
    descriptionEn: "Sawahlunto International Music Festival (SIMFes) is a world-class ethnic and contemporary world music festival held in the historic city of Sawahlunto, West Sumatra. Curated within the national Karisma Event Nusantara (KEN) roster, SIMFes fosters a vibrant cross-continental musical dialogue bringing together celebrated international artists with master composers of Minangkabau and Indonesian traditional arts.\n\nThe defining highlight of SIMFes is its atmospheric concert stages set within the preserved industrial heritage architecture of the UNESCO-listed Ombilin coal mining complex, including the Gudang Ransum Museum, Coal Silos, and Segitiga Square. The haunting melodies of saluang bamboo flutes and rhythmic talempong gongs blend seamlessly with world jazz, African percussion, and classical orchestrations.\n\nBeyond nightly outdoor concerts, SIMFes hosts interactive world music workshops, masterclasses for young talents, and spontaneous jam sessions in vintage old-town cafes. The sublime fusion of acoustic virtuosity and 19th-century colonial charm establishes SIMFes as one of Southeast Asia's most distinctive music festivals.",
    locationName: "Museum Gudang Ransum & Lapangan Segitiga, Sawahlunto",
    locationNameEn: "Gudang Ransum Museum & Segitiga Square, Sawahlunto",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196363/1787196348904_qbwzti.png",
    lat: -0.683333,
    lng: 100.783333
  },
  {
    id: "ev12",
    title: "Festival Pesona Mentawai (KEN)",
    titleEn: "Pesona Mentawai Indigenous Festival (KEN)",
    category: "Budaya & Tradisi",
    categoryEn: "Indigenous Heritage Festival",
    regency: "Kabupaten Kepulauan Mentawai",
    tag: "KEN 2026",
    tagEn: "KEN 2026",
    isKen: true,
    schedule: "1 – 3 Oktober 2026",
    scheduleEn: "October 1 – 3, 2026",
    monthIndex: 9,
    highlights: [
      "Ritual Sakral Sikerei Mentawai",
      "Eksibisi Tato Tradisional Tertua di Dunia",
      "Karisma Event Nusantara 2026"
    ],
    highlightsEn: [
      "Sacred Sikerei Shamanic Rites & Dances",
      "World Oldest Traditional Tattooing Exhibition",
      "Karisma Event Nusantara 2026"
    ],
    description: "Festival Pesona Mentawai adalah festival kebudayaan suku asli (indigenous heritage) paling otentik di Indonesia yang diselenggarakan di Kepulauan Mentawai, gugusan kepulauan eksotis di lepas pantai Samudra Hindia. Diakui dalam kalender Karisma Event Nusantara (KEN), festival ini didedikasikan untuk merayakan kearifan hidup, spiritualitas, dan kebudayaan megalitik Suku Mentawai yang masih terjaga murni.\n\nPengunjung festival dapat menyaksikan langsung ritual sakral pengobatan oleh Sikerei (dukun adat dan penjaga spiritual Mentawai), pertunjukan tarian mistis Turuk Laggai yang menirukan gerak-gerik binatang hutan, demonstrasi seni rajah tubuh tertua di dunia (Titi Mentawai), serta pembuatan pakaian tradisional dari serat kulit kayu terap (Baiko). Di pantai, digelar pula eksibisi selancar ombak kelas dunia bersama peselancar internasional.\n\nFestival ini menjadi jendela langka bagi wisatawan dunia untuk memahami filosofi Arat Sabulungan (kepercayaan tradisional keselarasan manusia dengan roh alam semesta). Dilengkapi dengan jelajah hutan hujan tropis Siberut dan mencicipi kuliner sagu olahan tradisional, Festival Pesona Mentawai menawarkan ekspedisi antropologis yang tiada duanya di dunia.",
    descriptionEn: "Festival Pesona Mentawai is Indonesia's most authentic indigenous cultural gathering, celebrated across the pristine archipelago of the Mentawai Islands in the Indian Ocean. Endorsed by the national Karisma Event Nusantara (KEN) program, the festival is dedicated to honoring the ancestral wisdom, spirituality, and living megalithic heritage of the indigenous Mentawai people.\n\nVisitors are granted rare firsthand access to sacred healing rituals performed by Sikerei (traditional shamans), mystical Turuk Laggai bird and animal dances, live demonstrations of the world's oldest hand-tapped tattooing tradition (Titi Mentawai), and bark-cloth apparel crafting (Baiko). On the coastline, the festivities are matched with high-octane surfing showcases on world-class barrel waves.\n\nThe festival opens a profound window into the ancient philosophy of Arat Sabulungan—the spiritual harmony between mankind and the living souls of nature. Combined with guided treks into Siberut's rainforest and tasting traditional smoked sago culinary delicacies, it provides an unparalleled anthropological journey of a lifetime.",
    locationName: "Pantai Muntei & Tuapejat, Kepulauan Mentawai",
    locationNameEn: "Muntei Beach & Tuapejat, Mentawai Islands",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787137611/ChatGPT_Image_Aug_19_2026_06_06_21_PM_p0jijg.png",
    lat: -2.0125,
    lng: 99.593889
  },
  {
    id: "ev13",
    title: "Alek Barajang / Alek Bakajang (KEN)",
    titleEn: "Alek Bakajang Cultural Heritage (KEN)",
    category: "Budaya & Tradisi",
    categoryEn: "Culture & Tradition",
    regency: "Kabupaten Lima Puluh Kota",
    tag: "KEN / Tradisi",
    tagEn: "KEN / Tradition",
    isKen: true,
    schedule: "24 – 28 Maret 2026 (Sudah Terselenggara)",
    scheduleEn: "March 24 – 28, 2026 (Completed)",
    monthIndex: 2,
    highlights: [
      "Tradisi Berlayar Sampan Hias di Batang Maek",
      "Silaturahmi Sakral 5 Suku Gunuang Malintang",
      "Warisan Budaya Takbenda Nasional & KEN"
    ],
    highlightsEn: [
      "Decorated Boat Procession Along Batang Maek",
      "Sacred 5-Clan Kinship Reunion in Gunuang Malintang",
      "National Intangible Heritage & KEN Event"
    ],
    description: "Alek Bakajang adalah tradisi maritim sungai adat yang sangat unik dan telah dinobatkan sebagai Warisan Budaya Takbenda (WBTb) Indonesia serta Karisma Event Nusantara (KEN). Digelar setiap tahun pada hari ke-3 hingga ke-7 Syawal pasca Idul Fitri di Nagari Gunuang Malintang, Kecamatan Pangkalan Koto Baru, Kabupaten Lima Puluh Kota, festival ini merupakan simbol kerukunan dan persatuan lima suku adat setempat.\n\nDaya tarik utama festival ini adalah pelayaran kapal-kapal kajang (perahu kayu tradisional) yang dihias megah menyerupai replika Rumah Gadang terapung dan kapal pesiar tradisional dengan kubah serta ornamen Minangkabau yang berwarna-warni. Masing-masing kajang mewakili klan adat (Datuak Nan Berompek, Alim Ulama, Cadiak Pandai, Bundo Kanduang, dan Pemuda) yang berlayar menyusuri aliran Sungai Batang Maek untuk saling mengunjungi rumah pimpinan adat.\n\nRibuan perantau yang pulang kampung dan warga nagari tumpah ruah di sepanjang tebing sungai untuk menyaksikan arak-arakan kajang sambil diiringi musik talempong, dendang pantun, dan letupan kembang api. Alek Bakajang menjadi wujud nyata nilai luhur gotong royong dan ikatan silaturahmi sakral yang senantiasa dirawat melintasi generasi.",
    descriptionEn: "Alek Bakajang is a distinct riverine heritage festival officially designated as an Indonesian National Intangible Cultural Heritage (WBTb) and celebrated under the Karisma Event Nusantara (KEN) banner. Held annually from the 3rd to 7th of Shawwal following Eid al-Fitr in Nagari Gunuang Malintang, Lima Puluh Kota Regency, it serves as a sacred embodiment of kinship and solidarity among the village's five customary clans.\n\nThe centerpiece of the festival is the ceremonial voyage of intricately decorated kajang riverboats, beautifully crafted into floating replicas of traditional Rumah Gadang palaces and majestic vessels adorned with colorful Minang motifs. Each decorated vessel represents a customary clan pillar navigating along the clear waters of the Batang Maek River to conduct formal kinship visitations with clan chiefs.\n\nThousands of returning diaspora and local villagers gather along the lush riverbanks to celebrate the passing boat flotilla amidst lively talempong melodies, improvised poetry, and celebratory fireworks. Alek Bakajang stands as a living testament to communal unity and ancestral bonds preserved faithfully across generations.",
    locationName: "Batang Maek, Nagari Gunuang Malintang, Kab. Lima Puluh Kota",
    locationNameEn: "Batang Maek River, Gunuang Malintang, Lima Puluh Kota",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787199343/1787199325616_qgj3vh.png",
    lat: -0.05,
    lng: 100.58
  },
  {
    id: "ev14",
    title: "Festival Langkisau Pesisir Selatan",
    titleEn: "Langkisau Beach & Paragliding Festival",
    category: "Olahraga & Bahari",
    categoryEn: "Coastal Sport & Festival",
    regency: "Kabupaten Pesisir Selatan",
    tag: "CoE Sumbar",
    tagEn: "CoE Sumbar",
    isKen: false,
    schedule: "16 – 22 April 2026 (HUT Kab. Pesisir Selatan)",
    scheduleEn: "April 16 – 22, 2026 (Pesisir Selatan Anniversary)",
    monthIndex: 3,
    highlights: [
      "Kejuaraan Paralayang Internasional Bukit Langkisau",
      "Pentas Seni Pantai Carocok & Pawai Selaju Sampan",
      "Peringatan Hari Jadi Kabupaten"
    ],
    highlightsEn: [
      "International Paragliding from Langkisau Hill",
      "Carocok Beach Arts Stage & Boat Racing",
      "Regency Founding Anniversary Festival"
    ],
    description: "Festival Langkisau adalah perhelatan pariwisata bahari dan olahraga dirgantara terbesar di pesisir barat Sumatera yang diselenggarakan setiap bulan April dalam rangka memperingati Hari Jadi Kabupaten Pesisir Selatan. Berpusat di kawasan wisata Pantai Carocok Painan dan Puncak Bukit Langkisau, festival ini memadukan kemegahan lanskap laut tropis dengan atraksi budaya dan olahraga ekstrem.\n\nSorotan utama festival adalah kejuaraan paralayang dan gantole tingkat nasional dan internasional, di mana para atlet meluncur dari puncak Bukit Langkisau dan mendarat mulus di hamparan pasir Pantai Salido dengan latar pemandangan teluk Painan 360 derajat yang spektakuler. Di perairan pantai, digelar lomba dayung selaju sampan tradisional, turnamen voli pantai, dan parade perahu nelayan hias.\n\nPengunjung festival dapat menikmati bazar kuliner laut khas pesisir seperti Sate Lokan dan Gulai Ikan Karang segar, panggung musik pantai di Pantai Carocok, serta menyeberang via jembatan apung ke Pulau Cingkuak untuk menjelajahi reruntuhan benteng bersejarah Portugis dan VOC Belanda abad ke-17.",
    descriptionEn: "Langkisau Coastal & Sports Festival is the premier marine tourism and aerosport event in western Sumatra, held annually every April to celebrate the founding anniversary of Pesisir Selatan Regency. Centered around Carocok Beach in Painan and the summit of Bukit Langkisau, the festival seamlessly blends breathtaking tropical sea landscapes with vibrant cultural festivities and extreme sports.\n\nThe crown jewel of the event is the national and international paragliding and hang-gliding championship, where pilots launch from the 400-meter crest of Langkisau Hill to glide over azure waters and land on Salido Beach against a 360-degree panorama of Painan Bay. Coastal waters come alive with traditional wooden boat races, beach volleyball cups, and illuminated flotilla parades.\n\nTravelers can savor delectable fresh seafood feasts including Sate Lokan clam skewers and rich fish curries, enjoy sunset concerts at Carocok Beach, and take a floating bridge across to Cingkuak Island to explore the atmospheric ruins of 17th-century Portuguese and Dutch VOC fortifications.",
    locationName: "Bukit Langkisau & Pantai Carocok Painan, Pesisir Selatan",
    locationNameEn: "Langkisau Hill & Carocok Beach Painan, Pesisir Selatan",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787196224/1787196207215_mozi10.png",
    lat: -1.35,
    lng: 100.566667
  },
  {
    id: "ev15",
    title: "Festival Tradisi Maapam Pasaman (Rekor MURI)",
    titleEn: "Pasaman Maapam Heritage Culinary Festival",
    category: "Budaya & Tradisi",
    categoryEn: "Culinary Heritage",
    regency: "Kabupaten Pasaman",
    tag: "Tradisi Adat",
    tagEn: "Customary Tradition",
    isKen: false,
    schedule: "Bulan Rajab 1447 H (Menyambut Peringatan Isra Mi'raj)",
    scheduleEn: "Rajab 1447 H (Commemorating Isra Mi'raj)",
    monthIndex: 0,
    highlights: [
      "Tradisi Memasak Apam Massal Ratusan Kuali",
      "Pemecahan Rekor MURI Apam Terbanyak",
      "Tradisi Menjunjung Nilai Gotong Royong"
    ],
    highlightsEn: [
      "Massive Apam Cake Cooking in Hundreds of Cauldrons",
      "MURI Record for Largest Apam Gathering",
      "Celebration of Communal Solidarity"
    ],
    description: "Festival Tradisi Maapam adalah perayaan kuliner adat dan warisan budaya komunal yang sangat dibanggakan oleh masyarakat Kabupaten Pasaman dan Pasaman Barat. Digelar setiap tahun menyambut bulan Rajab dalam kalender Hijriah untuk memperingati peristiwa sakral Isra Mi'raj Nabi Muhammad SAW, tradisi memasak apam ini telah diwariskan turun-temurun sebagai simbol sedekah dan pembersihan jiwa.\n\nRibuan kaum ibu (Bundo Kanduang) dan warga nagari berkumpul bersama di pelataran terbuka untuk memasak kue apam tradisional secara serentak menggunakan ratusan kuali tanah liat dan tungku kayu bakar. Adonan tepung beras yang lembut dipanggang perlahan di atas daun pisang, menghasilkan kue apam bertekstur empuk harum yang disajikan dengan siraman kuah santan gula aren kental yang manis dan gurih.\n\nFestival ini telah tercatat dalam Museum Rekor Dunia Indonesia (MURI) sebagai ajang memasak apam massal terbanyak di Indonesia. Nilai filosofis utama dari tradisi ini adalah mempererat jalinan tali silaturahmi antar-warga, menjunjung tinggi semangat gotong royong, dan melestarikan warisan gastronomi leluhur Ranah Pasaman bagi generasi muda.",
    descriptionEn: "Pasaman Maapam Heritage Culinary Festival is a proud communal culinary tradition celebrated across Pasaman and West Pasaman Regencies. Held annually during the holy month of Rajab in the Islamic calendar to commemorate the ascension of Isra Mi'raj, this mass apam cooking ritual has been handed down through generations as an act of charity, gratitude, and spiritual purification.\n\nThousands of village women (Bundo Kanduang) assemble in open town squares to cook traditional apam cakes simultaneously over hundreds of earthenware cauldrons and crackling firewood stoves. The delicate rice-flour batter is slow-steamed over fresh banana leaves, producing soft, fragrant cakes served with rich, warm palm-sugar coconut milk syrup.\n\nThe festival holds an official record in the Indonesian World Records Museum (MURI) for the largest simultaneous mass apam gathering in the nation. The central essence of the tradition lies in strengthening inter-village kinship, celebrating communal solidarity, and preserving Pasaman's timeless gastronomic heritage for future generations.",
    locationName: "Gedung Syamsiar Thaib & Nagari se-Kabupaten Pasaman",
    locationNameEn: "Syamsiar Thaib Hall & Pasaman Nagari Centers",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787156929/ChatGPT_Image_Aug_19_2026_11_27_20_PM_hfik9x.png",
    lat: 0.14,
    lng: 100.18
  },
  {
    id: "ev16",
    title: "Pasa Harau Art & Culture Festival (KEN)",
    titleEn: "Pasa Harau Art & Culture Festival (KEN)",
    category: "Festival Seni & Budaya",
    categoryEn: "Eco-Arts & Culture Festival",
    regency: "Kabupaten Lima Puluh Kota",
    tag: "KEN / CoE",
    tagEn: "KEN / CoE",
    isKen: true,
    schedule: "28 – 30 Agustus 2026",
    scheduleEn: "August 28 – 30, 2026",
    monthIndex: 7,
    highlights: [
      "Pentas Seni Teater Alam di Bawah Tebing Granit",
      "Pasar Tradisional Kuliner Desa Lembah Harau",
      "Karisma Event Nusantara Kemenparekraf"
    ],
    highlightsEn: [
      "Nature Amphitheater Below Towering Granite Cliffs",
      "Traditional Village Artisan Market in Harau",
      "Karisma Event Nusantara by Kemenparekraf"
    ],
    description: "Pasa Harau Art & Culture Festival adalah perhelatan seni pertunjukan dan kebudayaan berbasis alam yang diselenggarakan di kawasan cagar alam Lembah Harau, Kabupaten Lima Puluh Kota. Termasuk dalam agenda unggulan Karisma Event Nusantara (KEN), festival ini menjadikan dinding-dinding tebing granit raksasa setinggi ratusan meter sebagai panggung megah teater alam terbuka.\n\nFestival ini menyuguhkan kolaborasi artistik yang memukau antara seniman tradisional Minangkabau dan seniman kontemporer dari dalam dan luar negeri. Agenda meliputi pertunjukan Randai kolosal di bawah tebing, konser musik etnik akustik malam hari, kemah budaya di kaki tebing granit, pawai arak-arakan budaya nagari, serta lokakarya seni rupa dan fotografi alam liar.\n\nDi tengah festival, digelar pula 'Pasa Harau' (Pasar Harau) yang menjajakan aneka kuliner otentik nagari, hasil bumi organik petani lokal, serta produk kriya anyaman dan tenun tradisional. Pengalaman menikmati alunan musik magis berpadu dengan gemericik air terjun Sarasah Bunta dan hembusan angin lembah menjadikan festival ini surga bagi para penikmat seni dan alam.",
    descriptionEn: "Pasa Harau Art & Culture Festival is an enchanting eco-arts and cultural celebration hosted within the dramatic granite wonderland of Harau Valley in Lima Puluh Kota Regency. Featured in the national Karisma Event Nusantara (KEN) calendar, the festival transforms the sheer 300-meter monolithic canyon walls into a majestic natural open-air amphitheater.\n\nThe festival showcases a captivating artistic dialogue between traditional Minangkabau masters and contemporary artists from across Indonesia and abroad. Highlights include colossal Randai folk-theatre performances below the cliffs, nighttime acoustic ethnic concerts under starlit skies, eco-campsites, cultural village processions, and environmental visual arts workshops.\n\nAt the heart of the grounds, the bustling 'Pasa Harau' village bazaar offers organic produce from local farmers, authentic heritage culinary delicacies, and woven handicrafts. Savoring evocative acoustic melodies accompanied by the rustle of tropical rainforests and distant waterfalls makes Pasa Harau a dream destination for art and nature enthusiasts.",
    locationName: "Kawasan Wisata Lembah Harau, Kab. Lima Puluh Kota",
    locationNameEn: "Harau Valley Nature Reserve, Lima Puluh Kota",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787138290/ChatGPT_Image_Aug_19_2026_06_17_59_PM_pi4q1a.png",
    lat: -0.100833,
    lng: 100.666944
  },
  {
    id: "ev17",
    title: "Festival Muaro Padang (Heritage & Waterfront)",
    titleEn: "Muaro Padang Waterfront & Heritage Festival",
    category: "Festival Seni & Budaya",
    categoryEn: "Waterfront Festival",
    regency: "Kota Padang",
    tag: "CoE Sumbar",
    tagEn: "CoE Sumbar",
    isKen: false,
    schedule: "18 – 24 April 2026 (Masa Libur Lebaran)",
    scheduleEn: "April 18 – 24, 2026 (Eid Holiday Season)",
    monthIndex: 3,
    highlights: [
      "Pentas Cahaya Muaro & Parade Selaju Sampan",
      "Bazar Kuliner Tempo Doeloe Kawasan Kota Tua",
      "Hiburan Utama Libur Lebaran Kota Padang"
    ],
    highlightsEn: [
      "Muaro Light Show & Dragon Boat Regatta",
      "Old Town Heritage Culinary Fair & Night Bazaar",
      "Premier Eid Holiday Festivity in Padang"
    ],
    description: "Festival Muaro Padang adalah pesta rakyat dan festival waterfront perkotaan yang diselenggarakan di sepanjang koridor cagar budaya Sungai Batang Arau dan Jembatan Siti Nurbaya, Kota Padang. Digelar khusus memeriahkan musim libur Idul Fitri dan hari libur nasional, festival ini merayakan keindahan kawasan kota tua bersejarah dan denyut kehidupan maritim muara sungai tertua di Sumatera Barat.\n\nBeragam pertunjukan dan atraksi spektakuler memikat puluhan ribu pengunjung, mulai dari lomba perahu naga (selaju sampan) tradisional antar-kelurahan, parade perahu hias berlampu warna-warni di malam hari, bazar kuliner tempo doeloe yang menjajakan kudapan legendaris Padang, hingga panggung musik jazz dan pop etnik di tepian sungai.\n\nPenataan kawasan Batang Arau yang telah direvitalisasi dengan trotoar pedestrian yang asri dan penerangan artistik memungkinkan wisatawan berjalan santai menikmati keindahan gedung-gedung kolonial peninggalan abad ke-19. Festival Muaro Padang berhasil membangkitkan kembali memori kejayaan pelabuhan Muaro tempo doeloe sebagai destinasi wisata malam yang aman dan menyenangkan bagi keluarga.",
    descriptionEn: "Festival Muaro Padang is a vibrant waterfront and urban heritage carnival celebrated along the scenic Batang Arau river corridor and Siti Nurbaya Bridge in Padang City. Organized during the festive Eid holiday season, the event commemorates the maritime legacy and historical charm of West Sumatra's oldest trading port and colonial riverfront.\n\nA dynamic array of attractions draws tens of thousands of visitors, featuring competitive dragon boat regattas (selaju sampan), an illuminated evening flotilla parade along the river, vintage street-food bazaars serving nostalgic Padang delicacies, and open-air jazz and ethnic acoustic stages beside the water.\n\nThe revitalized Batang Arau promenade, with its pedestrian-friendly walkways and artistic architectural lighting, allows tourists to take leisurely evening strolls admiring 19th-century colonial trading houses. Festival Muaro Padang successfully revitalizes the historical port into a safe, lively, and family-friendly evening tourism destination.",
    locationName: "Kawasan Kota Tua & Batang Arau, Kota Padang",
    locationNameEn: "Old Town Padang & Batang Arau Riverfront, Padang",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787200293/1787200094242_vf5jg8.png",
    lat: -0.963,
    lng: 100.355
  },
  {
    id: "ev18",
    title: "Festival Budaya Pamalayu Dharmasraya",
    titleEn: "Pamalayu Historical Heritage Festival",
    category: "Festival Seni & Budaya",
    categoryEn: "History & Heritage Festival",
    regency: "Kabupaten Dharmasraya",
    tag: "Sejarah & Budaya",
    tagEn: "History & Heritage",
    isKen: false,
    schedule: "6 – 10 Januari 2026 (HUT Kab. Dharmasraya)",
    scheduleEn: "January 6 – 10, 2026 (Dharmasraya Anniversary)",
    monthIndex: 0,
    highlights: [
      "Napak Tilas Ekspedisi Pamalayu Abad ke-13",
      "Arung Sejarah Sungai Batanghari & Candi Padang Roco",
      "Simposium Budaya Kerajaan Melayu Kuno"
    ],
    highlightsEn: [
      "Commemoration of 13th Century Pamalayu Expedition",
      "Batanghari Heritage River Rally & Padang Roco Temple",
      "Ancient Malay Kingdom Historical Symposium"
    ],
    description: "Festival Budaya Pamalayu adalah perhelatan sejarah dan kebudayaan akbar di Kabupaten Dharmasraya yang mengangkat kembali memori kejayaan Kerajaan Melayu Dharmasraya (Swarnabhumi) pada abad ke-13 Masehi. Berpusat di kawasan situs percandian purba Candi Padang Roco dan Sungai Batanghari, festival ini memperingati peristiwa bersejarah Ekspedisi Pamalayu dan persahabatan Nusantara antara Kerajaan Singhasari dan Dharmasraya.\n\nRangkaian acara diisi dengan prosesi sakral arung sejarah perahu tradisional di Sungai Batanghari, pameran artefak arkeologi langka termasuk replika arca Buddha Amoghapasa dan prasasti Padang Roco, simposium kebudayaan Melayu internasional, festival tari tradisi Melayu-Minang, serta perkemahan sejarah pemuda Nusantara.\n\nFestival ini memiliki nilai edukasi sejarah yang sangat tinggi dalam memperkenalkan peradaban maritim dan sungai kuno Sumatera kepada generasi muda dan wisatawan internasional. Di tepian Candi Padang Roco yang teduh, pengunjung dapat meresapi keagungan sejarah masa lalu sambil menikmati kerajinan batik tanah liek khas Dharmasraya.",
    descriptionEn: "Pamalayu Historical Heritage Festival is a monumental archaeological and cultural commemoration held in Dharmasraya Regency, reviving the golden era of the 13th-century Malayu Dharmasraya Kingdom (Swarnabhumi). Centered around the ancient brick sanctuaries of Padang Roco Temple and the Batanghari River, it commemorates the historic Pamalayu Expedition and ancient Nusantara diplomatic alliances.\n\nThe festival program features a ceremonial historical boat flotilla along the great Batanghari River, exhibitions of rare archaeological treasures including replicas of the sacred Amoghapasa statue and Padang Roco inscriptions, international Malay cultural symposiums, traditional dance festivals, and youth heritage camps.\n\nThe event provides profound historical education, illuminating ancient Sumatran riverine civilization for researchers, youth, and global travelers. Set within the tranquil grounds of Padang Roco Temple, visitors can immerse themselves in ancient history while admiring indigenous Dharmasraya natural-clay batik textiles (batik tanah liek).",
    locationName: "Kompleks Percandian Padang Roco, Kab. Dharmasraya",
    locationNameEn: "Padang Roco Temple Complex, Dharmasraya Regency",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787200291/1787200273036_tdqa7n.png",
    lat: -1.604167,
    lng: 101.476944
  },
  {
    id: "ev19",
    title: "Pacu Kudo Tradisional (Equestrian Heritage)",
    titleEn: "Minang Traditional Horse Racing Cup",
    category: "Olahraga & Bahari",
    categoryEn: "Traditional Equestrian Sport",
    regency: "Kota Bukittinggi, Payakumbuh & Sawahlunto",
    tag: "Olahraga Tradisi",
    tagEn: "Traditional Sport",
    isKen: false,
    schedule: "Februari, Juni, dan Oktober (Bergilir di Gelanggang Pacuan)",
    scheduleEn: "February, June, and October (Rotating Across Race Tracks)",
    monthIndex: 1,
    highlights: [
      "Gelanggang Bersejarah Bukit Ambacang & Kubu Gadang",
      "Joki Cilik Tradisional Tanpa Pelana",
      "Pesta Rakyat Olahraga Pacu Kuda Minang"
    ],
    highlightsEn: [
      "Historic Tracks at Bukit Ambacang & Kubu Gadang",
      "Daring Bareback Traditional Minang Jockeys",
      "Festive Equestrian Heritage Fair"
    ],
    description: "Pacu Kudo Tradisional adalah olahraga pacuan kuda adat bergengsi yang telah menjadi bagian tak terpisahkan dari identitas budaya masyarakat dataran tinggi Minangkabau selama lebih dari satu abad sejak era 1880-an. Digelar secara bergilir sepanjang tahun di gelanggang pacuan bersejarah seperti Bukit Ambacang Bukittinggi, Kubu Gadang Payakumbuh, dan Kandi Sawahlunto.\n\nCiri khas paling memukau dan menegangkan dari Pacu Kudo Minang adalah keberanian joki-joki muda lokal yang menunggangi kuda pacu tanpa menggunakan pelana (bareback riding) dengan kecepatan tinggi. Sorak-sorai puluhan ribu penonton yang memadati tribun tanah liat berbaur dengan kepulan debu dan derap kaki kuda, menciptakan atmosfer pesta rakyat yang luar biasa semarak.\n\nPacu Kudo bukan sekadar perlombaan olahraga, melainkan simbol gengsi dan prestise antar-nagari yang memotivasi peternak kuda lokal untuk memelihara bibit kuda unggul. Di sekitar area gelanggang, pasar kaget tradisional menyajikan aneka kuliner khas seperti Katupek Pitalah, Sate Danguang-Danguang, dan aneka cendramata khas anak nagari.",
    descriptionEn: "Minang Traditional Horse Racing Cup (Pacu Kudo) is a prestigious equestrian heritage sport deeply ingrained in the cultural identity of the Minangkabau highlands for over a century since the 1880s. Staged rotationally throughout the year at historic racetracks including Bukit Ambacang in Bukittinggi, Kubu Gadang in Payakumbuh, and Kandi in Sawahlunto.\n\nThe most thrilling and daring hallmark of Pacu Kudo is the remarkable skill of young traditional jockeys who ride powerful racehorses completely bareback without saddles at breakneck speeds. The roar of tens of thousands of spectators packing natural hillside viewing banks merges with thunderous hoofbeats and rising dust, generating an electrifying folk festival atmosphere.\n\nPacu Kudo is more than a sport; it is an arena of inter-village pride and prestige that drives local equestrian breeding and care. Surrounding the tracks, lively traditional markets offer iconic local delicacies such as Katupek Pitalah, Sate Danguang-Danguang, and authentic artisanal souvenirs.",
    locationName: "Gelanggang Bukit Ambacang (Bukittinggi) & Kubu Gadang (Payakumbuh)",
    locationNameEn: "Bukit Ambacang Track (Bukittinggi) & Kubu Gadang (Payakumbuh)",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787195712/1787195693518_nrffs7.png",
    lat: -0.295,
    lng: 100.355
  },
  {
    id: "ev20",
    title: "Festival Pesona Danau Maninjau & Kelok 44",
    titleEn: "Danau Maninjau & Kelok 44 Scenic Festival",
    category: "Festival Seni & Budaya",
    categoryEn: "Eco-Tourism & Lake Festival",
    regency: "Kabupaten Agam",
    tag: "Alam & Budaya",
    tagEn: "Nature & Culture",
    isKen: false,
    schedule: "14 – 18 Agustus 2026",
    scheduleEn: "August 14 – 18, 2026",
    monthIndex: 7,
    highlights: [
      "Tantangan Balap Tanjakan Ikonik Kelok 44",
      "Parade Budaya Salingka Danau & Kuliner Palai Rinuak",
      "Panggung Apung Danau Maninjau"
    ],
    highlightsEn: [
      "Iconic 44 Hairpin Turns Climb Challenge",
      "Lake Ring Cultural Parade & Palai Rinuak Tasting",
      "Floating Stage at Lake Maninjau"
    ],
    description: "Festival Pesona Danau Maninjau & Kelok 44 adalah perhelatan pariwisata terpadu yang memadukan keajaiban kaldera vulkanik purba Danau Maninjau dengan tantangan lintasan legendaris 44 kelokan tajam (Kelok 44) di Kabupaten Agam. Festival ini dirancang untuk mempromosikan potensi wisata olahraga alam (sport tourism), seni budaya salingka danau, dan pelestarian ekosistem danau.\n\nRangkaian kegiatan festival mencakup lomba lari maraton tanjakan Kelok 44 yang menguji ketahanan fisik para atlet di tengah udara sejuk pegunungan, kejuaraan paralayang lepas landas dari Puncak Lawang mendarat di tepian danau, parade perahu hias di perairan Maninjau, serta panggung seni musik terapung yang menampilkan kesenian tradisional Saluang dan Tambua Tasa.\n\nWisatawan dapat menikmati panorama spektakuler bentangan Danau Maninjau dari ketinggian Puncak Lawang, mengunjungi Rumah Kelahiran sastrawan dan ulama besar Buya Hamka di Nagari Sungai Batang, serta memanjakan lidah dengan mencicipi kuliner khas Rinuak goreng dan Bada Masiak yang lezat.",
    descriptionEn: "Danau Maninjau & Kelok 44 Scenic Festival is an integrated tourism celebration fusing the geological grandeur of Lake Maninjau's ancient volcanic caldera with the thrilling challenge of the legendary 44 hairpin mountain curves (Kelok 44) in Agam Regency. The festival showcases highland sport tourism, traditional lakeside arts, and ecological conservation.\n\nKey attractions include the grueling Kelok 44 uphill mountain race challenging runners through misty highland switchbacks, paragliding competitions launching from the panoramic ridge of Puncak Lawang to land beside the water, illuminated lake flotillas, and floating concert stages featuring traditional Saluang flutes and energetic Tambua Tasa drumming.\n\nVisitors are treated to breathtaking 360-degree vistas of the crater lake from Puncak Lawang, cultural tours to the historic birthplace of renowned scholar and novelist Buya Hamka in Sungai Batang, and authentic culinary tastings of crisp endemic Rinuak fish and savory Bada Masiak dishes.",
    locationName: "Kawasan Danau Maninjau & Kelok 44, Kabupaten Agam",
    locationNameEn: "Lake Maninjau & Kelok 44 Scenic Area, Agam Regency",
    imageUrl: "https://res.cloudinary.com/uupbxcw5/image/upload/v1787200985/Gemini_Generated_Image_by6yozby6yozby6y_rskatz.jpg",
    lat: -0.301389,
    lng: 100.178611
  }
];

async function updateAll() {
  console.log("🚀 Memulai pembaruan 20 narasi deskripsi event ke format 3 paragraf...");

  // 1. Verifikasi setiap event memiliki tepat 3 paragraf
  let all3Paragraphs = true;
  for (const ev of RICH_EVENTS) {
    const idParas = ev.description.split('\n\n').length;
    const enParas = ev.descriptionEn.split('\n\n').length;
    if (idParas !== 3 || enParas !== 3) {
      console.error(`❌ [${ev.id}] ${ev.title}: ID punya ${idParas} paragraf, EN punya ${enParas} paragraf!`);
      all3Paragraphs = false;
    } else {
      console.log(`   ✓ [${ev.id}] ${ev.title.substring(0, 35)}: 3 Paragraf ID & EN terverifikasi`);
    }
  }

  if (!all3Paragraphs) {
    console.error("Gagal verifikasi jumlah paragraf!");
    process.exit(1);
  }

  // 2. Update Firestore collection 'events'
  console.log("\n📡 Mengunggah ke Cloud Firestore 'events'...");
  for (const ev of RICH_EVENTS) {
    await setDoc(doc(db, 'events', ev.id), ev, { merge: true });
    console.log(`   ✓ Firestore updated: [${ev.id}] ${ev.title}`);
  }
  console.log("✅ Semua 20 event di Cloud Firestore berhasil diperbarui!");

  // 3. Update src/data/firestore_backup.json
  console.log("\n💾 Memperbarui src/data/firestore_backup.json...");
  const backupPath = path.join(__dirname, '..', 'src', 'data', 'firestore_backup.json');
  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  backupData.eventItems = RICH_EVENTS;
  backupData.timestamp = new Date().toISOString();
  fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf8');
  console.log("✅ firestore_backup.json berhasil diperbarui!");

  // 4. Update src/data/content.ts
  console.log("\n📝 Memperbarui src/data/content.ts (EVENTS_SCHEDULE array)...");
  const contentPath = path.join(__dirname, '..', 'src', 'data', 'content.ts');
  let contentTs = fs.readFileSync(contentPath, 'utf8');

  // Replace EVENTS_SCHEDULE array in content.ts
  const startMarker = 'export const EVENTS_SCHEDULE: EventItem[] = [';
  const startIndex = contentTs.indexOf(startMarker);
  if (startIndex === -1) {
    throw new Error("Tidak dapat menemukan start marker EVENTS_SCHEDULE di content.ts");
  }

  // Find the closing bracket of EVENTS_SCHEDULE
  // It is followed by either export const DOWNLOAD_ITEMS or end of events array
  const endSearchIndex = contentTs.indexOf('\nexport const DOWNLOAD_ITEMS', startIndex);
  let endIndex = -1;
  if (endSearchIndex !== -1) {
    endIndex = contentTs.lastIndexOf('];', endSearchIndex) + 2;
  } else {
    // Look for ];\n
    endIndex = contentTs.indexOf('];\n', startIndex) + 2;
  }

  if (endIndex === -1 || endIndex <= startIndex) {
    throw new Error("Tidak dapat menemukan end marker EVENTS_SCHEDULE di content.ts");
  }

  const newEventsBlock = `export const EVENTS_SCHEDULE: EventItem[] = ${JSON.stringify(RICH_EVENTS, null, 2)};`;
  contentTs = contentTs.substring(0, startIndex) + newEventsBlock + contentTs.substring(endIndex);
  fs.writeFileSync(contentPath, contentTs, 'utf8');
  console.log("✅ content.ts berhasil diperbarui!");

  console.log("\n🎉 SELURUH 20 EVENT SELESAI DIPERBARUI DENGAN 3 PARAGRAF LENGKAP!");
  process.exit(0);
}

updateAll().catch(err => {
  console.error("Gagal memperbarui:", err);
  process.exit(1);
});
