import { Destination, CultureItem, CulinaryItem, EventItem, DownloadItem, HotInfoItem } from '../types';

export const RAW_BG_IMAGE_1 = "https://drive.google.com/file/d/15YQ1KiIdWOO216udJAHNZP4dmR5CNKf-/view?usp=drive_link";
export const RAW_BG_IMAGE_2 = "https://drive.google.com/file/d/1sKE9Y3NKIh6wwIQMsy5zYEQtROna5H1f/view?usp=drive_link";

export function getDirectDriveUrl(url: string): string {
  if (!url) return '';
  if (url.startsWith('data:')) return url;
  // Match /file/d/ID or id=ID
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

export const BG_IMAGE_1 = getDirectDriveUrl(RAW_BG_IMAGE_1);
export const BG_IMAGE_2 = getDirectDriveUrl(RAW_BG_IMAGE_2);

export const HOT_INFO_ITEMS: HotInfoItem[] = [
  {
    id: 'hi1',
    title: 'Peringatan Cuaca & Update Jalur Kelok 9',
    titleEn: 'Weather Update & Kelok 9 Scenic Flyover Status',
    category: 'Cuaca & Jalur',
    categoryEn: 'Weather & Routes',
    date: '10 Agustus 2026',
    dateEn: 'August 10, 2026',
    imageUrl: '',
    description: "Jalur utama penghubung Bukittinggi - Payakumbuh via Jembatan Kelok 9 saat ini terpantau sangat kondusif, lancar, dan aman untuk perjalanan wisata keluarga maupun rombongan. Karya arsitektur jembatan layang megah yang membelah tebing-tebing bukit barisan ini tidak hanya menawarkan fungsi vital transportasi, tetapi juga menyajikan panorama alam yang luar biasa memukau bagi setiap pelintas.\n\nBMKG Minangkabau mengonfirmasi bahwa cuaca di kawasan ini diprediksi dominan cerah berawan dengan angin sepoi-sepoi khas pegunungan, sangat ideal bagi wisatawan yang ingin mengambil foto berlatarkan kemegahan Kelok 9. Fasilitas rest area yang dikelola warga lokal beroperasi penuh, menyambut pelancong dengan aroma khas jagung bakar manis dan seduhan kopi hangat yang nikmat.\n\nUntuk menjamin kenyamanan maksimal, petugas gabungan dari Dinas Perhubungan, Satlantas, dan aparat keamanan setempat bersiaga penuh 24 jam. Wisatawan dapat berkendara dengan tenang sambil menikmati udara segar dan keagungan alam Sumatera Barat tanpa perlu khawatir akan kendala perjalanan.",
    descriptionEn: "The iconic Kelok 9 flyover, a vital and breathtaking route connecting Bukittinggi and Payakumbuh, is currently reported to be highly conducive, safe, and flowing smoothly for all travelers. This majestic architectural marvel, seamlessly integrated into the steep cliffs of the Barisan Mountains, not only serves as a crucial transport link but also offers an extraordinary panoramic view that captivates every visitor.\n\nAccording to the local meteorology agency, the weather in the area is expected to be mostly clear and pleasant, accompanied by a gentle mountain breeze. This provides perfect conditions for photography enthusiasts wanting to capture the grand scale of the flyover against the lush valley backdrop. Local rest areas are fully operational, welcoming tourists with the inviting aroma of sweet roasted corn and freshly brewed mountain coffee.\n\nTo ensure maximum comfort and safety, a joint task force of transportation officers, traffic police, and local security personnel are on standby 24/7. Tourists can drive with complete peace of mind, savoring the fresh air and the majestic natural beauty of West Sumatra without any travel concerns.",
    tag: 'Penting',
    tagEn: 'Important',
    actionUrl: 'https://maps.google.com/?q=Kelok+9+Sumatera+Barat',
    highlights: [
      'Kondisi jalan mulus dan pemandangan lembah memukau',
      'Rest area kuliner khas Minang beroperasi penuh',
      'Posko pelayanan informasi dan keamanan wisatawan aktif 24 jam'
    ],
    highlightsEn: [
      'Smooth road conditions with breathtaking mountain views',
      'Culinary rest areas operating at full capacity',
      '24/7 tourist information and assistance posts active'
    ],
    tips: 'Disarankan melintas pada pagi hingga siang hari untuk menikmati pemandangan arsitektur mega-jembatan Kelok 9 secara maksimal.',
    tipsEn: 'Best visited in the morning or early afternoon for unobstructed photography and panoramic views.',
    locationName: 'Jembatan Kelok 9, Kab. Limapuluh Kota',
    locationNameEn: 'Kelok 9 Flyover, Limapuluh Kota Regency'
  },
  {
    id: 'hi2',
    title: 'Festival Kuliner Rendang & Pesta Budaya Minang 2026',
    titleEn: 'Grand Minang Rendang Festival & Cultural Celebration 2026',
    category: 'Event Mendatang',
    categoryEn: 'Upcoming Event',
    date: '09 Agustus 2026',
    dateEn: 'August 09, 2026',
    imageUrl: '',
    description: "Bukittinggi dengan bangga kembali menggelar perhelatan akbar Festival Kuliner Rendang Internasional di pelataran ikonik Jam Gadang. Acara spektakuler ini dirancang khusus untuk memanjakan lidah wisatawan sekaligus melestarikan warisan budaya tak benda UNESCO. Ribuan pengunjung akan disuguhkan dengan lebih dari 100 varian otentik rendang dari 19 Kabupaten/Kota di Sumatera Barat, mulai dari Rendang Daging klasik, Rendang Belut, Rendang Pakis, hingga Rendang Lokan yang langka.\n\nDalam festival ini, pengunjung tidak hanya sekadar mencicipi, tetapi juga berkesempatan langsung menyaksikan atraksi marandang. Bundo Kanduang (tokoh perempuan adat) akan mendemonstrasikan proses panjang memasak rendang secara tradisional menggunakan tungku kayu bakar dan kuali besi besar, menguarkan aroma rempah khas Minangkabau yang menggugah selera ke seluruh penjuru kota.\n\nTidak berhenti pada kuliner, festival ini juga dimeriahkan dengan pesta budaya yang memukau. Sepanjang hari, wisatawan akan dihibur oleh alunan merdu musik Saluang, gemulai Tari Piring yang dinamis, serta atraksi Tari Galombang yang mempresentasikan semangat penyambutan tamu kehormatan. Ini adalah momen emas bagi wisatawan untuk menyelami kekayaan budaya dan kuliner Sumatera Barat dalam satu panggung megah.",
    descriptionEn: "Bukittinggi proudly hosts the grand International Rendang Culinary Festival at the iconic Jam Gadang plaza. This spectacular event is specially designed to indulge travelers' palates while preserving a UNESCO intangible cultural heritage. Thousands of visitors will be treated to over 100 authentic rendang variations from all 19 regencies and cities of West Sumatra, ranging from the classic beef rendang to unique varieties like eel, fern, and clam rendang.\n\nAt this festival, visitors do more than just taste; they get to witness the captivating marandang attraction firsthand. Bundo Kanduang (traditional female elders) will demonstrate the meticulous, slow-cooking process of traditional rendang using wood-fired stoves and large iron woks, filling the city air with the mouthwatering aroma of Minangkabau spices.\n\nBeyond culinary delights, the festival is enriched with mesmerizing cultural celebrations. Throughout the day, tourists will be entertained by the melodious tunes of Saluang traditional flutes, the dynamic Plate Dance, and the welcoming Galombang Dance. It is a golden opportunity for travelers to immerse themselves in the rich tapestry of West Sumatra's culture and gastronomy on one magnificent stage.",
    tag: 'Festival',
    tagEn: 'Festival',
    actionUrl: 'https://maps.google.com/?q=Jam+Gadang+Bukittinggi',
    highlights: [
      'Pameran 100+ varian rendang asli Minangkabau',
      'Demonstrasi memasak marandang kayu bakar oleh bundo kanduang',
      'Atraksi Seni Tari Piring & Pertunjukan Musik Tradisional gratis'
    ],
    highlightsEn: [
      'Exhibition of 100+ authentic Minangkabau rendang recipes',
      'Live traditional wood-fired rendang cooking demonstrations',
      'Free traditional Plate Dance and Saluang music performances'
    ],
    tips: 'Datanglah sebelum pukul 10 pagi untuk menghindari antrean panjang saat mencicipi taster gratis.',
    tipsEn: 'Arrive before 10 AM to avoid long lines for the free tasting sessions.',
    locationName: 'Pelataran Jam Gadang, Bukittinggi',
    locationNameEn: 'Jam Gadang Plaza, Bukittinggi'
  },
  {
    id: 'hi3',
    title: 'Restorasi Istano Basa Pagaruyung Selesai',
    titleEn: 'Istano Basa Pagaruyung Restoration Completed',
    category: 'Destinasi Baru',
    categoryEn: 'New Destination',
    date: '08 Agustus 2026',
    dateEn: 'August 08, 2026',
    imageUrl: '',
    description: "Pemerintah Provinsi Sumatera Barat secara resmi telah menyelesaikan program restorasi dan pemolesan menyeluruh di kawasan Istano Basa Pagaruyung. Istana kebanggaan masyarakat Minangkabau ini kini tampil semakin megah, bersih, dan memancarkan pesona kejayaan kerajaan masa lalu. Wisatawan akan disambut dengan taman-taman yang tertata asri, fasilitas umum yang jauh lebih nyaman, serta ukiran-ukiran dinding (ukia) yang warnanya kembali dihidupkan.\n\nDalam upaya memberikan pengalaman wisata yang tak terlupakan, pengelola kini menyediakan lebih banyak koleksi pakaian adat Minangkabau yang mewah untuk disewa. Pengunjung dapat berdandan bak raja dan ratu, lengkap dengan suntiang emas bagi perempuan dan saluak bagi laki-laki, lalu berfoto di berbagai sudut istana yang sangat instagenic, dari singgasana utama hingga lumbung padi (rangkiang) di halaman depan.\n\nPemandu wisata lokal yang ramah dan berpengetahuan luas siap mendampingi setiap pengunjung, membagikan kisah-kisah heroik, sejarah sistem matrilineal, dan filosofi mendalam di balik arsitektur Rumah Gadang. Kunjungan ke Istano Basa Pagaruyung kini bukan sekadar wisata sejarah, melainkan sebuah perjalanan imersif ke jantung kebudayaan Minangkabau.",
    descriptionEn: "The West Sumatra Provincial Government has officially completed a comprehensive restoration and beautification program at the Istano Basa Pagaruyung. This palace, the pride of the Minangkabau people, now appears more majestic and pristine, radiating the charm of its past royal glory. Tourists will be welcomed by beautifully manicured gardens, significantly upgraded public facilities, and vibrant, meticulously restored traditional wall carvings.\n\nTo provide an unforgettable tourism experience, the management now offers an expanded collection of luxurious Minangkabau traditional attire for rent. Visitors can dress up like kings and queens, complete with golden headdresses (suntiang) for women and traditional headgear (saluak) for men. They can capture stunning photos in highly instagenic corners of the palace, from the main throne room to the iconic rice barns (rangkiang) in the front courtyard.\n\nFriendly and knowledgeable local guides are ready to accompany visitors, sharing heroic tales, insights into the matrilineal system, and the profound philosophy behind the Rumah Gadang architecture. A visit to Istano Basa Pagaruyung is now not just a historical tour, but an immersive journey into the very heart of Minangkabau culture.",
    tag: 'Budaya',
    tagEn: 'Culture',
    actionUrl: 'https://maps.google.com/?q=Istana+Pagaruyung+Batusangkar',
    highlights: [
      'Taman dan interior istana tampil lebih memukau',
      'Penyewaan pakaian adat Minang lebih lengkap',
      'Tur panduan sejarah kerajaan gratis'
    ],
    highlightsEn: [
      'Stunningly restored palace interiors and gardens',
      'Expanded collection of traditional attire rentals',
      'Free guided historical tours of the royal legacy'
    ],
    tips: 'Sewalah pakaian adat berwarna merah atau hitam emas untuk hasil foto paling dramatis.',
    tipsEn: 'Rent traditional attire in red or black-and-gold for the most striking and dramatic photos.',
    locationName: 'Batusangkar, Tanah Datar',
    locationNameEn: 'Batusangkar, Tanah Datar'
  },
  {
    id: 'hi4',
    title: 'Spot Paralayang Terbaik Asia di Puncak Lawang',
    titleEn: 'Asia Best Paragliding Spot at Puncak Lawang',
    category: 'Petualangan',
    categoryEn: 'Adventure',
    date: '06 Agustus 2026',
    dateEn: 'August 06, 2026',
    imageUrl: '',
    description: "Bagi para pencinta alam dan fotografi, Puncak Lawang saat ini berada dalam kondisi cuaca yang sangat sempurna. Terletak di ketinggian 1.210 meter di atas permukaan laut, destinasi ini menawarkan titik pandang (viewpoint) paling spektakuler untuk memandangi keindahan Danau Maninjau secara utuh. Udara pegunungan yang sejuk dan bersih tanpa kabut tebal membuat gradasi warna biru danau terlihat sangat jelas, memantulkan cahaya matahari bagaikan cermin raksasa.\n\nSelain menikmati panorama, wisatawan dapat menguji nyali dan merasakan sensasi kebebasan dengan mencoba fasilitas paralayang terbaik di Asia Tenggara. Terbang melayang perlahan di atas keindahan danau tektonik ini memberikan pengalaman magis yang tidak akan ditemukan di tempat lain. Para instruktur paralayang berlisensi siap mendampingi wisatawan pemula untuk terbang tandem dengan sangat aman.\n\nSetelah puas bermain dan berfoto, wisatawan dapat bersantai di deretan kafe berkonsep alam di sekitar kawasan. Menikmati secangkir kopi hangat lokal atau teh talua (teh telur khas Minang) sambil memandangi hamparan pinus dan birunya danau dari ketinggian adalah cara terbaik menutup sore hari di Puncak Lawang. Kawasan ini benar-benar surga bagi mereka yang mencari ketenangan dan keindahan alam.",
    descriptionEn: "For nature lovers and photography enthusiasts, Puncak Lawang is currently experiencing picture-perfect weather conditions. Situated at an altitude of 1,210 meters above sea level, this destination offers the most spectacular viewpoint to admire the unhindered beauty of Lake Maninjau. The cool, crisp mountain air, free from thick fog, ensures the lake's striking blue gradients are vividly clear, reflecting sunlight like a giant mirror.\n\nBeyond the panoramic views, tourists can test their adrenaline and feel the sensation of absolute freedom by trying one of the best paragliding facilities in Southeast Asia. Gliding slowly over the stunning tectonic lake provides a magical experience unmatched anywhere else. Licensed and highly experienced paragliding instructors are on hand to safely guide beginners in tandem flights.\n\nAfter enjoying the activities and capturing photos, visitors can relax at the nature-themed cafes lining the area. Savoring a warm cup of local coffee or teh talua (traditional Minang egg tea) while gazing at the pine forests and the blue lake below is the perfect way to spend a late afternoon at Puncak Lawang. This area is truly a paradise for those seeking tranquility and breathtaking natural beauty.",
    tag: 'Trending',
    tagEn: 'Trending',
    actionUrl: 'https://maps.google.com/?q=Puncak+Lawang+Agam',
    highlights: [
      'Pemandangan Danau Maninjau bebas kabut',
      'Penerbangan paralayang tandem untuk pemula',
      'Kafe bernuansa alam dengan menu khas teh talua'
    ],
    highlightsEn: [
      'Fog-free panoramic views of Lake Maninjau',
      'Tandem paragliding flights for beginners',
      'Nature-themed cafes offering local teh talua'
    ],
    tips: 'Datanglah sebelum siang hari untuk menghindari kabut yang sering turun menjelang sore.',
    tipsEn: 'Arrive before noon to avoid the fog that often rolls in during the late afternoon.',
    locationName: 'Puncak Lawang, Kab. Agam',
    locationNameEn: 'Puncak Lawang, Agam Regency'
  },
  {
    id: 'hi5',
    title: 'Paket Ekowisata Baru Lembah Harau',
    titleEn: 'New Harau Valley Ecotourism Packages',
    category: 'Wisata Alam',
    categoryEn: 'Nature Tourism',
    date: '04 Agustus 2026',
    dateEn: 'August 04, 2026',
    imageUrl: '',
    description: "Lembah Harau, lembah granit raksasa yang sering dijuluki sebagai Yosemite-nya Indonesia, kini menawarkan paket ekowisata terbaru yang sangat menarik bagi wisatawan keluarga. Dikelilingi oleh tebing-tebing batu vertikal yang menjulang setinggi ratusan meter dengan warna-warni memukau, kawasan ini menyajikan suasana magis seolah berada di dunia dongeng. Hijaunya hamparan sawah di dasar lembah menciptakan kontras visual yang luar biasa indah.\n\nPaket ekowisata terbaru ini memungkinkan wisatawan untuk merasakan pengalaman menginap (glamping) di tengah alam, bersepeda menyusuri pedesaan, serta trekking ringan menuju air terjun tersembunyi seperti Sarasah Bunta dan Akar Berayun. Wisatawan dapat berendam di kolam alami yang berair sangat sejuk, bersumber langsung dari mata air pegunungan yang menyegarkan.\n\nFasilitas di Lembah Harau juga telah ditingkatkan dengan standar kebersihan dan kenyamanan tinggi. Jalan akses kini sangat mulus, spot-spot foto tematik tertata rapi, dan area parkir diperluas. Kunjungan ke Lembah Harau dijamin akan memberikan kesegaran jiwa raga, menjadikannya destinasi wajib bagi siapa pun yang berlibur ke Sumatera Barat.",
    descriptionEn: "Harau Valley, the giant granite valley often dubbed the Yosemite of Indonesia, now offers exciting new ecotourism packages perfect for family vacations. Surrounded by towering, colorful vertical rock cliffs reaching hundreds of meters high, the area exudes a magical, fairytale-like atmosphere. The lush green rice fields resting at the valley floor create an extraordinary and beautiful visual contrast.\n\nThe new ecotourism packages allow tourists to experience glamorous camping (glamping) right in the heart of nature, cycle through serene villages, and embark on light treks to hidden waterfalls like Sarasah Bunta and Akar Berayun. Visitors can take a refreshing dip in natural pools filled with cool, crystal-clear water sourced directly from mountain springs.\n\nFacilities in Harau Valley have also been significantly upgraded to meet high standards of cleanliness and comfort. Access roads are now smooth, thematic photo spots are well-organized, and parking areas have been expanded. A visit to Harau Valley guarantees a rejuvenating experience for the mind and body, making it an absolute must-visit destination for anyone traveling to West Sumatra.",
    tag: 'Ekowisata',
    tagEn: 'Ecotourism',
    actionUrl: 'https://maps.google.com/?q=Lembah+Harau+Payakumbuh',
    highlights: [
      'Glamping mewah di bawah tebing raksasa',
      'Rute bersepeda pedesaan yang aman untuk anak',
      'Akses mudah ke air terjun tersembunyi'
    ],
    highlightsEn: [
      'Luxury glamping beneath giant granite cliffs',
      'Safe village cycling routes perfect for children',
      'Easy access to pristine hidden waterfalls'
    ],
    tips: 'Bawa kamera dengan lensa wide-angle untuk memotret kemegahan tebing vertikal secara keseluruhan.',
    tipsEn: 'Bring a camera with a wide-angle lens to fully capture the majesty of the towering vertical cliffs.',
    locationName: 'Lembah Harau, Kab. Limapuluh Kota',
    locationNameEn: 'Harau Valley, Limapuluh Kota Regency'
  },
  {
    id: 'hi6',
    title: 'Wajah Baru Sentra Kuliner Nasi Kapau',
    titleEn: 'Fresh New Look for Nasi Kapau Culinary Center',
    category: 'Kuliner',
    categoryEn: 'Culinary',
    date: '02 Agustus 2026',
    dateEn: 'August 02, 2026',
    imageUrl: '',
    description: "Pecinta kuliner nusantara wajib bergembira! Kawasan sentra kuliner Nasi Kapau di Pasar Lereng, Bukittinggi, kini tampil dengan wajah baru yang lebih bersih, tertata, dan higienis tanpa menghilangkan nuansa tradisionalnya. Deretan los lambuang (tenda penjual) menyajikan pemandangan baskom-baskom besar berisi aneka gulai bersantan kental dengan aroma rempah yang sanggup menerbitkan selera siapa saja.\n\nWisatawan dapat merasakan sensasi unik memesan makanan dari lapak yang posisinya lebih rendah dari panci lauk pauk. Para Uni (panggilan perempuan Minang) penjual dengan cekatan akan menggunakan sendok sayur bertangkai panjang untuk mengambilkan lauk pilihan Anda, mulai dari gulai tambunsu (usus sapi isi telur), gulai tunjang (kikil), hingga gulai cangkuak. Setiap porsi disajikan melimpah dengan kuah kaldu yang kaya rasa.\n\nPemerintah setempat sangat ketat menjaga kualitas dan harga standar di kawasan ini, sehingga wisatawan dapat makan dengan nyaman tanpa takut ditembak harga. Menikmati Nasi Kapau otentik di tengah sejuknya udara Bukittinggi, ditemani segelas es tebak atau kerupuk jangek (kerupuk kulit), adalah pengalaman kuliner paripurna yang akan terus memanggil Anda kembali ke Sumatera Barat.",
    descriptionEn: "Indonesian culinary lovers rejoice! The famous Nasi Kapau culinary center at Pasar Lereng, Bukittinggi, now sports a fresh, well-organized, and highly hygienic new look while retaining its beloved traditional charm. Rows of food stalls display giant basins filled with thick, rich coconut curries, emitting mouthwatering spice aromas that will tempt any passerby.\n\nTourists can experience the unique ordering method where customers are seated slightly lower than the array of dishes. The friendly Uni (Minang female vendors) skillfully use long-handled ladles to serve your chosen dishes, which might include gulai tambunsu (cow intestines stuffed with egg), gulai tunjang (beef tendon), and gulai cangkuak. Every portion is served generously, drenched in incredibly flavorful curries.\n\nThe local government strictly maintains quality control and standard pricing in this area, ensuring tourists can dine comfortably without fear of tourist traps. Enjoying authentic Nasi Kapau in the cool mountain air of Bukittinggi, accompanied by a glass of traditional Es Tebak or crunchy Kerupuk Jangek (cow skin crackers), is the ultimate culinary experience that will keep you coming back to West Sumatra.",
    tag: 'Rekomendasi',
    tagEn: 'Recommended',
    actionUrl: 'https://maps.google.com/?q=Pasar+Lereng+Bukittinggi',
    highlights: [
      'Tata letak lebih higienis dan nyaman',
      'Harga standar terpantau resmi',
      'Pengalaman memesan unik dengan sendok panjang'
    ],
    highlightsEn: [
      'Highly hygienic and comfortable layout',
      'Officially monitored standard pricing',
      'Unique ordering experience with long-handled ladles'
    ],
    tips: 'Cobalah gulai tambunsu dan tambahkan kerupuk jangek siram kuah gulai untuk pengalaman maksimal.',
    tipsEn: 'Try the gulai tambunsu and top it off with beef skin crackers drenched in curry sauce for the ultimate experience.',
    locationName: 'Pasar Lereng, Bukittinggi',
    locationNameEn: 'Pasar Lereng, Bukittinggi'
  },
  {
    id: 'hi7',
    title: 'Tol Padang - Bukittinggi Masuk Tahap Uji Coba',
    titleEn: 'Padang - Bukittinggi Toll Road Enters Trial Phase',
    category: 'Infrastruktur',
    categoryEn: 'Infrastructure',
    date: '31 Juli 2026',
    dateEn: 'July 31, 2026',
    imageUrl: '',
    description: "Infrastruktur pariwisata di Sumatera Barat terus dibenahi, dan kabar gembiranya, akses jalan tol baru dari Kota Padang menuju Bukittinggi kini menunjukkan progres signifikan dengan beberapa seksi yang telah dibuka untuk uji coba kelayakan jalan. Proyek strategis ini dirancang khusus untuk memangkas waktu tempuh yang biasanya memakan waktu 2,5 hingga 3 jam menjadi jauh lebih singkat dan efisien.\n\nDengan adanya tol ini, kenyamanan wisatawan semakin terjamin, menghindari titik-titik kemacetan lama seperti di kawasan Silaiang atau Pasar Koto Baru, terutama saat akhir pekan atau musim liburan. Wisatawan yang mendarat di Bandara Internasional Minangkabau (BIM) dapat langsung menikmati perjalanan bebas hambatan dengan pemandangan perbukitan hijau di sisi kiri dan kanan jalan.\n\nKemudahan akses ini tentu membuka peluang besar bagi wisatawan untuk memaksimalkan jadwal liburan mereka. Waktu yang dihemat di perjalanan dapat dialihkan untuk mengeksplorasi lebih banyak destinasi wisata alam, kebudayaan, dan kuliner di kawasan dataran tinggi Sumatera Barat. Pemerintah memastikan rute ini aman, dengan rest area modern yang akan segera beroperasi.",
    descriptionEn: "Tourism infrastructure in West Sumatra continues to improve rapidly. The exciting news is that the new toll road access connecting Padang City to Bukittinggi is showing significant progress, with several sections now open for road-worthiness trials. This strategic project is specifically designed to slash the usual 2.5 to 3-hour travel time, making journeys drastically shorter and more efficient.\n\nWith this new toll road, tourist comfort is greatly enhanced by bypassing old traffic bottlenecks like the Silaiang area or Koto Baru Market, especially during weekends and holiday seasons. Tourists arriving at Minangkabau International Airport (BIM) can smoothly transition to a seamless highway journey flanked by beautiful green rolling hills on both sides.\n\nThis ease of access opens up fantastic opportunities for tourists to maximize their holiday itineraries. The time saved on the road can be better spent exploring the abundance of natural, cultural, and culinary destinations in the West Sumatra highlands. The government ensures the route is highly safe, with modern rest areas slated to operate soon.",
    tag: 'Penting',
    tagEn: 'Important',
    actionUrl: 'https://maps.google.com/?q=Tol+Padang+Bukittinggi',
    highlights: [
      'Pemangkasan waktu tempuh yang signifikan',
      'Perjalanan bebas macet dengan pemandangan indah',
      'Akses langsung dari Bandara Minangkabau'
    ],
    highlightsEn: [
      'Significant reduction in travel time',
      'Traffic-free journey with scenic views',
      'Direct access from Minangkabau Airport'
    ],
    tips: 'Pastikan saldo kartu e-toll Anda cukup sebelum memasuki gerbang tol.',
    tipsEn: 'Ensure your e-toll card has sufficient balance before entering the toll gates.',
    locationName: 'Jalur Lintas Padang - Bukittinggi',
    locationNameEn: 'Padang - Bukittinggi Route'
  },
  {
    id: 'hi8',
    title: 'Fasilitas Wisata Air Mandeh Bertaraf Internasional',
    titleEn: 'International Standard Water Sports at Mandeh',
    category: 'Wisata Bahari',
    categoryEn: 'Marine Tourism',
    date: '28 Juli 2026',
    dateEn: 'July 28, 2026',
    imageUrl: '',
    description: "Kawasan Wisata Bahari Mandeh, yang pamornya disejajarkan dengan surga tropis Raja Ampat, kini semakin bersinar dengan fasilitas wisata air yang makin lengkap dan bertaraf internasional. Terletak di Kabupaten Pesisir Selatan, teluk tenang dengan pulau-pulau kecil berhutan lebat ini menawarkan gradasi air laut yang sangat jernih, dari toska hingga biru tua, menciptakan lukisan alam yang tak tertandingi.\n\nPengelola kawasan kini menyediakan paket island-hopping yang sangat terjangkau, penyewaan alat snorkeling berkualitas tinggi, dan wahana jet ski bagi pelancong berjiwa petualang. Wisatawan dapat menjelajahi pulau-pulau eksotis seperti Pulau Setan, Pulau Cubadak, dan Pulau Sironjong. Menyelam di perairan Mandeh berarti menyapa terumbu karang yang masih sangat perawan dan kawanan ikan tropis beraneka warna.\n\nDi penghujung hari, pengunjung dapat bersantai di Puncak Paku, titik pandang terbaik untuk menyaksikan fenomena matahari terbenam emas yang perlahan tenggelam di balik siluet pulau-pulau Mandeh. Didukung keramahan warga lokal dan homestay yang bersih, Mandeh siap memberikan pengalaman liburan bahari kelas dunia di pesisir barat Sumatera.",
    descriptionEn: "The Mandeh Marine Tourism Estate, highly celebrated and often likened to the tropical paradise of Raja Ampat, shines brighter than ever with newly upgraded, international-standard water sports facilities. Located in the Pesisir Selatan Regency, this tranquil bay dotted with lush green islets boasts incredibly clear waters with gradients from turquoise to deep blue, forming an unparalleled natural masterpiece.\n\nThe management now offers highly affordable island-hopping packages, high-quality snorkeling gear rentals, and jet skis for adventurous souls. Tourists can explore exotic islands such as Pulau Setan, Pulau Cubadak, and Pulau Sironjong. Diving or snorkeling in Mandeh's waters means greeting pristine coral reefs teeming with colorful schools of tropical fish.\n\nAt the end of the day, visitors can unwind at Puncak Paku, the premier viewpoint to witness a glorious golden sunset slowly dipping behind the silhouettes of the Mandeh islands. Supported by the warm hospitality of locals and clean homestays, Mandeh is ready to deliver a world-class marine holiday experience on the western coast of Sumatra.",
    tag: 'Trending',
    tagEn: 'Trending',
    actionUrl: 'https://maps.google.com/?q=Kawasan+Mandeh+Pesisir+Selatan',
    highlights: [
      'Wahana jet ski dan snorkeling standar internasional',
      'Paket island-hopping mengunjungi pulau eksotis',
      'Pemandangan sunset magis dari Puncak Paku'
    ],
    highlightsEn: [
      'International standard jet ski and snorkeling facilities',
      'Island-hopping packages to exotic islets',
      'Magical sunset views from Puncak Paku'
    ],
    tips: 'Gunakan tabir surya ramah terumbu karang saat beraktivitas di air.',
    tipsEn: 'Use reef-safe sunscreen when participating in water activities.',
    locationName: 'Pesisir Selatan',
    locationNameEn: 'Pesisir Selatan'
  },
  {
    id: 'hi9',
    title: 'Peluncuran Program Desa Wisata Halal & Ekologis',
    titleEn: 'Launch of Halal & Ecological Tourism Villages',
    category: 'Inovasi Pariwisata',
    categoryEn: 'Tourism Innovation',
    date: '25 Juli 2026',
    dateEn: 'July 25, 2026',
    imageUrl: '',
    description: "Sebuah inisiatif luar biasa datang dari desa-desa wisata di Sumatera Barat dengan diluncurkannya program Desa Wisata Halal & Ekologis. Program ini merupakan perpaduan harmonis antara filosofi adat 'Adat Basandi Syarak, Syarak Basandi Kitabullah' (Adat bersendikan agama, agama bersendikan Al-Qur'an) dengan konsep pariwisata berkelanjutan yang ramah lingkungan.\n\nDi desa-desa seperti Nagari Pariangan (salah satu desa terindah di dunia) dan Desa Wisata Kubu Gadang, wisatawan akan dimanjakan dengan pengalaman hidup autentik masyarakat Minang. Wisatawan dapat mencoba langsung menanam padi di sawah, memerah susu sapi, hingga memasak masakan tradisional menggunakan bahan-bahan organik hasil kebun setempat. Semua fasilitas ibadah dan makanan dipastikan 100% halal dan tersertifikasi.\n\nProgram ini mengedepankan pembatasan sampah plastik dan penggunaan energi terbarukan berskala mikro. Penduduk desa menyambut setiap tamu bak sanak saudara (keluarga), menawarkan homestay berarsitektur Rumah Gadang yang sejuk. Inilah definisi pariwisata masa depan: berwisata, belajar, menghormati budaya lokal, sekaligus menjaga kelestarian alam semesta.",
    descriptionEn: "An outstanding initiative has emerged from the tourist villages of West Sumatra with the launch of the Halal & Ecological Tourism Village program. This initiative is a harmonious blend of the traditional philosophy 'Adat Basandi Syarak, Syarak Basandi Kitabullah' (Customs based on religion, religion based on the Quran) and sustainable, eco-friendly tourism concepts.\n\nIn villages such as Nagari Pariangan (internationally recognized as one of the world's most beautiful villages) and Kubu Gadang, tourists will be treated to the authentic daily life of the Minang people. Visitors can try their hand at planting rice, milking cows, and cooking traditional meals using organic, locally sourced ingredients. All prayer facilities and culinary offerings are guaranteed 100% halal and certified.\n\nThe program strongly emphasizes restricting single-use plastics and utilizing micro-scale renewable energy. Villagers welcome every guest like family, offering stays in cool, traditional Rumah Gadang-style homestays. This is the definition of future tourism: traveling, learning, respecting local culture, while simultaneously protecting the environment.",
    tag: 'Ekowisata',
    tagEn: 'Ecotourism',
    actionUrl: 'https://maps.google.com/?q=Nagari+Pariangan+Tanah+Datar',
    highlights: [
      'Pengalaman hidup autentik bersama masyarakat lokal',
      'Semua fasilitas dijamin 100% halal',
      'Pariwisata berkelanjutan bebas sampah plastik'
    ],
    highlightsEn: [
      'Authentic living experiences with local communities',
      'All facilities guaranteed 100% halal',
      'Sustainable, plastic-free tourism'
    ],
    tips: 'Bawalah botol minum (tumbler) sendiri untuk mendukung program desa bebas plastik.',
    tipsEn: 'Bring your own reusable water bottle to support the plastic-free village initiative.',
    locationName: 'Berbagai Desa Wisata Sumbar',
    locationNameEn: 'Various Tourist Villages in West Sumatra'
  },
  {
    id: 'hi10',
    title: 'Pesona Gemerlap Malam Pantai Padang',
    titleEn: 'Spectacular Night Lights at Padang Beach',
    category: 'Destinasi Kota',
    categoryEn: 'City Destination',
    date: '20 Juli 2026',
    dateEn: 'July 20, 2026',
    imageUrl: '',
    description: "Pecinta senja dan keindahan malam, bersiaplah terpesona! Pantai Padang (Taplau) dan Masjid Raya Sumatera Barat kini menyajikan pesona gemerlap malam (city lights) yang semakin spektakuler berkat tata cahaya (lighting) arsitektural yang baru saja diresmikan oleh pemerintah daerah. Penataan ini membuat kawasan pesisir kota Padang menjadi sangat hidup dan romantis di malam hari.\n\nMasjid Raya Sumatera Barat yang megah, dengan desain atap unik tanpa kubah melainkan menyerupai gonjong Rumah Gadang, kini disorot oleh lampu-lampu LED hangat yang menonjolkan detail fasad ukiran kaligrafinya. Bangunan ini tidak hanya menjadi pusat ibadah spiritual yang tenang, namun juga monumen arsitektur kebanggaan yang sangat ikonik untuk diabadikan dalam lensa kamera.\n\nBergeser ke Pantai Padang, sepanjang trotoar kini tertata rapi, ramah pejalan kaki, dan bersih. Wisatawan dapat berjalan-jalan sore menanti matahari terbenam (sunset) sambil menikmati ragam jajanan khas seperti langkitang, pensi, dan jagung bakar. Angin laut yang semilir dan deburan ombak berpadu dengan cahaya kota menjadikan Padang sebagai salah satu destinasi wisata urban pesisir terbaik di Indonesia.",
    descriptionEn: "Lovers of sunsets and nightscapes, prepare to be amazed! Padang Beach (Taplau) and the Grand Mosque of West Sumatra now offer a spectacular array of city lights, thanks to a newly inaugurated architectural lighting system by the local government. This enhancement transforms Padang's coastal area into a vibrant and highly romantic destination after dark.\n\nThe majestic Grand Mosque of West Sumatra, renowned for its unique dome-less roof shaped like a traditional Rumah Gadang (gonjong), is now elegantly illuminated with warm LED lights that highlight the intricate details of its calligraphy-carved facade. The building stands not only as a serene spiritual center but also as a proud, iconic architectural monument perfect for nighttime photography.\n\nMoving towards Padang Beach, the promenades have been beautifully reorganized to be highly pedestrian-friendly and spotless. Tourists can enjoy a leisurely afternoon stroll waiting for a breathtaking sunset while savoring local coastal snacks like langkitang, pensi (tiny clams), and roasted corn. The gentle sea breeze and crashing waves paired with the city lights make Padang one of Indonesia's finest urban coastal tourism destinations.",
    tag: 'Rekomendasi',
    tagEn: 'Recommended',
    actionUrl: 'https://maps.google.com/?q=Pantai+Padang+Sumatera+Barat',
    highlights: [
      'Tata cahaya arsitektural Masjid Raya yang megah',
      'Trotoar pantai yang ramah pejalan kaki dan bersih',
      'Suasana malam yang hidup dan romantis'
    ],
    highlightsEn: [
      'Majestic architectural lighting of the Grand Mosque',
      'Spotless, pedestrian-friendly beach promenades',
      'Vibrant and romantic nighttime atmosphere'
    ],
    tips: 'Nikmati jagung bakar hangat sambil duduk di sepanjang trotoar Pantai Padang saat malam hari.',
    tipsEn: 'Enjoy warm roasted corn while sitting along the Padang Beach promenade at night.',
    locationName: 'Kota Padang',
    locationNameEn: 'Padang City'
  },
  {
    id: 'hi11',
    title: 'Satgas Wisata "Zero Pungli" Resmi Beraksi',
    titleEn: '"Zero Pungli" Tourism Task Force in Action',
    category: 'Keamanan & Kenyamanan',
    categoryEn: 'Safety & Comfort',
    date: '15 Juli 2026',
    dateEn: 'July 15, 2026',
    imageUrl: '',
    description: "Untuk menjamin keamanan dan kenyamanan maksimal bagi setiap pengunjung, Pemerintah Provinsi Sumatera Barat telah meluncurkan Satuan Tugas (Satgas) Pariwisata Terpadu 'Zero Pungli'. Inisiatif tegas ini memastikan seluruh destinasi unggulan di Sumatera Barat bebas dari praktik pungutan liar, parkir ilegal, dan premanisme berkedok wisata.\n\nWisatawan kini dapat menikmati liburannya dengan tenang karena setiap titik wisata prioritas telah dijaga oleh aparat berseragam yang ramah dan siap membantu kapan saja. Sistem pembayaran tiket masuk dan retribusi parkir di berbagai kawasan seperti Jam Gadang, Pantai Padang, dan Lembah Harau kini diintegrasikan ke sistem digital (QRIS), membuatnya transparan dan masuk ke kas daerah untuk pembangunan.\n\nLangkah berani ini menuai pujian luas dari wisatawan domestik dan mancanegara. Dampak positifnya sangat terasa; suasana berwisata menjadi jauh lebih nyaman, tertib, dan bersahabat. Sumatera Barat kini tidak hanya dikenal karena keindahan alam dan kelezatan kulinernya, tetapi juga karena profesionalitas pelayanan pariwisatanya yang menjunjung tinggi nilai keramahtamahan sejati.",
    descriptionEn: "To ensure maximum safety and comfort for every visitor, the West Sumatra Provincial Government has launched an Integrated Tourism Task Force named 'Zero Pungli' (Zero Illegal Levies). This strict initiative ensures that all prime tourist destinations in West Sumatra are completely free from illegal levies, unauthorized parking fees, and tourism-related extortion.\n\nTourists can now enjoy their holidays with complete peace of mind, as every priority tourist spot is monitored by friendly, uniformed officers ready to assist at any time. Ticketing and parking fee systems in major areas like Jam Gadang, Padang Beach, and Harau Valley have been integrated into a transparent digital payment system (QRIS), directly funding local development.\n\nThis bold move has garnered widespread praise from both domestic and international tourists. The positive impact is highly palpable; the tourism atmosphere is now significantly more comfortable, orderly, and welcoming. West Sumatra is no longer just famous for its stunning nature and delicious cuisine, but also for its highly professional tourism services that truly uphold the values of genuine hospitality.",
    tag: 'Penting',
    tagEn: 'Important',
    actionUrl: 'https://maps.google.com/?q=Sumatera+Barat',
    highlights: [
      'Destinasi unggulan bebas dari pungutan liar',
      'Kehadiran aparat keamanan yang ramah wisatawan',
      'Sistem pembayaran digital (QRIS) yang transparan'
    ],
    highlightsEn: [
      'Prime destinations free from illegal levies',
      'Presence of tourist-friendly security officers',
      'Transparent digital payment systems (QRIS)'
    ],
    tips: 'Selalu gunakan pembayaran digital (QRIS) untuk tiket masuk dan retribusi parkir resmi.',
    tipsEn: 'Always use digital payments (QRIS) for official entrance tickets and parking fees.',
    locationName: 'Seluruh Sumatera Barat',
    locationNameEn: 'All Over West Sumatra'
  }
];



export const DESTINATIONS: Destination[] = [
  {
    id: 'd1',
    title: 'Danau Singkarak',
    titleEn: 'Lake Singkarak',
    category: 'Danau & Gunung',
    categoryEn: 'Lake & Mountain',
    regency: 'Kabupaten Solok & Tanah Datar',
    tag: 'Populer',
    tagEn: 'Popular',
    description: "Danau Singkarak merupakan danau tektonik terluas kedua di Pulau Sumatera yang membentang menawan di dua wilayah, yaitu Kabupaten Solok dan Kabupaten Tanah Datar. Dikelilingi oleh hamparan Bukit Barisan yang hijau dan menyejukkan mata, danau ini menawarkan atmosfer alam yang tenang serta udara segar pegunungan yang sangat cocok untuk melepas penat dari hiruk-pikuk perkotaan.\n\nKeunikan utama Danau Singkarak yang sangat mendunia adalah keberadaan ikan bilih (Mystacoleucus padangensis), spesies ikan air tawar endemik yang hanya hidup secara alami di perairan danau ini. Wisatawan dapat menikmati sajian ikan bilih goreng renyah di warung-warung tepi danau sambil memandangi riak air danau yang memantulkan gumpalan awan serta siluet pegunungan di sekitarnya.\n\nSelain pesona kulinernya, Danau Singkarak juga menjadi arena ikonik ajang balap sepeda internasional Tour de Singkarak. Dengan fasilitas dermaga, dermaga perahu, spot foto dermaga kayu, serta akses Jalan Lintas Sumatera yang mulus, Danau Singkarak menjadi destinasi persinggahan favorit bagi wisatawan yang melintasi Ranah Minang.",
    descriptionEn: "Lake Singkarak is the second-largest tectonic lake on Sumatra Island, stretching magnificently across two regencies: Solok and Tanah Datar. Surrounded by the lush, soothing green expanses of the Barisan Mountains, this lake offers a serene natural atmosphere and fresh mountain air, making it an ideal retreat to unwind from city life.\n\nThe world-renowned highlight of Lake Singkarak is the endemic bilih fish (Mystacoleucus padangensis), a unique freshwater species that naturally thrives exclusively within these waters. Visitors can savor crispy fried bilih fish at cozy lakeside eateries while gazing at the gentle water ripples reflecting cloud formations and mountain silhouettes.\n\nBeyond its culinary delights, Lake Singkarak serves as the iconic backdrop for the international Tour de Singkarak cycling race. Equipped with scenic wooden jetties, boat docks, photo spots, and smooth Trans-Sumatra highway access, Lake Singkarak is a top stopover destination for travelers exploring West Sumatra.",
    highlights: ['Pemandangan Danau', 'Ikan Bilih Endemik', 'Spot Foto Dermaga Kayu'],
    highlightsEn: ['Lake Panorama', 'Endemic Bilih Fish', 'Wooden Pier Photo Spots'],
    bestTime: 'Pagi dan Sore',
    bestTimeEn: 'Morning and Afternoon',
    locationDetails: 'Jalan Lintas Sumatera, Solok - Tanah Datar',
    locationDetailsEn: 'Trans-Sumatra Highway, Solok - Tanah Datar',
    imageUrl: 'https://images.unsplash.com/photo-1549479373-cf673e4a9e2c?auto=format&fit=crop&w=800&q=80',
    lat: -0.616667,
    lng: 100.533333
  },
  {
    id: 'd2',
    title: 'Lembah Harau',
    titleEn: 'Harau Valley',
    category: 'Lembah & Geopark',
    categoryEn: 'Valley & Geopark',
    regency: 'Kabupaten Limapuluh Kota',
    tag: 'Trending',
    tagEn: 'Trending',
    description: "Lembah Harau adalah cagar alam spektakuler di Kabupaten Limapuluh Kota yang sering dijuluki sebagai 'Yosemite-nya Indonesia'. Lembah granit memukau ini dikelilingi tebing-tebing batu terjal setinggi 100 hingga 500 meter yang berdiri tegak membenteng hamparan sawah hijau nan subur di dasar lembah, menciptakan lanskap alam yang sangat dramatis dan memanjakan mata.\n\nDi dalam kawasan Lembah Harau terdapat beberapa air terjun alami yang berair jernih dan sejuk, seperti Sarasah Bunta, Sarasah Murai, dan Akar Berayun. Gemericik air yang jatuh dari tebing batu berpadu dengan kicauan burung liar memberikan efek terapi alami yang menenangkan jiwa, sangat ideal untuk rekreasi keluarga maupun olahraga panjat tebing kelas dunia.\n\nKawasan ini kini dilengkapi dengan ragam fasilitas ekowisata modern mulai dari area glamping, persewaan sepeda, hingga spot foto bertema desa tradisional. Wisatawan dapat menjelajahi keindahan desa dengan berjalan kaki atau bersepeda, menikmati keramahan penduduk lokal, serta mengabadikan momen berlatar megahnya tebing-tebing granit alami.",
    descriptionEn: "Harau Valley is a breathtaking natural reserve in Limapuluh Kota Regency, often celebrated as the 'Yosemite of Indonesia'. This stunning granite valley is enclosed by sheer rock cliffs ranging from 100 to 500 meters high, forming a dramatic natural fortress around lush green rice paddies on the valley floor.\n\nWithin Harau Valley lie several pristine waterfalls with crystal-clear, refreshing waters, including Sarasah Bunta, Sarasah Murai, and Akar Berayun. The soothing sound of cascading water against granite walls combined with wild bird songs provides a deeply relaxing therapy, perfect for family leisure or world-class rock climbing.\n\nThe area is now enhanced with modern ecotourism amenities including glamping sites, bicycle rentals, and traditional village-themed photo spots. Travelers can explore the scenic countryside on foot or by bike, experience genuine local hospitality, and capture unforgettable memories framed by towering granite cliffs.",
    highlights: ['Tebing Granit Raksasa', 'Air Terjun Sarasah Bunta', 'Area Glamping & Trekking'],
    highlightsEn: ['Giant Granite Cliffs', 'Sarasah Bunta Waterfall', 'Glamping & Trekking Area'],
    bestTime: 'Pagi Hari (07:00 - 11:00 WIB)',
    bestTimeEn: 'Morning (07:00 - 11:00 AM)',
    locationDetails: 'Kecamatan Harau, Kab. Limapuluh Kota',
    locationDetailsEn: 'Harau District, Limapuluh Kota Regency',
    imageUrl: 'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
    lat: -0.100000,
    lng: 100.670000
  },
  {
    id: 'd3',
    title: 'Jam Gadang & Kota Bukittinggi',
    titleEn: 'Jam Gadang & Bukittinggi City',
    category: 'Alam',
    categoryEn: 'Nature & Landmark',
    regency: 'Kota Bukittinggi',
    tag: 'Populer',
    tagEn: 'Popular',
    description: "Jam Gadang merupakan menara jam ikonik setinggi 26 meter yang berdiri megah di pusat Kota Bukittinggi dan menjadi simbol kebanggaan utama pariwisata Sumatera Barat. Diresmikan pada tahun 1926, menara jam bermesin langka buatan Jerman ini memiliki keunikan arsitektur penutup atap berbentuk gonjong Rumah Gadang khas Minangkabau yang sangat elok.\n\nPelataran di sekitar Jam Gadang telah ditata menjadi taman kota modern yang bersih, rapi, dan ramah pejalan kaki. Tempat ini menjadi pusat aktivitas sosial dan budaya di mana wisatawan dapat bersantai, menikmati pertunjukan seni jalanan, serta mencicipi kuliner khas Pasar Atas seperti Nasi Kapau, Kerupuk Sanjai Balado, dan Teh Talua.\n\nDari kawasan Jam Gadang, wisatawan dapat dengan mudah berjalan kaki menuju objek bersejarah lainnya seperti Taman Marga Satwa dan Budaya Kinantan, Benteng Fort de Kock, serta Ngarai Sianok dan Lubang Jepang. Menikmati suasana sejuk sore hari di bawah naungan Jam Gadang adalah pengalaman wajib saat berkunjung ke dataran tinggi Sumatera Barat.",
    descriptionEn: "Jam Gadang is an iconic 26-meter clock tower standing proudly in the heart of Bukittinggi City, serving as the ultimate symbol of West Sumatra tourism. Built in 1926, this landmark features a rare German clock mechanism and a distinctive roof designed in the shape of Minangkabau's traditional gonjong house architecture.\n\nThe plaza surrounding Jam Gadang has been transformed into a clean, modern, and pedestrian-friendly public park. It acts as a vibrant cultural and social hub where visitors can unwind, enjoy busking art performances, and sample authentic Pasar Atas delicacies like Nasi Kapau, spicy Sanjai crackers, and Teh Talua.\n\nFrom the Jam Gadang plaza, tourists can easily stroll to nearby historical attractions including the Kinantan Wildlife and Cultural Park, Fort de Kock, Sianok Canyon, and the historical Japanese Tunnel. Experiencing the cool mountain afternoon breeze under the shade of Jam Gadang is an absolute must-do in West Sumatra.",
    highlights: ['Ikon Jam Bersejarah 1926', 'Taman Pejalan Kaki Pedestrian', 'Wisata Kuliner Pasar Atas'],
    highlightsEn: ['Historic 1926 Clock Landmark', 'Pedestrian Park Plaza', 'Pasar Atas Culinary Hub'],
    bestTime: 'Sore hingga Malam Hari',
    bestTimeEn: 'Late Afternoon to Evening',
    locationDetails: 'Pusat Kota Bukittinggi',
    locationDetailsEn: 'City Center, Bukittinggi',
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    lat: -0.304987,
    lng: 100.369434
  },
  {
    id: 'd4',
    title: 'Istano Basa Pagaruyung',
    titleEn: 'Istano Basa Pagaruyung Palace',
    category: 'Desa Wisata',
    categoryEn: 'Culture & Heritage',
    regency: 'Kabupaten Tanah Datar',
    tag: 'Budaya',
    tagEn: 'Culture',
    description: "Istano Basa Pagaruyung merupakan replika kemegahan istana Kerajaan Pagaruyung yang berdiri dengan sangat anggun di Kecamatan Tanjung Emas, Kabupaten Tanah Datar. Istana megah tiga tingkat ini dibangun penuh dengan konstruksi kayu tradisional berhiaskan ukiran-ukiran motif alam khas Minangkabau yang dipenuhi makna filosofis keagungan adat.\n\nDi dalam istana, pengunjung dapat menjelajahi koleksi benda-benda pusaka, ruang singgasana raja, serta bilik-bilik putri kerajaan yang didekorasi kain tenun warna-warni yang sangat indah. Wisatawan juga dapat menyewa pakaian adat lengkap Minangkabau untuk berfoto di area dalam istana maupun di pelataran halaman yang ditata asri dengan rangkiang (lumbung padi) tradisional.\n\nKeberadaan pemandu lokal yang komunikatif memberikan wawasan mendalam mengenai sejarah kejayaan Kerajaan Pagaruyung dan sistem matrilineal yang unik di Minangkabau. Kunjungan ke Istano Basa Pagaruyung menawarkan pengalaman wisata sejarah dan edukasi budaya yang tak tertandingi.",
    descriptionEn: "Istano Basa Pagaruyung is a magnificent replica of the Pagaruyung Royal Palace, standing gracefully in Tanjung Emas District, Tanah Datar Regency. This impressive three-story palace is constructed entirely from traditional timber adorned with intricate Minangkabau wood carvings that embody deep cultural philosophies.\n\nInside the palace, visitors can explore collections of royal heirlooms, the king's throne room, and royal princess chambers decorated with vibrant handwoven textiles. Tourists can also rent full traditional Minangkabau royal costumes to take memorable photographs inside the palace chambers or across the manicured lawns featuring traditional rangkiang rice barns.\n\nCommunicative local guides provide rich historical insights into the glory days of the Pagaruyung Kingdom and Minangkabau's unique matrilineal heritage. A visit to Istano Basa Pagaruyung delivers an unmatched cultural and historical educational journey.",
    highlights: ['Arsitektur Kayu Tiga Tingkat', 'Penyewaan Baju Adat Lengkap', 'Museum Pusaka Kerajaan'],
    highlightsEn: ['Three-Story Timber Palace', 'Traditional Costume Rentals', 'Royal Artifacts Museum'],
    bestTime: 'Pagi dan Siang Hari',
    bestTimeEn: 'Morning and Midday',
    locationDetails: 'Batusangkar, Kabupaten Tanah Datar',
    locationDetailsEn: 'Batusangkar, Tanah Datar Regency',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
    lat: -0.471111,
    lng: 100.621111
  },
  {
    id: 'd5',
    title: 'Puncak Lawang & Danau Maninjau',
    titleEn: 'Puncak Lawang & Lake Maninjau',
    category: 'Danau & Gunung',
    categoryEn: 'Lake & Mountain',
    regency: 'Kabupaten Agam',
    tag: 'Petualangan',
    tagEn: 'Adventure',
    description: "Puncak Lawang adalah dataran tinggi di Kabupaten Agam seluas ketinggian 1.210 mdpl yang menyajikan pemandangan udara paling spektakuler menuju Danau Maninjau. Dari puncak ini, hamparan danau vulkanik biru yang dikelilingi perbukitan hijau dapat terlihat secara utuh, menciptakan pemandangan panorama yang sangat menakjubkan.\n\nLokasi ini juga dikenal secara internasional sebagai salah satu spot olahraga paralayang (paragliding) terbaik di Asia Tenggara karena kondisi angin yang sangat stabil. Wisatawan dapat mencoba terbang tandem bersama instruktur profesional untuk merasakan sensasi melayang bebas di atas keindahan Danau Maninjau.\n\nFasilitas di Puncak Lawang sangat memadai dengan area outbound, wahana pohon pinus, serta kafe-kafe nyaman yang menyajikan kopi panas dan teh talua. Tempat ini sangat direkomendasikan untuk wisatawan keluarga, pecinta fotografi, dan pemburu keindahan matahari terbit maupun terbenam.",
    descriptionEn: "Puncak Lawang is a scenic highland plateau in Agam Regency situated at 1,210 meters above sea level, delivering the most breathtaking aerial viewpoint over Lake Maninjau. From this peak, the vast blue volcanic lake framed by rolling green hills can be appreciated in its entirety, creating an awe-inspiring natural vista.\n\nThis spot is internationally acclaimed as one of Southeast Asia's best paragliding locations due to its highly stable wind currents. Travelers can experience tandem flights with certified instructors, soaring freely over the pristine beauty of Lake Maninjau.\n\nAmenities at Puncak Lawang include outbound adventure courses, pine forest trails, and cozy cafes serving hot local coffee and traditional egg tea. It is highly recommended for families, photography enthusiasts, and sunrise or sunset seekers.",
    highlights: ['Spot Paralayang Terbaik Asia', 'Panorama Danau Maninjau 360°', 'Hutan Pinus & Kafe Alam'],
    highlightsEn: ['Asia Premier Paragliding Spot', '360° Lake Maninjau Panorama', 'Pine Forest & Nature Cafes'],
    bestTime: 'Pagi Hari (08:00 - 12:00 WIB)',
    bestTimeEn: 'Morning (08:00 AM - 12:00 PM)',
    locationDetails: 'Kecamatan Matur, Kabupaten Agam',
    locationDetailsEn: 'Matur District, Agam Regency',
    imageUrl: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
    lat: -0.280000,
    lng: 100.230000
  },
  {
    id: 'd6',
    title: 'Desa Wisata Nagari Pariangan',
    titleEn: 'Nagari Pariangan Tourism Village',
    category: 'Desa Wisata',
    categoryEn: 'Heritage Village',
    regency: 'Kabupaten Tanah Datar',
    tag: 'Terindah',
    tagEn: 'Most Beautiful',
    description: "Nagari Pariangan di Kabupaten Tanah Datar terletak anggun di lereng Gunung Marapi dan dinobatkan oleh media internasional sebagai salah satu desa terindah di dunia. Desa bersejarah ini diyakini sebagai nagari tertua di Minangkabau, tempat asal mula peradaban, adat, dan kebudayaan suku Minang berkembang.\n\nArsitektur desa ini didominasi oleh Rumah Gadang kayu berusia ratusan tahun yang berdiri harmonis di antara jalan-jalan batu setapak dan hamparan sawah bertingkat (tererasering). Di tengah desa terdapat pemandian air panas alami yang bersumber langsung dari Gunung Marapi serta Masjid Tua Pariangan bertiang kayu yang sangat bersejarah.\n\nWisatawan dapat menikmati ketenangan kehidupan pedesaan yang asri, berinteraksi langsung dengan penduduk lokal yang ramah, serta mempelajari kearifan lokal pembuatan kopi daun kawa (kawa daun). Nagari Pariangan adalah destinasi sempurna bagi pecinta ekowisata, sejarah, dan ketenangan alam.",
    descriptionEn: "Nagari Pariangan in Tanah Datar Regency sits gracefully on the slopes of Mount Marapi and was named by international media as one of the most beautiful villages in the world. This historic village is revered as the oldest nagari in Minangkabau, the cradle of Minang civilization and customs.\n\nThe village architecture is dominated by centuries-old wooden Rumah Gadang structures standing in harmony among cobblestone pathways and terraced rice fields. At the village center lie natural hot springs fed directly by Mount Marapi and the historic wooden Pariangan Grand Mosque.\n\nVisitors can immerse themselves in serene village life, interact with warm local residents, and learn traditional brewing of kawa daun (coffee leaf tea). Nagari Pariangan is a perfect destination for ecotourism, history lovers, and seekers of natural tranquility.",
    highlights: ['Desa Terindah Dunia', 'Masjid Tua & Pemandian Air Panas', 'Sawah Bertingkat & Kopi Kawa'],
    highlightsEn: ['World Most Beautiful Village', 'Historic Mosque & Hot Springs', 'Terraced Rice Fields & Kawa Tea'],
    bestTime: 'Pagi Hari',
    bestTimeEn: 'Morning',
    locationDetails: 'Lereng Gunung Marapi, Tanah Datar',
    locationDetailsEn: 'Slopes of Mount Marapi, Tanah Datar',
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f0a?auto=format&fit=crop&w=800&q=80',
    lat: -0.450000,
    lng: 100.510000
  }
];

export const CULTURE_ITEMS: CultureItem[] = [
  {
    id: 'c1',
    title: 'Rumah Gadang',
    titleEn: 'Rumah Gadang',
    category: 'Arsitektur',
    categoryEn: 'Architecture',
    description: "Rumah Gadang adalah rumah adat tradisional masyarakat Minangkabau yang berbentuk panggung dengan lengkungan atap khas menyerupai tanduk kerbau yang disebut gonjong. Bangunan ini bukan sekadar tempat tinggal, melainkan simbol kemegahan dan struktur sosial matriarkal Minangkabau yang menempatkan perempuan pada posisi terhormat sebagai pemilik warisan rumah.\n\nSatu hal yang sangat mengagumkan dari Rumah Gadang adalah konstruksi bangunannya yang tahan gempa. Dibuat tanpa menggunakan paku besi, tiang-tiang kayu utuh ditopang di atas batu datar dan dihubungkan menggunakan pasak kayu yang lentur namun sangat kokoh saat menerima guncangan gempa bumi.\n\nDinding luar Rumah Gadang dipenuhi ukiran kayu berwarna-warni yang mengambil motif dari alam, seperti tanaman merambat, hewan, dan susunan geometris. Setiap motif ukiran memiliki nama dan ungkapan filosofis Minangkabau yang mengajarkan kearifan hidup, kejujuran, serta keharmonisan dengan alam.",
    descriptionEn: "Rumah Gadang is the traditional stilt house of the Minangkabau people, distinguished by its sweeping curved roofs resembling buffalo horns, known as gonjong. More than a residence, this building serves as a grand symbol of Minangkabau's matriarchal social structure, where women hold revered positions as house inheritance owners.\n\nA fascinating feature of Rumah Gadang is its earthquake-resistant architectural engineering. Built entirely without iron nails, solid wooden pillars rest upon flat foundation stones and are connected via flexible wood pegs that absorb seismic shocks during earthquakes.\n\nThe exterior walls are adorned with colorful wood carvings inspired by nature, including climbing vines, fauna, and geometric patterns. Each carved motif carries a specific Minangkabau name and philosophical proverb teaching wisdom, integrity, and harmony with nature.",
    philosophy: 'Rumah Gadang Pambuka Kata, Tiang Panjang Panopang Adat (Simbol kehormatan perempuan & ketahanan adat)',
    philosophyEn: 'Pillar of Custom & Honor of Women (Symbolizing matriarchal dignity and resilient heritage)',
    origin: 'Pagaruyung & Seluruh Nagari Minangkabau',
    originEn: 'Pagaruyung & Minangkabau Regions',
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
    lat: -0.471111,
    lng: 100.621111
  },
  {
    id: 'c2',
    title: 'Tari Piring (Atraksi Piring Pecah)',
    titleEn: 'Tari Piring (Plate Dance Performance)',
    category: 'Tari & Musik',
    categoryEn: 'Dance & Music',
    description: "Tari Piring merupakan seni tari tradisional kebanggaan Minangkabau yang berasal dari Solok dan kini dikenal luas di panggung internasional. Para penari dengan tangkas memegang dua buah piring porselen di telapak tangan sambil mengayunkan gerakan yang cepat, dinamis, dan penuh energi diiringi alunan musik Saluang dan Talempong.\n\nAwalnya, Tari Piring diciptakan sebagai ritual rasa syukur masyarakat Minangkabau kepada para dewa atas hasil panen padi yang berlimpah. Seiring masuknya ajaran Islam, tarian ini bertransformasi menjadi seni pertunjukan hiburan rakyat untuk menyambut tamu kehormatan dan memeriahkan pesta pernikahan adat.\n\nPuncak atraksi Tari Piring yang paling mendebarkan adalah saat para penari melempar piring ke udara hingga pecah berkeping-keping di lantai, lalu menari riang di atas pecahan porselen tajam tanpa luka sedikit pun. Atraksi ini menunjukkan tingkat konsentrasi tinggi, kesucian jiwa, dan keahlian fisik luar biasa para penari Minang.",
    descriptionEn: "Tari Piring (Plate Dance) is a prized traditional Minangkabau dance originating from Solok and now celebrated on international stages. Dancers deftly hold porcelain plates in the palms of their hands, executing fast, energetic, and dynamic movements synchronized with Talempong percussion and Saluang flutes.\n\nOriginally created as a gratitude ritual to deities for bountiful rice harvests, the dance evolved with the advent of Islam into a celebrated folk performance used to welcome honored guests and enrich wedding ceremonies.\n\nThe thrilling climax occurs when dancers toss porcelain plates into the air, shattering them on the floor, and joyously dance over the sharp shards completely unharmed. This spectacular feat demonstrates intense concentration, spiritual purity, and extraordinary physical skill.",
    philosophy: 'Syukur Atas Rezeki & Ketangkasan Jiwa (Rasa syukur mendalam atas keberkahan hasil bumi)',
    philosophyEn: 'Gratitude for Abundance & Physical Mastery (Deep gratitude for earth bounty and agility)',
    origin: 'Solok & Dataran Tinggi Minangkabau',
    originEn: 'Solok & Minangkabau Highlands',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    lat: -0.790000,
    lng: 100.650000
  },
  {
    id: 'c3',
    title: 'Kain Songket Pandai Sikek',
    titleEn: 'Songket Pandai Sikek Handwoven Textile',
    category: 'Kain & Kerajinan',
    categoryEn: 'Textile & Crafts',
    description: "Songket Pandai Sikek adalah kain tenun tradisional mewah warisan leluhur Nagari Pandai Sikek, Kabupaten Tanah Datar, yang telah diakui sebagai warisan budaya tak benda Indonesia. Ditenun secara manual menggunakan alat tenun bukan mesin (ATBM), kain ini menggunakan benang emas dan perak berkualitas tinggi yang ditenun rapat ke atas kain sutra atau katun.\n\nProses pembuatan satu lembar kain Songket Pandai Sikek membutuhkan waktu pengerjaan berbulan-bulan dengan tingkat ketelitian luar biasa. Motif ukiran pada kain seperti saik kalam, batang pinang, dan pucuk rebung memiliki filosofi tentang kesabaran, keagungan adat, serta doa keselamatan bagi pemakainya.\n\nKain Songket biasanya dikenakan pada upacara-upacara adat penting, seperti pesta pernikahan, pengangkatan penghulu (batagak penghulu), dan perayaan keagamaan. Memiliki dan mengenakan Songket Pandai Sikek merupakan kebanggaan bagi masyarakat Minangkabau karena keindahannya yang elegan dan bernilai seni tinggi.",
    descriptionEn: "Songket Pandai Sikek is a luxurious traditional handwoven textile from Nagari Pandai Sikek, Tanah Datar Regency, recognized as an Indonesian Intangible Cultural Heritage. Woven manually on non-machine looms, it features premium gold and silver threads woven intricately into silk or cotton fabrics.\n\nCrafting a single piece of Songket Pandai Sikek takes months of painstaking dedication and precision. Carved textile motifs such as saik kalam and bamboo shoots carry deep proverbs about patience, cultural dignity, and blessings for the wearer.\n\nSongket textiles are worn during major traditional ceremonies including weddings, tribal chief inaugurations, and religious festivals. Owning and wearing Songket Pandai Sikek is a source of immense pride due to its timeless elegance and high artistic value.",
    philosophy: 'Setitik Benang Ditenun Sabar, Menjadi Keagungan Adat (Lambang kesabaran dan martabat tinggi)',
    philosophyEn: 'Woven with Patience for Cultural Splendor (Symbol of meticulous patience and noble dignity)',
    origin: 'Nagari Pandai Sikek, Tanah Datar',
    originEn: 'Nagari Pandai Sikek, Tanah Datar',
    imageUrl: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    lat: -0.330000,
    lng: 100.380000
  },
  {
    id: 'c4',
    title: 'Seni Beladiri Silek Minang',
    titleEn: 'Silek Minang Martial Arts',
    category: 'Seni Beladiri',
    categoryEn: 'Martial Arts',
    description: "Silek Minangkabau adalah seni beladiri tradisional warisan para leluhur Minang yang menggabungkan olah fisik, kepekaan rasa, serta kedalaman spiritual. Silek bukan sekadar alat untuk membela diri, melainkan bagian integral dari pendidikan karakter pemuda Minang yang diajarkan di sasaran (padepokan beladiri).\n\nFalsafah dasar Silek Minang berbunyi 'Lahir Silek Mencari Kawan, Batin Silek Mencari Tuhan'. Prinsip ini mengajarkan bahwa gerakan silat digunakan untuk merangkul persaudaraan dan menghindari permusuhan, sementara dimensi batinnya mengarahkan pesilat untuk selalu mendekatkan diri kepada Sang Pencipta.\n\nGerakan Silek sangat fleksibel, mengalir rendah, dan memanfaatkan tumpuan kaki yang kuat seperti gerakan harimau (Silek Harimau). Silek kerap ditampilkan dalam bentuk pertunjukan Seni Randai maupun Tari Pasambahan sebagai simbol ketangkasan, penghormatan, dan perlindungan bagi nagari.",
    descriptionEn: "Silek Minangkabau is a traditional martial art inherited from Minang ancestors that fuses physical conditioning, sensory awareness, and spiritual depth. More than self-defense, Silek forms an integral part of character building for young Minang men taught in traditional sasaran (dojos).\n\nThe core philosophy of Silek states 'Physical Silek Seeks Friends, Inner Silek Seeks God'. This principle teaches that physical moves aim to foster brotherhood and avoid conflict, while inner practice directs martial artists toward spiritual closeness with the Creator.\n\nSilek movements are fluid, low-grounded, and rely on powerful footwork reminiscent of tiger movements (Silek Harimau). Silek is frequently featured in Randai folk theater and Pasambahan welcome dances as a symbol of agility, honor, and community protection.",
    philosophy: 'Lahir Silek Mencari Kawan, Batin Silek Mencari Tuhan (Ketangkasan fisik untuk persaudaraan)',
    philosophyEn: 'Outer Silek Seeks Friends, Inner Silek Seeks God (Physical agility dedicated to harmony)',
    origin: 'Pesisir & Dataran Tinggi Sumatera Barat',
    originEn: 'Coastline & Highlands of West Sumatra',
    imageUrl: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    lat: -0.950000,
    lng: 100.350000
  }
];

export const CULINARY_ITEMS: CulinaryItem[] = [
  {
    id: 'cu1',
    title: 'Rendang Daging',
    titleEn: 'Beef Rendang',
    type: 'Makanan Utama',
    typeEn: 'Main Course',
    origin: 'Minangkabau (Seluruh Sumbar)',
    originEn: 'Minangkabau (All West Sumatra)',
    description: "Rendang Daging adalah hidangan mahakarya kuliner Minangkabau yang telah dinobatkan sebagai salah satu makanan terlezat di dunia oleh CNN International. Masakan olahan daging sapi ini dimasak secara perlahan selama berjam-jam bersama santan kelapa kental dan racikan rempah-rempah otentik seperti lengkuas, serai, jahe, cabai, dan daun jeruk.\n\nProses memasak rendang melalui tiga tahapan penting: dimulainya dari gulai (kuah encer), bertransformasi menjadi kalio (kuah kental cokelat), hingga akhirnya mengering menjadi rendang berwarna hitam pekat yang kaya minyak rempah alami. Minyak rempah ini bertindak sebagai pengawet alami sehingga rendang dapat bertahan hingga berbulan-bulan tanpa bahan pengawet kimia.\n\nDalam adat Minangkabau, rendang memiliki kedudukan terhormat dan filosofi mendalam. Daging sapi melambangkan Niniak Mamak (pemimpin adat), santan melambangkan Cadiak Pandai (kaum intelektual), cabai melambangkan Alim Ulama (tokoh agama), dan racikan rempah melambangkan keseluruhan masyarakat Minang yang bersatu harmonis.",
    descriptionEn: "Beef Rendang is a culinary masterpiece of Minangkabau recognized internationally as one of the world's most delicious foods by CNN International. Tender beef cuts are slow-cooked for hours in coconut cream infused with authentic spices including galangal, lemongrass, ginger, chili, and kaffir lime leaves.\n\nThe cooking journey passes through three stages: starting as gulai (rich soup), reducing into kalio (thick brown curry), and finally drying into deep dark rendang glistened with natural aromatic oils. These spice oils act as natural preservatives, enabling rendang to stay fresh for months without chemical additives.\n\nWithin Minangkabau traditions, rendang holds an honored status and deep symbolism. The beef represents tribal elders, coconut cream represents intellectuals, chili symbolizes religious leaders, and the spice blend represents the unified Minang community.",
    flavorProfile: 'Gurih pekat, pedas lembut, kaya akan aroma rempah sangrai',
    flavorProfileEn: 'Deeply savory, mildly spicy, rich roasted spice aroma',
    imageUrl: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cu2',
    title: 'Sate Padang & Pariaman',
    titleEn: 'Sate Padang & Pariaman',
    type: 'Makanan Utama',
    typeEn: 'Main Course',
    origin: 'Padang, Padang Panjang & Pariaman',
    originEn: 'Padang, Padang Panjang & Pariaman',
    description: "Sate Padang adalah kuliner sate khas Sumatera Barat yang menyajikan potongan daging sapi, lidah, atau jeroan yang ditusuk rapi lalu dibakar di atas bara tempurung kelapa hingga harum aromatis. Yang membuat Sate Padang sangat istimewa terletak pada siraman kuah kental rempah berwarna kuning keemasan atau kemerahan yang melimpah.\n\nKuah Sate Padang dibuat dari kaldu sapi kental yang dicampur dengan puluhan jenis rempah tumbuk seperti kunyit, serai, ketumbar, jintan, dan tepung beras untuk menghasilkan tekstur kental yang gurih dan sedikit pedas hangat. Setiap variasi daerah memiliki ciri khas kuah sendiri, seperti Sate Padang Panjang dengan kuah kuning kecokelatan dan Sate Pariaman dengan kuah merah pedas.\n\nHidangan Sate Padang selalu disajikan panas di atas piring beralas daun pisang, dilengkapi dengan potongan ketupat lembut dan taburan bawang goreng renyah. Ditambah dengan kerupuk kulit (jangek) yang disiram kuah sate, hidangan ini menghadirkan ledakan rasa gurih dan pedas rempah yang sangat memanjakan lidah.",
    descriptionEn: "Sate Padang is West Sumatra's iconic beef satay featuring skewers of tender beef cuts, tongue, or offal grilled over coconut shell charcoal until aromatic. What sets Sate Padang apart is the generous pouring of thick, golden-yellow or reddish spice gravy over the skewers.\n\nThe gravy is prepared from rich beef stock thickened with rice flour and blended with dozens of freshly ground spices including turmeric, coriander, cumin, and lemongrass. Regional variations offer unique gravy profiles, such as Padang Panjang's savory golden sauce and Pariaman's fiery red sauce.\n\nSate Padang is served piping hot on banana leaf-lined plates accompanied by soft rice cakes (ketupat) and crispy fried shallots. Paired with crunchy beef skin crackers soaked in warm satay gravy, this dish delivers an irresistible burst of rich, savory spice flavors.",
    flavorProfile: 'Pedas rempah hangat, gurih kaldu sapi kental, krispi bawang goreng',
    flavorProfileEn: 'Warm spicy, rich savory beef broth, crispy shallots',
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cu3',
    title: 'Teh Talua (Teh Telur Khas Minang)',
    titleEn: 'Teh Talua (Traditional Minang Egg Tea)',
    type: 'Minuman Tradisional',
    typeEn: 'Traditional Drink',
    origin: 'Lapau Kedai Tradisional Minangkabau',
    originEn: 'Traditional Minangkabau Coffee Shops',
    description: "Teh Talua (Teh Telur) adalah minuman hangat khas Minangkabau yang legendaris, dikenal sebagai peningkat stamina dan minuman kebanggaan para pria Minang saat berkumpul di lapau (kedai kopi tradisional). Minuman unik ini mengombinasikan kocokan kuning telur ayam kampung atau telur bebek dengan seduhan teh hitam pekat yang mendidih.\n\nProses pembuatannya membutuhkan keahlian khusus: kuning telur dikocok bersama gula pasir menggunakan lidi hingga mengembang halus dan berwarna krem pucat. Ketika teko berisi teh hitam pekat mendidih disiramkan ke dalam gelas, kocokan telur secara ajaib membentuk empat tingkatan lapisan warna cantik yang menggugah selera.\n\nTeh Talua disajikan hangat dengan perasan jeruk nipis segar yang berfungsi menghilangkan bau amis telur sekaligus memberikan sentuhan rasa segar. Sensasi rasa creamy, manis, gurih, dan sedikit asam hangat menjadikan Teh Talua minuman penutup malam yang sempurna saat menikmati dinginnya udara Sumatera Barat.",
    descriptionEn: "Teh Talua (Minang Egg Tea) is a legendary warm beverage from West Sumatra celebrated for boosting stamina and serving as the signature drink enjoyed at traditional lapau (coffee shops). This unique drink combines whisked egg yolk with boiling, concentrated black tea.\n\nPreparing it requires practiced technique: free-range chicken or duck egg yolk is vigorously whisked with sugar using a wooden whisk until forming a light, creamy foam. When scalding hot black tea is poured into the glass, the mixture magically separates into distinct, eye-catching layers.\n\nTeh Talua is served hot with a squeeze of fresh lime juice to neutralize any egginess while adding a bright zest. The combination of creamy, sweet, savory, and zesty warm flavors makes Teh Talua the ultimate cozy nightcap in West Sumatra.",
    flavorProfile: 'Creamy, manis hangat, sedikit asam zesty jeruk nipis',
    flavorProfileEn: 'Creamy, sweet warm, lightly tangy with fresh lime',
    imageUrl: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'cu4',
    title: 'Lamang Tapai',
    titleEn: 'Lamang Tapai',
    type: 'Kudapan Khas',
    typeEn: 'Traditional Snack',
    origin: 'Tanah Datar & Payakumbuh',
    originEn: 'Tanah Datar & Payakumbuh',
    description: "Lamang Tapai adalah kombinasi kudapan tradisional Minangkabau yang menyajikan perpaduan rasa gurih dan manis-asam yang sangat unik dan lezat. Lamang terbuat dari beras ketan putih yang dimasak bersama santan kelapa di dalam ruas bambu muda yang dilapisi daun pisang, lalu dipanggang perlahan di atas bara api kayu bakar.\n\nSementara itu, Tapai adalah beras ketan hitam yang difermentasi menggunakan ragi tradisional hingga menghasilkan tekstur lembut berair dengan rasa manis-asam segar yang khas. Saat disajikan, potongan lamang gurih beraroma bambu disiram dengan beberapa sendok tapai ketan hitam berkuah manis.\n\nKudapan legendaris ini selalu hadir pada perayaan hari besar keagamaan seperti Idul Fitri, Idul Adha, serta dalam acara-acara adat pernikahan Minangkabau. Lamang Tapai bukan sekadar kuliner lezat, melainkan simbol kehangatan silaturahmi dan kebersamaan keluarga di Ranah Minang.",
    descriptionEn: "Lamang Tapai is a traditional Minangkabau snack combination offering a delightfully unique blend of savory and sweet-sour flavors. Lamang is made from white glutinous rice cooked with coconut milk inside young bamboo tubes lined with banana leaves, slowly roasted over wood fire coals.\n\nTapai is fermented black glutinous rice prepared with traditional yeast, resulting in a soft, juicy texture with a refreshing sweet-tangy taste. To serve, slices of savory, bamboo-scented lamang are generously topped with spoonfuls of juicy black tapai.\n\nThis cherished delicacy is an indispensable treat during Eid celebrations and Minangkabau wedding ceremonies. Lamang Tapai represents more than great taste; it symbolizes warm hospitality and family togetherness in West Sumatra.",
    flavorProfile: 'Gurih santan beraroma bambu dipadu manis-asam segar ketan hitam',
    flavorProfileEn: 'Savory coconut bamboo scent fused with sweet-tangy fermented rice',
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=80'
  }
];

export const DOWNLOAD_ITEMS: DownloadItem[] = [
  {
    id: 'dl1',
    title: 'Panduan Wisata Sumatera Barat 2026',
    titleEn: 'West Sumatra Tourism Guide 2026',
    category: 'Buku Panduan',
    categoryEn: 'Guidebook',
    type: 'PDF',
    typeEn: 'PDF',
    size: '5.2 MB',
    description: 'Panduan lengkap berisi rekomendasi destinasi, kuliner, dan tips perjalanan.',
    descriptionEn: 'Comprehensive guide with destination recommendations, culinary options, and travel tips.',
    filename: 'panduan-wisata-sumbar.pdf',
    content: 'data:application/pdf;base64,JVBERi0xLjQKJ...', // mock
    mimeType: 'application/pdf'
  }
];

export const EVENTS_SCHEDULE: EventItem[] = [
  {
    id: 'ev1',
    title: 'PACU JAWI (ATRAKSI BALAP SAPI LUMPUR)',
    titleEn: 'PACU JAWI (MUD BULL RACE ATTRACTION)',
    schedule: 'Setiap Akhir Pekan (Bergilir)',
    scheduleEn: 'Every Weekend (Rotational)',
    location: 'Sawah Nagari Tanah Datar (Sungai Tarab, Pariangan, Rambatan)',
    locationEn: 'Tanah Datar Rice Fields (Sungai Tarab, Pariangan, Rambatan)',
    description: "Pacu Jawi adalah tradisi permainan anak nagari yang sangat spektakuler di Kabupaten Tanah Datar, digelar sebagai bentuk perayaan rasa syukur para petani setelah musim panen padi selesai. Atraksi budaya ini menyajikan pertunjukan ekstrem di mana seorang joki berdiri memegang ekor dua ekor sapi jantan yang berlari kencang membelah arena sawah basah yang penuh dengan lumpur pekat.\n\nKeunikan utama Pacu Jawi adalah joki berlari tanpa menggunakan cambuk atau alat pemukul sama sekali. Untuk memacu kecepatan dan mengarahkan sapi agar berlari lurus, joki secara unik menggigit ekor sapi tersebut sambil menjaga keseimbangan tubuhnya di atas papan kayu pembajak sawah (singkal).\n\nPerhelatan Pacu Jawi menjadi surga bagi para fotografer aksi dan wisatawan mancanegara karena menghasilkan momen visual yang sangat dramatis dengan cipratan lumpur kecokelatan. Di sekitar arena, suasana semakin semarak dengan iringan musik tradisional, pasar kaget jajanan lokal, serta pameran sapi-sapi unggulan nagari.",
    descriptionEn: "Pacu Jawi is a spectacular traditional event in Tanah Datar Regency, held as a joyous community celebration following the completion of the rice harvest. This thrilling cultural spectacle features a daring jockey standing upright while holding the tails of two bulls sprinting at full speed through a flooded, muddy rice paddy field.\n\nThe extraordinary hallmark of Pacu Jawi is that jockeys race completely without whips or sticks. To accelerate and steer the bulls straight ahead, jockeys uniquely bite the animals' tails while expertly balancing their feet on traditional wooden plow frames (singkal).\n\nPacu Jawi is an absolute paradise for action photographers and international travelers, offering dramatic visual moments captured amidst flying muddy splashes. Surrounding the muddy arena, the festive atmosphere comes alive with traditional music, lively local snack markets, and parades of prized nagari cattle.",
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    lat: -0.450000,
    lng: 100.510000,
  },
  {
    id: 'ev2',
    title: 'FESTIVAL TOUR DE SINGKARAK',
    titleEn: 'TOUR DE SINGKARAK FESTIVAL',
    schedule: 'Tahunan (Oktober / November)',
    scheduleEn: 'Annual (October / November)',
    location: 'Lintas Kabupaten/Kota Sumatera Barat',
    locationEn: 'Across West Sumatra Regencies & Cities',
    description: "Tour de Singkarak (TdS) adalah kejuaraan balap sepeda jalan raya internasional bergengsi tingkat dunia yang terdaftar resmi dalam kalender Union Cycliste Internationale (UCI). Ajang ini menggabungkan kompetisi olahraga sepeda tingkat tinggi dengan promosi keindahan kebudayaan dan pesona pariwisata Sumatera Barat.\n\nRute balapan melintasi puluhan kabupaten dan kota dengan lanskap geografis yang sangat memukau, mulai dari tepian Danau Singkarak, kelokan tajam Kelok 44 yang melegenda, tebing-tebing granit Lembah Harau, hingga hamparan kebun teh yang hijau di kaki Gunung Talang. Para pembalap profesional dari berbagai benua menguji ketahanan fisik mereka di jalur tanjakan ekstrem yang menantang.\n\nDi sepanjang jalur yang dilalui, ribuan warga lokal dan pelajar menyambut para pembalap dengan kibaran bendera dan sorak-sorai meriah. Festival ini juga dimeriahkan dengan panggung hiburan rakyat, pameran UMKM kuliner Minang, serta pergelaran musik dan tari tradisional di setiap garis finis etape.",
    descriptionEn: "Tour de Singkarak (TdS) is a prestigious international road cycling championship officially registered on the Union Cycliste Internationale (UCI) calendar. This event seamlessly fuses elite cycling competition with the promotion of West Sumatra's vibrant culture and breathtaking natural landscapes.\n\nThe race route weaves through dozens of regencies and cities featuring incredible geography, from the shores of Lake Singkarak and the legendary 44 sharp bends of Kelok 44 to the towering granite cliffs of Harau Valley and lush tea plantations at Mount Talang. Professional cyclists from all continents test their endurance on challenging, extreme mountain climbs.\n\nAlong the race corridors, thousands of cheering locals and students line the streets waving flags in celebration. The festival is further enriched with live cultural stages, Minang culinary exhibitions, and traditional music and dance showcases at every stage finish line.",
    imageUrl: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
    lat: -0.616667,
    lng: 100.533333,
  },
  {
    id: 'ev3',
    title: 'FESTIVAL TABUIK PARIAMAN',
    titleEn: 'PARIAMAN TABUIK FESTIVAL',
    schedule: '1 - 10 Muharram',
    scheduleEn: '1st - 10th Muharram',
    location: 'Kota Pariaman & Pantai Gandoriah',
    locationEn: 'Pariaman City & Gandoriah Beach',
    description: "Festival Tabuik Pariaman adalah upacara tradisi kolosal kebudayaan masyarakat pesisir Pariaman yang diselenggarakan setiap tahun untuk memperingati Hari Asyura (10 Muharram). Festival ini menampilkan dua buah bangunan menara bertingkat megah yang disebut 'Tabuik', dihiasi ukiran kain tenun, kertas warna-warni, serta patung burung Bouraq bertubuh kuda bersayap.\n\nSelama sepuluh hari perhelatan, serangkaian ritual adat sakral dilaksanakan, seperti mengambil tanah (mambuang tanah), menebang batang pisang (maatam), hingga mengarak menara Tabuik seberat ratusan kilogram yang digoyang-goyangkan oleh puluhan pemuda perkasa di tengah pusat kota diiringi tabuhan gandang tasa yang membakar semangat.\n\nPuncak perayaan terjadi menjelang matahari terbenam di Pantai Gandoriah, saat puluhan ribu pengunjung berkumpul menyaksikan prosesi 'Hoyak Tabuik' sebelum akhirnya kedua menara megah dilarung ke tengah lautan lepas. Momen pelarungan ini melambangkan pembersihan diri dan pembuangan segala keburukan untuk menyambut tahun baru dengan kesucian.",
    descriptionEn: "The Pariaman Tabuik Festival is a colossal traditional cultural ceremony celebrated annually by Pariaman's coastal community during Ashura (10th of Muharram). The festival features two towering, ornate decorative structures known as 'Tabuik', adorned with handwoven fabrics, colorful decorations, and statues of the mythical Bouraq.\n\nOver ten days, a series of sacred rituals take place, including gathering earth, cutting banana stalks, and parading the heavy Tabuik towers through the city center, vigorously swayed by dozens of strong local youths to the thunderous rhythm of traditional gandang tasa drums.\n\nThe festival reaches its breathtaking climax at sunset along Gandoriah Beach, where tens of thousands gather to witness the 'Hoyak Tabuik' before both grand towers are immersed into the ocean. This immersion symbolizes spiritual purification and casting away negativity to welcome a fresh year.",
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    lat: -0.625000,
    lng: 100.120000,
  },
  {
    id: 'ev4',
    title: 'FESTIVAL MAANTA SANI & PACU ITIK',
    titleEn: 'PACU ITIK DUCK FLYING RACE FESTIVAL',
    schedule: 'Juli - Agustus',
    scheduleEn: 'July - August',
    location: 'Payakumbuh & Kabupaten Limapuluh Kota',
    locationEn: 'Payakumbuh & Limapuluh Kota Regency',
    description: "Festival Pacu Itik adalah tradisi perlombaan olahraga unik yang sangat langka di dunia, diselenggarakan secara bergilir di berbagai gelanggang sawah dan gelanggang alam di Kota Payakumbuh dan Kabupaten Limapuluh Kota. Berbeda dengan lomba biasa, perlombaan ini menampilkan keahlian terbang burung itik betina lokal yang dilatih khusus oleh para peternak.\n\nItik-itik pilihan yang diperlombakan dilepaskan oleh pemiliknya dari garis start untuk terbang melayang di udara melintasi jarak lintasan mulai dari 800 meter hingga 2.000 meter menuju garis finis yang ditentukan. Kecepatan dan ketepatan mendarat itik di garis finis menjadi penentu kemenangan dalam perlombaan sengit ini.\n\nAcara ini dipadukan dengan pesta kesenian Maanta Sani yang menyajikan pameran kuliner olahan bebek khas Minang, seni Tari Piring, serta pasar kerajinan tangan lokal. Festival Pacu Itik selalu menjadi magnet daya tarik bagi wisatawan yang ingin menyaksikan keunikan tradisi masyarakat rural Sumatera Barat.",
    descriptionEn: "The Pacu Itik Festival is an extraordinarily unique traditional racing event, rotated across scenic natural arenas in Payakumbuh and Limapuluh Kota Regency. Unlike typical animal races, this competition showcases the flying prowess of local female ducks specially trained by local farmers.\n\nThe prized racing ducks are launched into the air by their handlers at the start line, gliding majestically over distances ranging from 800 to 2,000 meters toward a designated finish line. The duck's flight speed and landing accuracy at the finish line determine the champion.\n\nThis event is complemented by the Maanta Sani cultural celebration featuring Minang duck culinary exhibitions, Tari Piring performances, and handicraft markets. Pacu Itik consistently attracts travelers seeking one-of-a-kind rural traditions in West Sumatra.",
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    lat: -0.220000,
    lng: 100.630000,
  },
  {
    id: 'ev5',
    title: 'MENTAWAI PRO SURFING CHAMPIONSHIP',
    titleEn: 'MENTAWAI PRO SURFING CHAMPIONSHIP',
    schedule: 'Agustus - September',
    scheduleEn: 'August - September',
    location: 'Pulau Sipora & Siberut, Kepulauan Mentawai',
    locationEn: 'Sipora & Siberut Island, Mentawai Archipelago',
    description: "Mentawai Pro Surfing Championship adalah kejuaraan selancar ombak internasional tingkat dunia yang diadakan di gugusan Kepulauan Mentawai, salah satu destinasi selancar tropis terbaik di planet bumi. Kepulauan Mentawai dikenal memiliki gulungan ombak konsisten berkelas dunia yang memikat peselancar profesional internasional.\n\nKompetisi ini menantang para peselancar dunia untuk menaklukkan gulungan ombak tabung sempurna di spot-spot legendaris seperti HTs (Hollow Trees/Lance's Right), Macaronis, dan Telescopes. Kejernihan air laut yang bening dan latar belakang hutan tropis yang perawan memberikan lanskap arena pertandingan yang sangat memukau.\n\nSelain ajang olahraga ekstrem, kejuaraan ini juga menjadi ajang pertukaran budaya dengan suku asli Mentawai. Wisatawan dapat menyaksikan tarian tradisional Turuk Laggai, mempelajari seni tato tertua Mentawai, serta menikmati keindahan terumbu karang bawah laut yang masih terjaga alami.",
    descriptionEn: "The Mentawai Pro Surfing Championship is a world-class international surfing tournament held in the Mentawai Archipelago, acclaimed as one of the ultimate tropical surfing destinations on Earth. Mentawai is renowned for its world-class, consistent wave barrels attracting top professional surfers.\n\nThis championship challenges global surfers to conquer perfect tube waves at legendary breaks including HTs (Hollow Trees/Lance's Right), Macaronis, and Telescopes. The crystal-clear turquoise waters backed by untouched tropical rainforests provide a breathtaking competitive backdrop.\n\nBeyond extreme sports, the event fosters rich cultural exchanges with indigenous Mentawai tribes. Visitors can witness traditional Turuk Laggai dances, learn about ancient Mentawai tattooing arts, and explore pristine coral reefs teeming with marine life.",
    imageUrl: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80',
    lat: -2.133333,
    lng: 99.550000,
  },
  {
    id: 'ev6',
    title: 'SAWAHLUNTO INTERNATIONAL SONGKET CARNIVAL (SISCA)',
    titleEn: 'SAWAHLUNTO INTERNATIONAL SONGKET CARNIVAL',
    schedule: 'September',
    scheduleEn: 'September',
    location: 'Kota Tua Sawahlunto',
    locationEn: 'Sawahlunto Heritage Old Town',
    description: "Sawahlunto International Songket Carnival (SISCA) adalah perhelatan karnaval busana mode berskala internasional yang diselenggarakan di Kota Tua Sawahlunto, sebuah situs warisan dunia UNESCO yang terkenal dengan arsitektur kolonial bekas tambang batu bara. Festival ini mengangkat pesona keindahan kain tenun Songket Silungkang khas daerah setempat.\n\nRatusan perancang busana muda, peragawan, dan masyarakat umum tampil anggun dalam balutan kostum-kostum megah bernuansa songket di sepanjang jalan-jalan bersejarah kota tua. Perpaduan antara kemewahan benang emas songket dan lanskap arsitektur bangunan tua abad ke-19 memberikan atmosfer visual yang sangat artistik.\n\nSelain peragaan busana, SISCA dimeriahkan dengan pameran alat tenun tradisional, lokakarya menenun bagi pengunjung, kompetisi fotografi internasional, serta bazar produk-produk kerajinan songket unggulan hasil karya pengrajin lokal.",
    descriptionEn: "The Sawahlunto International Songket Carnival (SISCA) is an international fashion extravaganza hosted within Sawahlunto's UNESCO World Heritage Old Town, famous for its 19th-century industrial coal mining architecture. The carnival celebrates the exquisite craftsmanship of local Silungkang songket textiles.\n\nHundreand fashion designers, models, and community members parade elegantly along historic cobblestone streets dressed in majestic songket-themed haute couture. The juxtaposition of shimmering golden songket threads against 19th-century colonial brickwork creates an extraordinarily artistic setting.\n\nIn addition to fashion parades, SISCA features live traditional loom exhibitions, hands-on weaving workshops for visitors, international photography contests, and vibrant artisan marketplaces.",
    imageUrl: 'https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&w=800&q=80',
    lat: -0.681111,
    lng: 100.783333,
  },
  {
    id: 'ev7',
    title: 'FESTIVAL MINANG HERITAGE & JAM GADANG',
    titleEn: 'MINANG HERITAGE & JAM GADANG FESTIVAL',
    schedule: 'Juni (Minggu ke-2)',
    scheduleEn: 'June (2nd Week)',
    location: 'Pelataran Jam Gadang Bukittinggi',
    locationEn: 'Jam Gadang Plaza, Bukittinggi',
    description: "Festival Minang Heritage & Jam Gadang adalah pesta rakyat dan perayaan seni budaya tahunan yang memusatkan kegiatannya di pelataran ikonik Jam Gadang, Kota Bukittinggi. Festival ini bertujuan untuk melestarikan serta mengenalkan kekayaan khazanah budaya Minangkabau kepada generasi muda dan wisatawan nusantara maupun mancanegara.\n\nAcara puncak festival dimeriahkan oleh atraksi spektakuler Tari Piring kolosal yang dibawakan secara serentak oleh lebih dari 1.000 penari berbusana adat lengkap Minang. Suara detakan piring dan dentuman alat musik Talempong bergema memenuhi pelataran kota, menciptakan suasana magis yang sangat menggelora.\n\nSepanjang festival, pengunjung dapat menikmati parade busana tradisional Minang, pagelaran musik alunan Saluang dan Rabab, pertunjukan Seni Randai malam hari, serta wisata jajanan pasar tradisional khas Bukittinggi yang disajikan melimpah di sekitar lokasi.",
    descriptionEn: "The Minang Heritage & Jam Gadang Festival is an annual cultural celebration centered around the iconic Jam Gadang plaza in Bukittinggi. The festival aims to preserve and showcase the vast richness of Minangkabau heritage to younger generations and travelers worldwide.\n\nThe crowning moment features a colossal Tari Piring performance presented simultaneously by over 1,000 dancers adorned in traditional Minang attire. The synchronized clinking of porcelain plates and Talempong rhythms resonate through the city plaza, creating an electrifying atmosphere.\n\nThroughout the festival, visitors enjoy Minang fashion parades, soulful Saluang and Rabab musical performances, evening Randai folk theater, and traditional street food markets lining the plaza.",
    imageUrl: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
    lat: -0.304987,
    lng: 100.369434,
  },
  {
    id: 'ev8',
    title: 'FESTIVAL MATRILINEAL & MAKAN BAJAMBA MASSAL',
    titleEn: 'MATRILINEAL FESTIVAL & MASS MAKAN BAJAMBA',
    schedule: 'November',
    scheduleEn: 'November',
    location: 'Istano Basa Pagaruyung, Tanah Datar',
    locationEn: 'Pagaruyung Palace, Tanah Datar',
    description: "Festival Matrilineal & Makan Bajamba Massal adalah perhelatan kebudayaan agung yang diselenggarakan di halaman Istano Basa Pagaruyung, Kabupaten Tanah Datar. Festival ini digelar sebagai penghormatan terhadap keunikan sistem kekerabatan Matrilineal Minangkabau yang merupakan salah satu sistem matrilineal terbesar yang masih aktif di dunia.\n\nProsesi utama acara ini adalah tradisi Makan Bajamba massal, yaitu tradisi makan bersama secara lesehan yang membentang sepanjang ratusan meter. Ribuan peserta dan wisatawan yang mengenakan busana adat Minang duduk melingkar mengelilingi nampan-nampan berisi aneka masakan khas seperti Rendang, Gulai Ayam, Sambal Lado Tanak, dan Lamang.\n\nTradisi Makan Bajamba mengajarkan nilai-nilai luhur kebersamaan, kesetaraan tanpa memandang status sosial, rasa hormat kepada yang lebih tua, serta kedisiplinan tatakrama saat menyantap hidangan. Acara disempurnakan dengan arakan Bundo Kanduang menjunjung jamba di atas kepala dan pertunjukan seni musik tradisional.",
    descriptionEn: "The Matrilineal Festival & Mass Makan Bajamba is a grand cultural assembly held across the grounds of Istano Basa Pagaruyung, Tanah Datar Regency. The festival honors Minangkabau's unique Matrilineal kinship system, celebrated as one of the largest active matrilineal societies in the world.\n\nThe centerpiece is the mass Makan Bajamba feast, where thousands sit together in long rows stretching hundreds of meters. Clad in vibrant traditional Minang costumes, participants sit in circles sharing trays laden with authentic culinary treasures including Rendang, Chicken Gulai, and Lamang.\n\nThe Makan Bajamba tradition imparts noble values of unity, social equality, respect for elders, and refined dining etiquette. The festival is crowned with a grand procession of Bundo Kanduang mothers carrying food trays balanced gracefully on their heads.",
    imageUrl: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
    lat: -0.471111,
    lng: 100.621111,
  }
];
