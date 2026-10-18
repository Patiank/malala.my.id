import { DownloadItem, HotInfoItem } from '../types';

export const RAW_BG_IMAGE_1 = "/images/bg-cover-1.webp";
export const RAW_BG_IMAGE_2 = "/images/bg-cover-2.webp";

// Fast & 100% Free Egress CDN via Official GitHub Releases (Zero Firebase bandwidth consumed, 100% bypasses Kominfo/ISP blocks)
export const GITHUB_RELEASES_BASE = "https://github.com/Patiank/malala.my.id/releases/download/v1.0.0";

export const OFFICIAL_PDF_URLS = {
  panduanId: `${GITHUB_RELEASES_BASE}/malala-panduan-wisata-sumbar-2026.pdf`,
  panduanEn: `${GITHUB_RELEASES_BASE}/malala-tourism-guide-sumbar-2026-en.pdf`,
  eventsId: `${GITHUB_RELEASES_BASE}/kalender-event-sumbar-2026.pdf`,
  eventsEn: `${GITHUB_RELEASES_BASE}/kalender-event-sumbar-2026-en.pdf`,
};

export function getDirectDriveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('data:') || url.startsWith('/')) return url;
  const matchFileD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchFileD[1]}`;
  }
  const matchIdParam = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchIdParam && matchIdParam[1]) {
    return `https://lh3.googleusercontent.com/d/${matchIdParam[1]}`;
  }
  return url;
}

export const BG_IMAGE_1 = "/images/bg-cover-1.webp";
export const BG_IMAGE_2 = "/images/bg-cover-2.webp";

export const HOT_INFO_ITEMS: HotInfoItem[] = [
  {
    "id": "hi-1",
    "title": "Komandan Lanud Sutan Sjahrir Hadiri Pembukaan Mentawai Surf And Soul di Bandara Internasional Minangkabau",
    "titleEn": "Danlanud Sutan Sjahrir Attends Mentawai Surf And Soul Launch at Minangkabau International Airport",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "15 Oktober 2026",
    "dateEn": "October 15, 2026",
    "sourceName": "TNI AU",
    "sourceDomain": "tni-au.mil.id",
    "sourceUrl": "https://tni-au.mil.id",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=tni-au.mil.id&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://tni-au.mil.id",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Bandara+Internasional+Minangkabau",
    "locationName": "Bandara Internasional Minangkabau (BIM), Padang Pariaman",
    "locationNameEn": "Minangkabau International Airport (BIM), Padang Pariaman",
    "description": "Pembukaan perhelatan pariwisata bahari bergengsi \"Mentawai Surf and Soul\" secara resmi digelar di area kedatangan Bandara Internasional Minangkabau (BIM), dihadiri oleh Komandan Lanud Sutan Sjahrir bersama jajaran Forkopimda Sumatera Barat. Acara ini dirancang sebagai etalase penyambutan wisatawan mancanegara dan peselancar kelas dunia yang hendak menjelajahi gugusan ombak Kepulauan Mentawai.\n\nMelalui pameran instalasi seni fotografi bahari, atraksi budaya khas suku asli Mentawai, serta pusat informasi wisata selancar terpadu, Bandara BIM bertransformasi menjadi gerbang promosi aktif. Kolaborasi antara otoritas bandara, Lanud Sutan Sjahrir, dan Dinas Pariwisata ini bertujuan meningkatkan kenyamanan transit wisatawan, mempercepat konektivitas penyeberangan antar-pulau, serta mengukuhkan posisi Mentawai sebagai salah satu destinasi selancar nomor satu di dunia.",
    "descriptionEn": "The official opening of the prestigious \"Mentawai Surf and Soul\" maritime tourism showcase took place at the arrival hall of Minangkabau International Airport (BIM), attended by Danlanud Sutan Sjahrir alongside West Sumatra regional leadership. The event serves as a dedicated welcoming showcase for international surfers and travelers heading to the world-renowned wave breaks of the Mentawai Islands.\n\nFeaturing indigenous Mentawai cultural performances, curated photography installations, and an integrated surf travel desk, the initiative enhances airport transit experiences while boosting seamless island-hopping connectivity and cementing Mentawai's position as a premier global surfing destination.",
    "highlights": [
      "Peluncuran etalase pariwisata selancar terpadu di pintu gerbang Bandara BIM",
      "Sinergi TNI AU, otoritas bandara, dan Dispar Sumbar sambut peselancar dunia",
      "Pameran budaya khas Mentawai dan fasilitas kemudahan konektivitas pulau"
    ],
    "highlightsEn": [
      "Integrated surf tourism showcase launched at BIM Airport gateway",
      "Air Force, airport authority, and tourism board synergy for global surfers",
      "Authentic Mentawai cultural exhibits and seamless island-hopping transit"
    ],
    "tips": "Gunakan layanan kapal cepat Mentawai Fast dari Pelabuhan Muaro Padang setelah tiba di Bandara BIM.",
    "tipsEn": "Connect directly to the Mentawai Fast ferry from Muaro Padang Harbor upon arrival at BIM Airport."
  },
  {
    "id": "hi-2",
    "title": "Joni Mardianto 'Nature & Soul of Ranah Minang' Wakili Sumbar di Ajang Wonderful Indonesia Scale-Up Hub 2026",
    "titleEn": "Joni Mardianto 'Nature & Soul of Ranah Minang' Represents West Sumatra at Wonderful Indonesia Scale-Up Hub 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "16 Oktober 2026",
    "dateEn": "October 16, 2026",
    "sourceName": "Arunala Media",
    "sourceDomain": "arunala.com",
    "sourceUrl": "https://arunala.com",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=arunala.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://arunala.com",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Sentra Kriya & Fesyen Minang, Sumatera Barat",
    "locationNameEn": "Minang Fashion & Crafts Center, West Sumatra",
    "description": "Produk kreatif kriya dan fesyen etnik 'Nature & Soul of Ranah Minang' karya desainer terkemuka Joni Mardianto secara resmi terpilih mewakili Provinsi Sumatera Barat dalam program akselerasi bisnis nasional Wonderful Indonesia Scale-Up Hub (WISH) 2026 yang diinisiasi Kementerian Pariwisata dan Ekonomi Kreatif.\n\nKarya ini memadukan kemegahan tenun Songket Silungkang dan Pandai Sikek dengan sentuhan siluet modern berstandar ramah lingkungan (sustainable eco-fashion), mengusung motif ukiran tradisional Rumah Gadang. Keikutsertaan ini membuka peluang kemitraan ritel global, pameran internasional, serta pendampingan akses permodalan venture, membuktikan bahwa warisan budaya Minangkabau memiliki daya saing tinggi di pasar industri kreatif internasional.",
    "descriptionEn": "The ethnic fashion and craft brand 'Nature & Soul of Ranah Minang', pioneered by renowned designer Joni Mardianto, has been selected to represent West Sumatra in the prestigious Wonderful Indonesia Scale-Up Hub (WISH) 2026 national acceleration program backed by the Ministry of Tourism and Creative Economy.\n\nBlending authentic Silungkang and Pandai Sikek songket handweaves with sustainable modern silhouettes and traditional Minangkabau architectural motifs, the label gains international retail distribution channels, investor networking, and global market exposure, highlighting the world-class appeal of Minang craftsmanship.",
    "highlights": [
      "Karya kriya & fesyen Minang lolos seleksi ketat inkubasi bisnis Kemenparekraf",
      "Kombinasi tenun Songket Pandai Sikek tradisional dengan konsep busana berkelanjutan",
      "Membuka akses pasar ekspor dan jaringan kurasi cinderamata resmi Wonderful Indonesia"
    ],
    "highlightsEn": [
      "Minang heritage fashion selected for high-profile national accelerator program",
      "Innovative fusion of traditional Pandai Sikek songket with sustainable design",
      "Unlocking global retail export channels and official Wonderful Indonesia curation"
    ],
    "tips": "Kunjungi sentra tenun di Pandai Sikek dan Silungkang untuk melihat proses tenun ATBM autentik.",
    "tipsEn": "Visit artisanal weaving villages in Pandai Sikek and Silungkang to experience traditional looms."
  },
  {
    "id": "hi-3",
    "title": "Wawako Pariaman: Penyelenggaraan Porprov Sumbar Dongkrak Kunjungan Wisata dan Ekonomi Kreatif Pesisir",
    "titleEn": "Vice Mayor of Pariaman: Provincial Sports Games Spark Strong Coastal Tourism Footfall and Local MSME Surge",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "12 Oktober 2026",
    "dateEn": "October 12, 2026",
    "sourceName": "Antara News Sumbar",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://sumbar.antaranews.com/berita/782557/wawako-porprov-sumbar-berdampak-pada-wisata-dan-ekonomi-pariaman",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://sumbar.antaranews.com/berita/782557/wawako-porprov-sumbar-berdampak-pada-wisata-dan-ekonomi-pariaman",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Pantai+Gandoriah+Pariaman",
    "locationName": "Kawasan Wisata Pantai Gandoriah & Pesisir Kota Pariaman",
    "locationNameEn": "Gandoriah Beach & Pariaman Coastline",
    "description": "Wakil Wali Kota Pariaman menegaskan bahwa rangkaian Pekan Olahraga Provinsi (Porprov) Sumatera Barat membawa dampak berganda (multiplier effect) yang signifikan terhadap lonjakan kunjungan wisatawan dan perputaran roda ekonomi masyarakat pesisir di Kota Pariaman.\n\nObjek wisata unggulan seperti Pantai Gandoriah, Pantai Kata, dan kawasan konservasi Penyu Pulau Angso Duo mengalami peningkatan okupansi pengunjung dan tamu hotel hingga mencapai 85%. Ratusan pedagang kuliner tradisional khas pesisir, penyedia jasa perahu wisata, serta sentra oleh-oleh Sala Lauak mencatat kenaikan omzet harian yang substansial berkat hadirnya kontingen atlet dan pendukung dari 19 kabupaten/kota se-Sumatera Barat.",
    "descriptionEn": "The Vice Mayor of Pariaman announced that hosting the West Sumatra Provincial Sports Games (Porprov) generated substantial economic multipliers, triggering high tourist footfall and commercial buoyancy across coastal Pariaman.\n\nFlagship attractions including Gandoriah Beach, Kata Beach, and the Angso Duo marine conservation zone saw hotel occupancy reach 85%. Hundreds of local culinary vendors, coastal transport boatmen, and authentic Sala Lauak souvenir artisans reported record daily revenues driven by visiting athlete contingents and spectators from all 19 regencies and cities.",
    "highlights": [
      "Porprov Sumbar buktikan efektivitas sport tourism dalam menggerakkan ekonomi nagari",
      "Tingkat okupansi perhotelan dan penginapan pesisir Pariaman tembus 85 persen",
      "Sentra kuliner Sala Lauak dan perahu wisata pulau nikmati lonjakan pesanan"
    ],
    "highlightsEn": [
      "Provincial sports championship proves sports tourism efficacy for coastal economies",
      "Pariaman beachfront hotel and homestay occupancy rates surged to 85 percent",
      "Authentic Sala Lauak culinary hubs and island tour boatmen experience revenue surges"
    ],
    "tips": "Nikmati matahari terbenam di Pantai Gandoriah sambil mencicipi Sala Lauak panas yang renyah.",
    "tipsEn": "Catch golden sunsets at Gandoriah Beach while savoring freshly fried Sala Lauak seafood bites."
  },
  {
    "id": "hi-4",
    "title": "Digitalisasi Jamu Tradisional dan Tanaman Herbal Pacu Potensi Wisata Kebugaran (Wellness Tourism) Sumbar",
    "titleEn": "Modernizing Traditional Herbal Botanicals Catalyzes West Sumatra Wellness Tourism Ecosystem",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "9 Oktober 2026",
    "dateEn": "October 9, 2026",
    "sourceName": "Harian Haluan",
    "sourceDomain": "harianhaluan.com",
    "sourceUrl": "https://harianhaluan.com",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=harianhaluan.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://harianhaluan.com",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Kawasan Agrowisata Herbal Ranah Minang, Sumatera Barat",
    "locationNameEn": "Minang Herbal Agro-Tourism Zones, West Sumatra",
    "description": "Tokoh Sumatera Barat Fadly Amran mendorong transformasi digital bagi para peracik obat herbal tradisional dan jamu khas Minang agar dapat terintegrasi ke dalam ekosistem pariwisata kebugaran (wellness tourism) yang kini semakin diminati wisatawan nusantara maupun mancanegara.\n\nSumatera Barat memiliki kekayaan hayati luar biasa, mulai dari seduhan Kawa Daun, jahe merah pegunungan, hingga minyak kelapa murni dan rempah Alahan Panjang. Melalui pencatatan katalog digital, sertifikasi higienitas BPOM, serta integrasi pemesanan daring pada platform pariwisata pintar, pelaku usaha herbal diharapkan dapat menyediakan paket spa tradisional, wisata kebun herbal edukatif, dan produk cinderamata kesehatan bernilai ekonomi tinggi.",
    "descriptionEn": "West Sumatra civic leader Fadly Amran advocates for the comprehensive digital cataloging and modernization of Minang herbal medicine and traditional tonics to spearhead regional wellness tourism.\n\nEndowed with rich botanical diversity ranging from Kawa Daun roasted coffee leaves to high-altitude red ginger and cold-pressed coconut oils, local producers are being guided through digital marketing, hygiene certifications, and smart tourism integrations to offer immersive wellness experiences, herbal plantation retreats, and premium health souvenirs.",
    "highlights": [
      "Inisiasi integrasi jamu rempah Minang ke peta pariwisata kebugaran global",
      "Pemanfaatan komoditas Kawa Daun dan rempah Alahan Panjang sebagai terapi herbal",
      "Pengembangan paket wisata agro-edukasi dan spa tradisional berbasis nagari"
    ],
    "highlightsEn": [
      "Integrating indigenous herbal remedies into the global wellness travel blueprint",
      "Showcasing Kawa Daun leaves and Alahan Panjang highland spices for holistic therapy",
      "Developing community agro-education trails and authentic nagari spa packages"
    ],
    "tips": "Cicipi Kawa Daun hangat yang disajikan tradisional dalam tempurung kelapa di lereng Singgalang.",
    "tipsEn": "Try warm Kawa Daun brew traditionally served inside coconut shells on Mount Singgalang foothills."
  },
  {
    "id": "hi-5",
    "title": "Pemkab Pesisir Selatan Genjot Fasilitas Dermaga dan Standar Keselamatan Bahari di Kawasan Mandeh",
    "titleEn": "Pesisir Selatan Regency Upgrades Harbor Amenities and Marine Safety Standards Across Mandeh Tourism Area",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "8 Oktober 2026",
    "dateEn": "October 8, 2026",
    "sourceName": "Pemkab Pesisir Selatan",
    "sourceDomain": "pesisirselatankab.go.id",
    "sourceUrl": "https://pesisirselatankab.go.id",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=pesisirselatankab.go.id&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://pesisirselatankab.go.id",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Kawasan+Wisata+Mandeh",
    "locationName": "Kawasan Wisata Bahari Terpadu (KWBT) Mandeh, Pesisir Selatan",
    "locationNameEn": "Mandeh Integrated Marine Tourism Area (KWBT Mandeh)",
    "description": "Pemerintah Kabupaten Pesisir Selatan mempercepat perbaikan fasilitas infrastruktur dermaga wisata, penyediaan pelampung keselamatan standar internasional, serta digitalisasi tiket perahu motor di Kawasan Wisata Bahari Terpadu (KWBT) Mandeh guna menyambut musim liburan mendatang.\n\nLangkah ini diambil guna menjamin kenyamanan dan keselamatan wisatawan yang hendak melakukan aktivitas snorkeling, cliff jumping di Pulau Sironjong, hingga jelajah hutan mangrove di Sungai Nyalo. Pemkab juga berkoordinasi erat dengan kelompok sadar wisata (Pokdarwis) setempat untuk memberlakukan standardisasi tarif sewa perahu demi menjaga transparansi harga dan kepuasan pengunjung.",
    "descriptionEn": "The Pesisir Selatan Regency Administration is expediting major safety upgrades, dock rehabilitation, and digital boat ticketing across the Mandeh Integrated Marine Tourism Area (KWBT Mandeh) ahead of peak holiday seasons.\n\nThese infrastructure enhancements ensure strict safety compliance for island-hopping, coral reef snorkeling, and cliff diving around Sironjong Island and Nyalo River mangroves. The local government has also partnered with community tourism boards to enforce transparent boat charter pricing and elevate visitor satisfaction.",
    "highlights": [
      "Peremajaan dermaga apung dan dermaga keberangkatan perahu wisata Mandeh",
      "Wajib rompi pelampung berstandar maritim dan sertifikasi nakhoda perahu lokal",
      "Penerapan tarif transparan demi kenyamanan wisatawan nusantara dan asing"
    ],
    "highlightsEn": [
      "Modernization of floating docks and departure terminals throughout Mandeh bay",
      "Mandatory maritime-grade lifejackets and certifications for licensed boatmen",
      "Enforcement of standardized transparent charter pricing for tourist peace of mind"
    ],
    "tips": "Pagi hari adalah waktu terbaik untuk jelajah Mandeh saat air laut tenang dan jarak pandang jernih.",
    "tipsEn": "Early morning is the prime window to tour Mandeh when bay waters are glass-calm and clear."
  },
  {
    "id": "hi-6",
    "title": "Kemenpar: Perhelatan MotoGP Perkuat Ekosistem Sport Tourism Nasional dan Citra Pariwisata Indonesia",
    "titleEn": "Ministry of Tourism: MotoGP Elevates National Sports Tourism Ecosystem and Indonesia Global Destination Brand",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "14 Oktober 2026",
    "dateEn": "October 14, 2026",
    "sourceName": "Antara News",
    "sourceDomain": "antaranews.com",
    "sourceUrl": "https://www.antaranews.com",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://www.antaranews.com",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sirkuit+Mandalika+Lombok",
    "locationName": "Kawasan Ekonomi Khusus Mandalika, Lombok",
    "locationNameEn": "Mandalika Special Economic Zone, Lombok",
    "description": "Kementerian Pariwisata Republik Indonesia menegaskan bahwa konsistensi penyelenggaraan ajang balap dunia MotoGP di Sirkuit Internasional Pertamina Mandalika sukses mengukuhkan reputasi Indonesia sebagai pusat sport tourism unggulan di kawasan Asia Tenggara.\n\nSelain mendongkrak tingkat hunian hotel dan villa di Nusa Tenggara Barat hingga 100%, ajang ini menciptakan rantai pasok ekonomi bagi ribuan pelaku UMKM kuliner, transportasi lokal, dan suvenir kerajinan tangan. Kesuksesan model event-led tourism ini menjadi rujukan berharga bagi pengembangan kalender event olahraga skala besar di destinasi unggulan lain, termasuk Tour de Singkarak di Sumatera Barat.",
    "descriptionEn": "The Ministry of Tourism highlighted that recurring world-championship events like MotoGP at the Pertamina Mandalika International Circuit continue reinforcing Indonesia's status as Southeast Asia's premier sports tourism powerhouse.\n\nBeyond generating 100% hotel occupancy across West Nusa Tenggara, the spectacle created extensive supply-chain opportunities for culinary MSMEs, transportation operators, and artisan craft makers. The proven event-led tourism model provides a strategic blueprint for other national sports events, including West Sumatra's Tour de Singkarak.",
    "highlights": [
      "Sirkuit Mandalika cetak rekor okupansi akomodasi dan serapan ribuan tenaga kerja lokal",
      "Model sinergi BUMN, pemda, dan asosiasi wisata jadikan rujukan sport tourism nasional",
      "Inspirasi pengembangan event balap sepeda internasional Tour de Singkarak di Sumbar"
    ],
    "highlightsEn": [
      "Mandalika Circuit drives record regional hotel occupancy and massive local employment",
      "Public-private collaboration serves as national benchmark for event-led tourism",
      "Inspires upcoming editions of West Sumatra's Tour de Singkarak road cycling race"
    ],
    "tips": "Pesan tiket dan akomodasi jauh hari sebelumnya bila berencana menghadiri event sport tourism.",
    "tipsEn": "Book accommodations and travel tickets well in advance when attending major sporting events."
  },
  {
    "id": "hi-7",
    "title": "Kemenparekraf Pacu Digitalisasi Destinasi dan Layanan Wisata Cerdas di Seluruh Destinasi Prioritas",
    "titleEn": "Ministry of Tourism Accelerates Smart Tourism and Digital Ecosystems Across Priority Destinations",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "9 Oktober 2026",
    "dateEn": "October 9, 2026",
    "sourceName": "Kemenparekraf",
    "sourceDomain": "kemenparekraf.go.id",
    "sourceUrl": "https://kemenparekraf.go.id",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kemenparekraf.go.id&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://kemenparekraf.go.id",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Indonesia",
    "locationName": "Kawasan Wisata Nusantara Indonesia",
    "locationNameEn": "Indonesian Archipelago Tourism Destinations",
    "description": "Kementerian Pariwisata dan Ekonomi Kreatif meluncurkan program pendampingan komprehensif bagi pengelola desa wisata dan destinasi prioritas untuk mengadopsi sistem tiket elektronik (e-ticketing), pembayaran nontunai QRIS, serta sistem navigasi interaktif berbasis kecerdasan buatan (AI).\n\nPenerapan teknologi digital terbukti memangkas antrean tiket, mencegah kebocoran retribusi daerah, dan mempermudah turis asing mengakses informasi rute dan paket wisata secara transparan. Platform digital pariwisata daerah kini didorong untuk saling terhubung dengan agregator nasional agar promosi ke pasar global semakin terarah.",
    "descriptionEn": "The Ministry of Tourism and Creative Economy is accelerating digital transformations across Indonesian tourist villages and priority destinations through contactless QRIS payments, automated e-ticketing, and AI-powered navigation services.\n\nDigital adoption significantly reduces ticketing queues, ensures municipal revenue integrity, and empowers international travelers with transparent route planning. Regional digital portals are being integrated with national travel hubs to amplify worldwide exposure.",
    "highlights": [
      "Perluasan kanal pembayaran digital QRIS antar-negara untuk turis mancanegara",
      "Penerapan asisten kecerdasan buatan (AI) untuk kurasi rute wisata personal",
      "Integrasi satu data pariwisata nasional untuk monitoring arus wisatawan secara real-time"
    ],
    "highlightsEn": [
      "Cross-border QRIS contactless payment expansion for international tourists",
      "Deployment of AI-guided travel assistants for personalized itinerary curation",
      "Single national tourism data dashboard monitoring real-time visitor movements"
    ],
    "tips": "Gunakan fitur AI Travel Planner di portal Malala untuk menyusun rute liburan otomatis.",
    "tipsEn": "Use the AI Travel Planner tool on the Malala portal to craft your custom vacation route."
  },
  {
    "id": "hi-8",
    "title": "Ragam Motif Wastra Nusantara Jadi Daya Tarik Wisata Edukasi dan Diplomasi Budaya Indonesia",
    "titleEn": "Heritage Textiles Emerge as Cultural Tourism Magnets and International Diplomacy Showcase",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "date": "10 Oktober 2026",
    "dateEn": "October 10, 2026",
    "sourceName": "Kompas Travel",
    "sourceDomain": "travel.kompas.com",
    "sourceUrl": "https://travel.kompas.com",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=kompas.com&sz=64",
    "imageUrl": "",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://travel.kompas.com",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Nagari+Pandai+Sikek",
    "locationName": "Nagari Pandai Sikek & Sentra Tenun Nusantara",
    "locationNameEn": "Pandai Sikek Village & Indonesian Textile Heritage Centers",
    "description": "Momentum perayaan Hari Batik dan Wastra Nasional 2026 menyoroti keragaman motif kain tradisional Indonesia—dari Batik pesisir Jawa hingga Songket Minangkabau—sebagai magnet wisata edukasi budaya yang sangat diminati pelancong domestik maupun dunia.\n\nDesa-desa pengrajin tenun seperti Nagari Pandai Sikek di Tanah Datar dan sentra songket Silungkang di Sawahlunto kini semakin ramai dikunjungi wisatawan yang ingin belajar langsung proses menenun tradisional menggunakan alat tenun bukan mesin (ATBM). Wisata pengalaman (experiential travel) ini terbukti memberikan dampak ekonomi langsung bagi kaum perempuan perajin di pelosok nagari.",
    "descriptionEn": "The national heritage textile celebrations spotlight Indonesia's breathtaking fabric diversity—from coastal Javanese batik to intricate Minangkabau songket—as magnetic drivers for cultural education tourism and international creative diplomacy.\n\nArtisanal weaving villages such as Nagari Pandai Sikek in Tanah Datar and Silungkang in Sawahlunto report growing demand for immersive workshops where visitors learn traditional non-machine loom weaving (ATBM) firsthand, delivering direct economic empowerment to rural female artisans.",
    "highlights": [
      "Peningkatan minat wisatawan pada wisata berbasis pengalaman (experiential tourism)",
      "Songket Pandai Sikek dan Silungkang jadi primadona cinderamata bernilai tinggi",
      "Pemberdayaan ekonomi langsung bagi perajin tenun perempuan di nagari-nagari Minang"
    ],
    "highlightsEn": [
      "Surging global traveler appetite for hands-on experiential cultural tourism",
      "Pandai Sikek and Silungkang songket sought after as high-value artisanal souvenirs",
      "Direct socio-economic empowerment for female weaving artisans across Minang nagaris"
    ],
    "tips": "Beli langsung kain tenun dari perajin di nagari untuk mendapatkan kualitas tenun tangan terbaik.",
    "tipsEn": "Acquire handwoven textiles directly from artisan workshops for highest authentic quality."
  },
  {
    "id": "hi-9",
    "title": "Festival Rang Solok Baralek Gadang Masuk Kalender KEN Nasional, Angkat Tradisi Pertanian Tradisional",
    "titleEn": "Rang Solok Baralek Gadang Cultural Festival Reaffirmed in National Kharisma Event Nusantara Calendar",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "12 Oktober 2026",
    "dateEn": "October 12, 2026",
    "sourceName": "Dispar Kota Solok",
    "sourceDomain": "sumbar.antaranews.com",
    "sourceUrl": "https://sumbar.antaranews.com",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=antaranews.com&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://sumbar.antaranews.com",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Hamparan+Sawah+Solok",
    "locationName": "Kawasan Agrowisata Hamparan Sawah Solok, Kota Solok",
    "locationNameEn": "Solok Rice Fields Agro-Tourism Area, Solok City",
    "description": "Festival budaya tahunan Rang Solok Baralek Gadang (RSBG) yang berpusat di hamparan Sawah Solok resmi dipertahankan masuk ke dalam jajaran agenda bergengsi Kharisma Event Nusantara (KEN) oleh Kementerian Pariwisata.\n\nEvent ini menyajikan rangkaian tradisi unik Minangkabau seperti prosesi Batulak Bala, permainan lumpur Pacu Upiah, pertunjukan seni Saluang, serta festival kuliner beras organik Solok. Penyelenggaraan event berbasis kearifan lokal ini berhasil membuktikan bahwa pelestarian adat dan sawah pusaka dapat bertransformasi menjadi atraksi wisata internasional yang menghasilkan perputaran ekonomi miliaran rupiah bagi masyarakat tani setempat.",
    "descriptionEn": "The acclaimed annual cultural celebration Rang Solok Baralek Gadang (RSBG) staged across the scenic Solok Rice Fields has been reaffirmed as a prestigious Kharisma Event Nusantara (KEN) national fixture by the Ministry of Tourism.\n\nFeaturing rare indigenous agrarian traditions such as Batulak Bala blessing rites, Pacu Upiah mud races, traditional Saluang flute recitals, and authentic organic Solok rice banquets, the festival demonstrates how preserving ancestral agricultural heritage creates premier international tourism attractions generating significant local farmer revenues.",
    "highlights": [
      "RSBG sukses pertahankan status Karisma Event Nusantara (KEN) dari Kemenparekraf",
      "Atraksi Pacu Upiah di lumpur sawah dan arak-arakan Batulak Bala pikat ribuan turis",
      "Promosi beras Bareh Solok organik sebagai komoditas kuliner unggulan berdaya saing"
    ],
    "highlightsEn": [
      "RSBG retains prestigious Kharisma Event Nusantara (KEN) national accreditation",
      "Mud racing Pacu Upiah and Batulak Bala cultural parades draw thousands of travelers",
      "Promoting Bareh Solok organic heritage rice as an internationally acclaimed delicacy"
    ],
    "tips": "Bawa pakaian ganti jika Anda ingin berpartisipasi dalam permainan tradisional Pacu Upiah di sawah.",
    "tipsEn": "Bring a change of clothes if you wish to participate in the traditional Pacu Upiah mud games."
  },
  {
    "id": "hi-10",
    "title": "Sumatera Barat Perkokoh Posisi Terdepan Destinasi Wisata Ramah Muslim (Halal Tourism) Dunia",
    "titleEn": "West Sumatra Reaffirms Benchmark Global Leadership in Muslim-Friendly Halal Tourism",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "date": "14 Oktober 2026",
    "dateEn": "October 14, 2026",
    "sourceName": "Dinas Pariwisata Sumbar",
    "sourceDomain": "sumbarprov.go.id",
    "sourceUrl": "https://sumbarprov.go.id",
    "sourceIcon": "https://www.google.com/s2/favicons?domain=sumbarprov.go.id&sz=64",
    "imageUrl": "",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://sumbarprov.go.id",
    "mapsUrl": "https://www.google.com/maps/search/?api=1&query=Sumatera+Barat",
    "locationName": "Sentra Wisata Ramah Muslim Sumatera Barat",
    "locationNameEn": "West Sumatra Muslim-Friendly Tourism Hubs",
    "description": "Sumatera Barat kembali meraih apresiasi tinggi sebagai destinasi terdepan dalam indeks wisata ramah muslim (halal tourism) global berkat keselarasan filosofi adat Adat Basandi Syarak, Syarak Basandi Kitabullah (ABS-SBK) dengan standar layanan pariwisata internasional.\n\nKetersediaan fasilitas ibadah yang representatif di seluruh destinasi alam, sertifikasi halal menyeluruh pada sentra kuliner Rendang Payakumbuh dan Rumah Makan Padang, serta kehangatan keramahan masyarakat lokal (hospitality) menjadikan Ranah Minang pilihan utama bagi wisatawan dari Timur Tengah, Malaysia, dan komunitas muslim global yang mencari liburan autentik dan nyaman.",
    "descriptionEn": "West Sumatra has reaffirmed its global benchmark leadership in Muslim-friendly tourism, deeply anchored in its ancestral ethos 'Adat Basandi Syarak, Syarak Basandi Kitabullah' paired with world-class hospitality standards.\n\nWith pristine prayer amenities across all natural geoparks, comprehensive halal certifications across Payakumbuh rendang kitchens and historic Padang dining institutions, and genuine local warmth, Ranah Minang remains the preferred haven for travelers from Southeast Asia, the Middle East, and international Muslim communities.",
    "highlights": [
      "Peringkat teratas Global Muslim Travel Index berkat fasilitas ibadah di setiap destinasi",
      "Sertifikasi halal komprehensif pada ribuan rumah makan dan sentra kuliner Rendang",
      "Kombinasi keindahan alam Geopark Ranah Minang dengan kenyamanan wisata keluarga"
    ],
    "highlightsEn": [
      "Top-tier Global Muslim Travel Index ranking powered by widespread prayer amenities",
      "Comprehensive halal certifications for thousands of dining establishments and rendang centers",
      "Harmonious blend of UNESCO Geoparks, family-friendly recreation, and rich culture"
    ],
    "tips": "Masjid Raya Sumatera Barat di Padang adalah ikon arsitektur Rumah Gadang modern yang wajib dikunjungi.",
    "tipsEn": "Grand Mosque of West Sumatra in Padang is a must-see modern Rumah Gadang architectural marvel."
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [];

