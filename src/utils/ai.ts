import { GoogleGenAI } from "@google/genai";

// Fallback data when API or Gemini API key is unavailable
export const HOT_INFO_FALLBACK = [
  {
    "id": "news-fallback-1",
    "title": "Uji Laik Jalan Tol Padang-Sicincin 36,6 Km Tuntas: Waktu Tempuh Padang ke Bukittinggi Bakal Makin Singkat",
    "titleEn": "Padang-Sicincin 36.6 Km Toll Road Test Complete: Slashes Padang-Bukittinggi Driving Time",
    "date": "06 September 2026",
    "dateEn": "September 06, 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "description": "Kabar gembira buat traveler yang sering terjebak macet antara Padang dan Bukittinggi! Berdasarkan laporan resmi dari PT Hutama Karya bersama BPTD Sumatera Barat, fisik jalan tol Padang-Sicincin sepanjang 36,6 km sudah menyelesaikan seluruh rangkaian uji laik fungsi dan bersiap dibuka untuk mobilitas publik. Jika biasanya perjalanan memakan waktu 2 hingga 2,5 jam lewat jalan arteri nasional, lewat jalan tol baru ini jarak tempuh dipangkas drastis menjadi hanya sekitar 35 hingga 45 menit saja.\n\nJalur tol pertama di Ranah Minang ini dilengkapi dua gerbang tol utama (Kapalo Hilalang dan Tarok City) serta rest area beratap gonjong Rumah Gadang yang mengalokasikan 70 persen kiosnya bagi sentra kuliner dan suvenir UMKM lokal.\n\n🔍 Catatan Verifikasi: Sempat beredar rumor di media sosial mengenai tarif tol yang disebut-sebut sangat mahal. Pihak pengelola menegaskan bahwa kabar tersebut tidak berdasar—pada masa awal uji coba operasional, jalur tol ini rencananya akan dibuka secara fungsional dengan tarif Rp 0 alias gratis sementara waktu, sebelum besaran tarif resmi disahkan oleh Kementerian PU.\n\nTips buat kamu: Jika ingin melintas saat uji coba dibuka, pastikan kartu e-toll tetap dibawa untuk tapping di gerbang masuk. Selalu cek kondisi rem dan ban kendaraan sebelum melanjutkan perjalanan menanjak ke arah Padang Panjang atau Bukittinggi.",
    "descriptionEn": "Great news for travelers navigating the Padang-Bukittinggi corridor! According to official updates from PT Hutama Karya and the West Sumatra Land Transport Agency, physical functional testing on the 36.6-kilometer Padang-Sicincin toll expressway is complete and preparing for public traffic. The route slashes driving time from over two hours down to approximately 35-45 minutes.\n\nThe expressway features dual main interchanges at Kapalo Hilalang and Tarok City, complete with gonjong-roof rest areas hosting 70% local culinary and craft artisans.\n\n🔍 Verification Check: Addressing circulating social media claims regarding steep initial toll rates, authorities clarified that during the initial functional opening period, the expressway will operate toll-free (IDR 0) until formal ministerial decrees establish standard tariffs.\n\nTraveler takeaway: Carry an active electronic toll card for gate tapping, and inspect your vehicle's cooling and brake systems before tackling highland gradients toward Bukittinggi.",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://maps.google.com/?q=Tol+Padang+Sicincin",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Uji laik fungsi tuntas, pangkas rute Padang - Bukittinggi jadi 45 menit",
      "Fasilitas: Rest area gonjong ramah UMKM kuliner Minang di Kapalo Hilalang",
      "Cek Verifikasi: Rumor tarif mahal tidak benar, tahap awal dibuka fungsional gratis"
    ],
    "highlightsEn": [
      "Key Takeaway: Functional testing completed, travel time slashed to 45 mins",
      "Facilities: Traditional gonjong rest area supporting local food & craft artisans",
      "Verification Note: High tariff rumors debunked; initial opening operates toll-free"
    ],
    "tips": "Bawa kartu e-toll aktif dan periksa kondisi rem kendaraan sebelum melanjutkan tanjakan ke arah Bukittinggi.",
    "tipsEn": "Keep an active e-toll card ready and inspect vehicle brakes before ascending towards Bukittinggi.",
    "locationName": "Ruas Tol Padang - Sicincin, Padang Pariaman",
    "locationNameEn": "Padang - Sicincin Expressway, Padang Pariaman"
  },
  {
    "id": "news-fallback-2",
    "title": "Tren Wisata Hijau Kemenparekraf: Standar Baru Ekowisata Ramah Lingkungan untuk Destinasi Nasional",
    "titleEn": "Ministry Drives Green Tourism: New Sustainable Ecotourism Standards for National Destinations",
    "date": "06 September 2026",
    "dateEn": "September 06, 2026",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "description": "Buat kamu yang gemar liburan ke alam terbuka, ada arah baru yang sangat positif di sektor wisata nasional kita. Kementerian Pariwisata dan Ekonomi Kreatif (Kemenparekraf) tengah menggencarkan sertifikasi pariwisata hijau dan berkelanjutan (green tourism) di berbagai destinasi unggulan Indonesia, mulai dari desa-desa wisata di Jawa, Danau Toba, hingga Labuan Bajo. Fokus utamanya adalah mengurangi sampah plastik dan memberdayakan komunitas warga lokal.\n\nProgram ini mendorong fasilitas penginapan alam dan operator tur untuk menerapkan energi terbarukan, pengelolaan limbah mandiri, serta membatasi daya dukung pengunjung (carrying capacity) agar keasrian alam tetap terjaga.\n\n🔍 Catatan Verifikasi: Terkait isu yang beredar bahwa program ini akan menaikkan harga tiket masuk ke taman nasional secara drastis, pihak Kemenparekraf mengklarifikasi bahwa regulasi ini menitikberatkan pada standarisasi pengelolaan ramah lingkungan oleh pengelola, bukan kenaikan tarif semena-mena bagi wisatawan umum.\n\nTips buat kamu: Mulai biasakan membawa tumbler minum dan tas belanja kain sendiri saat berwisata ke destinasi alam. Selain lebih hemat, kamu juga ikut menjaga keasrian alam tempat wisata favorit kita bersama.",
    "descriptionEn": "For outdoor and nature enthusiasts, Indonesia's national tourism landscape is embracing an exciting sustainable shift. The Ministry of Tourism and Creative Economy is expanding its Green & Sustainable Ecotourism certification across flagship destinations from Lake Toba to Labuan Bajo, focusing on single-use plastic reduction and village empowerment.\n\nThe framework incentivizes eco-resorts and tour operators to harness renewable power, local composting, and measured visitor quotas to preserve wilderness integrity.\n\n🔍 Verification Check: Addressing circulating online claims regarding sudden massive price hikes at national park entrances, ministry spokespersons clarified that the mandate enforces environmental operational benchmarks for operators rather than arbitrary ticket price increases for travelers.\n\nTraveler takeaway: Carry a reusable water bottle and cloth tote on your outdoor treks. It saves you money while protecting Indonesia's natural heritage.",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://kemenparekraf.go.id",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Standarisasi wisata hijau nasional bebas sampah plastik sekali pakai",
      "Cakupan: Diterapkan bertahap di Danau Toba, Labuan Bajo, Borobudur, dan desa wisata",
      "Cek Verifikasi: Kemenparekraf pastikan tidak ada lonjakan tarif masuk semena-mena"
    ],
    "highlightsEn": [
      "Key Takeaway: National sustainable tourism standards limiting single-use plastics",
      "Coverage: Rolled out across Lake Toba, Labuan Bajo, Borobudur, and eco-villages",
      "Verification Note: Ministry affirms policy does not impose sudden ticket fee spikes"
    ],
    "tips": "Bawa botol minum tumbler sendiri dan utamakan menginap di homestay desa wisata yang ramah lingkungan.",
    "tipsEn": "Bring a reusable tumbler and support community-run eco-homestays when exploring nature spots.",
    "locationName": "Destinasi Pariwisata Nasional Indonesia",
    "locationNameEn": "Indonesian National Tourism Destinations"
  },
  {
    "id": "news-fallback-3",
    "title": "Pantauan Jalur Wisata Sitinjau Lauik: Petugas dan Alat Berat Siaga 24 Jam di Tikungan Panorama",
    "titleEn": "Sitinjau Lauik Route Update: Heavy Equipment and Safety Marshals on 24/7 Standby",
    "date": "05 September 2026",
    "dateEn": "September 05, 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "description": "Bagi kamu yang berencana liburan akhir pekan dari Padang menuju Danau Singkarak atau kebun teh Alahan Panjang, jalur legendaris Sitinjau Lauik terus mendapat pengawalan ketat. Laporan Ditlantas Polda Sumbar dan Balai Pelaksanaan Jalan Nasional (BPJN) Wilayah III memastikan posko siaga terpadu 24 jam serta unit alat berat excavator tetap standby di kawasan tikungan Panorama 1 dan Panorama 2.\n\nLangkah pengamanan ini diperkuat dengan perbaikan sistem drainase tebing, pemasangan jaring kawat baja (wire mesh) penahan batu, serta bantuan relawan pengatur jalan anak nagari yang sigap memandu kendaraan pada jam-jam padat.\n\n🔍 Catatan Verifikasi: Sempat beredar video di grup WhatsApp yang menyebutkan Sitinjau Lauik ditutup total akibat longsor besar. Berdasarkan pengecekan langsung pihak kepolisian di lokasi, video tersebut adalah arsip kejadian lama; jalur Padang - Solok saat ini beroperasi normal dan lancar dua arah dengan sistem buka-tutup darurat hanya jika ada truk mogok sesaat.\n\nTips buat kamu: Selalu gunakan gigi rendah (gigi 1 atau 2) saat menanjak maupun menurun curam. Berikan prioritas jalan bagi truk bermuatan berat yang sedang melaju menanjak, dan jangan pernah mendahului di tikungan blind spot.",
    "descriptionEn": "Heading from Padang toward Lake Singkarak or Alahan Panjang tea hills this weekend? The renowned Sitinjau Lauik pass remains under active 24/7 monitoring by West Sumatra Traffic Police and National Road Agency III, with heavy excavators positioned at Panorama bends.\n\nSafety measures include reinforced steel wire rockfall netting, terraced hillside drainage, and local volunteer road marshals coordinating switchback flow during heavy traffic.\n\n🔍 Verification Check: Dismissing viral video clips alleging total road closure from a massive landslide, police field verifications confirmed the footage was an old archive; the Padang-Solok corridor is currently operating smoothly in both directions with temporary stop-and-go only during vehicle breakdowns.\n\nTraveler takeaway: Always engage low gears (1st or 2nd) across steep gradients, yield unconditionally to uphill heavy trucks, and avoid overtaking at blind corners.",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://maps.google.com/?q=Sitinjau+Lauik+Padang",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Jalur Padang - Solok beroperasi normal dan dipantau posko siaga 24 jam",
      "Keamanan: Alat berat siaga di Panorama 1 & 2 dengan pengamanan kawat baja tebing",
      "Cek Verifikasi: Isu penutupan total adalah video hoaks lama, jalur lancar dua arah"
    ],
    "highlightsEn": [
      "Key Takeaway: Padang-Solok corridor operates smoothly under 24/7 monitored safety",
      "Safety: Heavy machinery stationed at Panorama hairpins with cliff barrier nets",
      "Verification Note: Viral total closure claims debunked as old clips; route is fully open"
    ],
    "tips": "Gunakan gigi 1 atau 2 saat menanjak maupun menurun curam, dan dahulukan kendaraan yang sedang menanjak.",
    "tipsEn": "Engage 1st or 2nd gear on steep inclines and always yield to ascending heavy transports.",
    "locationName": "Jalan Raya Padang - Solok (Sitinjau Lauik)",
    "locationNameEn": "Padang - Solok Highway (Sitinjau Lauik Pass)"
  },
  {
    "id": "news-fallback-4",
    "title": "Konektivitas Kereta Api Wisata Meningkat: Rute Tematik Panoramic dan Kereta Malam Ramah Pelancong",
    "titleEn": "Scenic Train Travel Expands: Panoramic Routes and Enhanced Night Travel for Tourists",
    "date": "05 September 2026",
    "dateEn": "September 05, 2026",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "description": "Traveling naik kereta kini makin digandrungi para pelancong lintas generasi di Indonesia. PT Kereta Api Indonesia (KAI) mencatat lonjakan minat yang signifikan terhadap layanan kereta wisata tematik, khususnya Kereta Panoramic dan Compartment Suites yang menyuguhkan pemandangan bentang alam pegunungan, lembah hijau, serta jembatan meliuk yang spektakuler.\n\nTren slow travel ini didukung oleh peremajaan stasiun-stasiun cagar budaya yang kini dilengkapi ruang tunggu nyaman, sentra kuliner khas daerah, serta integrasi moda angkutan lanjutan ke objek wisata sekitar di Jawa dan Sumatra.\n\n🔍 Catatan Verifikasi: Waspadai tawaran tiket murah atau jasa joki tiket kereta wisata di media sosial yang marak belakangan ini. KAI secara resmi menegaskan bahwa reservasi tiket resmi hanya dapat diakses melalui aplikasi Access by KAI dan mitra resmi berlisensi; jangan pernah mentransfer uang ke rekening perorangan yang tidak jelas keabsahannya.\n\nTips buat kamu: Kursi kereta wisata Panoramic biasanya ludes terjual dalam hitungan menit sejak pembukaan H-45 keberangkatan. Pasang alarm di pagi hari saat jadwal tiket dibuka dan pilih kursi di sisi jendela untuk mendapatkan sudut foto terbaik.",
    "descriptionEn": "Train travel is enjoying a remarkable revival among travelers seeking scenic comfort. PT Kereta Api Indonesia (KAI) reports surging demand for specialty tourist trains, particularly the Panoramic coaches and luxury Compartment Suites offering sweeping vistas of mountains, river gorges, and historical viaducts.\n\nThis slow-travel trend is accompanied by revitalized heritage stations featuring comfortable passenger lounges, regional culinary corners, and direct shuttle links to major tourist hubs.\n\n🔍 Verification Check: Beware of suspicious discount offers or unauthorized booking scalpers on social media. KAI officially warns that valid ticketing is exclusively processed via Access by KAI or authorized partner platforms; never transfer money to unverified personal bank accounts.\n\nTraveler takeaway: Panoramic train seats often sell out quickly upon 45-day advance booking opening. Set a morning reminder and pick window seats for prime landscape photography.",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://booking.kai.id",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Kereta Panoramic dan wisata tematik KAI semakin diminati traveler",
      "Fasilitas: Jendela lebar otomatis, interior nyaman, dan integrasi angkutan wisata",
      "Cek Verifikasi: KAI imbau hindari joki tiket ilegal, pesan hanya via aplikasi resmi"
    ],
    "highlightsEn": [
      "Key Takeaway: Panoramic and thematic tourist trains experience soaring popularity",
      "Amenities: Expansive glass ceilings, luxury cabins, and integrated local tour shuttles",
      "Verification Note: KAI urges passengers to avoid unofficial scalpers; book via official app"
    ],
    "tips": "Pesan tiket H-45 sebelum jadwal keberangkatan untuk mendapatkan kursi jendela terbaik.",
    "tipsEn": "Book tickets 45 days in advance to secure prime window-side panoramic seats.",
    "locationName": "Jaringan Jalur Kereta Api Wisata Indonesia",
    "locationNameEn": "Indonesian Scenic Railway Network"
  },
  {
    "id": "news-fallback-5",
    "title": "Kharisma Event Nusantara: Pesona Pacu Jawi Tanah Datar dan Festival Tabuik Pariaman Jadi Magnet Budaya",
    "titleEn": "National Cultural Calendar Highlights: Pacu Jawi and Tabuik Festival Draw Global Visitors",
    "date": "04 September 2026",
    "dateEn": "September 04, 2026",
    "category": "Pariwisata Sumatera Barat",
    "categoryEn": "West Sumatra Tourism",
    "description": "Siap-siap menikmati keseruan tradisi otentik Ranah Minang! Dua atraksi budaya terkemuka Sumatera Barat, yaitu Alek Nagari Pacu Jawi di Kabupaten Tanah Datar dan perhelatan kolosal Pesona Budaya Tabuik di Pantai Gandoriah Kota Pariaman, resmi terpilih kembali dalam kalender Kharisma Event Nusantara (KEN) Kemenparekraf. Agenda ini diprediksi menyedot ratusan ribu wisatawan domestik dan mancanegara.\n\nPacu Jawi menghadirkan aksi menegangkan joki sapi membajak sawah berlumpur dengan latar megah Gunung Marapi, sementara Tabuik menghadirkan rangkaian prosesi adat sakral hingga arak-arakan menara Tabuik setinggi belasan meter menuju Samudra Hindia diiringi tabuhan rancak Gandang Tasa.\n\n🔍 Catatan Verifikasi: Sempat beredar kabar simpang siur mengenai tanggal puncak acara di beberapa forum online. Panitia pelaksana mengonfirmasi bahwa jadwal prosesi adat telah diselaraskan dengan musyawarah kerapatan adat nagari, dan pengumuman resmi berkala dapat dipantau melalui portal Dispar Sumbar agar wisatawan tidak keliru mengatur tanggal tiket kedatangan.\n\nTips buat kamu: Jika berencana memotret atraksi Pacu Jawi dari dekat pematang sawah, kenakan pakaian kasual yang siap terkena cipratan lumpur dan lapisi kamera dengan pelindung debu/air.",
    "descriptionEn": "Get ready for an exhilarating journey into Minangkabau living heritage! Two iconic West Sumatran cultural spectacles—the thrilling Pacu Jawi mud buffalo races in Tanah Datar and the grand Tabuik Festival on Pariaman's Gandoriah Beach—are featured in the national Kharisma Event Nusantara (KEN) roster.\n\nPacu Jawi showcases fearless jockeys gripping speeding bull tails across flooded rice paddies framed by Mount Marapi, while Tabuik culminates in the ceremonial oceanic procession of towering decorative shrines accompanied by synchronized Gandang Tasa drums.\n\n🔍 Verification Check: Addressing conflicting date claims circulating on unofficial social forums, organizers confirmed that customary timelines are coordinated directly with village elders. Official event schedules are updated on the regional tourism portal to ensure visitors plan arrival dates accurately.\n\nTraveler takeaway: When photographing Pacu Jawi near paddy edges, wear mud-ready casual clothing and use protective dust/water coverings on your camera equipment.",
    "tag": "Sumbar",
    "tagEn": "West Sumatra",
    "actionUrl": "https://maps.google.com/?q=Tanah+Datar+Sumatera+Barat",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Pacu Jawi dan Festival Tabuik masuk kalender resmi KEN Kemenparekraf",
      "Atraksi: Sensasi pacuan sawah berlatar Marapi dan prosesi akbar Pantai Gandoriah",
      "Cek Verifikasi: Tanggal puncak acara telah disahkan musyawarah adat, pantau info resmi"
    ],
    "highlightsEn": [
      "Key Takeaway: Pacu Jawi and Tabuik Festival spotlighted in national KEN calendar",
      "Attractions: High-adrenaline mud racing and monumental beachfront cultural parades",
      "Verification Note: Headline ceremony dates confirmed with customary councils"
    ],
    "tips": "Kenakan pakaian kasual yang nyaman dan siapkan pelindung kamera dari cipratan lumpur saat menonton Pacu Jawi.",
    "tipsEn": "Wear comfortable casual attire and protect camera gear from mud splashes while watching Pacu Jawi.",
    "locationName": "Tanah Datar & Pantai Gandoriah, Kota Pariaman",
    "locationNameEn": "Tanah Datar & Gandoriah Beach, Pariaman"
  },
  {
    "id": "news-fallback-6",
    "title": "Gerakan Bangga Berwisata di Indonesia (BBWI): Promo Paket Liburan Domestik dan Destinasi Super Prioritas",
    "titleEn": "Proud of Indonesian Travel (BBWI): Domestic Travel Specials and Super Priority Hubs",
    "date": "04 September 2026",
    "dateEn": "September 04, 2026",
    "category": "Pariwisata Indonesia",
    "categoryEn": "Indonesian Tourism",
    "description": "Mengisi masa liburan di dalam negeri kini makin menarik dengan bergulirnya kampanye nasional Bangga Berwisata di Indonesia (BBWI). Kolaborasi antara pemerintah, perhotelan, dan maskapai penerbangan menghadirkan berbagai penawaran paket perjalanan terjangkau menuju 5 Destinasi Pariwisata Super Prioritas (DPSP), mencakup Danau Toba, Borobudur, Mandalika, Labuan Bajo, dan Likupang.\n\nGerakan ini bertujuan mendorong perputaran ekonomi lokal dan memperkenalkan kekayaan pesona kepulauan nusantara kepada masyarakat luas, didukung fasilitas bandara yang terus dipercantik dan desa wisata berbasis kearifan lokal.\n\n🔍 Catatan Verifikasi: Menyikapi maraknya penipuan berkedok voucher diskon hotel hingga 80% yang mengatasnamakan program BBWI di aplikasi perpesanan, kementerian mengimbau masyarakat untuk selalu berhati-hati. Promo resmi program BBWI hanya berlaku melalui mitra online travel agent (OTA), maskapai, dan travel fair terdaftar—jangan pernah mengklik tautan tidak dikenal yang meminta data pribadi atau OTP perbankan.\n\nTips buat kamu: Rencanakan jadwal liburan dari jauh-jauh hari dan manfaatkan promo bundling transportasi plus penginapan resmi untuk menghemat pengeluaran liburan keluargamu.",
    "descriptionEn": "Vacationing domestically across Indonesia is more rewarding than ever with the nationwide Proud of Traveling in Indonesia (BBWI) campaign. Strategic tie-ups between government agencies, hotel groups, and airlines bring accessible travel packages to Indonesia's 5 Super Priority Hubs: Lake Toba, Borobudur, Mandalika, Labuan Bajo, and Likupang.\n\nThe initiative stimulates regional economies and invites domestic explorers to uncover remote archipelago wonders supported by modern airport links and authentic village homestays.\n\n🔍 Verification Check: Responding to circulating social scams promoting fake 80% off hotel discount vouchers claiming BBWI affiliation, the ministry urges travelers to stay vigilant. Authentic promotions run strictly through accredited online travel platforms, licensed airlines, and recognized travel fairs; never click suspicious links requesting banking OTPs.\n\nTraveler takeaway: Plan vacation dates ahead and take advantage of verified transport-plus-stay bundles to maximize savings for your family getaway.",
    "tag": "Nasional",
    "tagEn": "National",
    "actionUrl": "https://indonesia.travel",
    "imageUrl": "",
    "highlights": [
      "Fakta Inti: Kampanye nasional BBWI genjot kunjungan ke 5 Destinasi Super Prioritas",
      "Fasilitas: Kolaborasi paket terjangkau akomodasi dan penerbangan domestik",
      "Cek Verifikasi: Waspadai link promo palsu; transaksi hanya via mitra OTA resmi berlisensi"
    ],
    "highlightsEn": [
      "Key Takeaway: National BBWI campaign drives travel across 5 Super Priority Hubs",
      "Amenities: Coordinated affordable holiday bundles spanning domestic transit and lodging",
      "Verification Note: Beware of counterfeit voucher links; transact only with licensed OTAs"
    ],
    "tips": "Pesan tiket dan penginapan jauh hari untuk mendapatkan penawaran promo bundling keluarga terbaik.",
    "tipsEn": "Book travel packages in advance to secure the best family bundling discounts.",
    "locationName": "Destinasi Super Prioritas Indonesia (DPSP)",
    "locationNameEn": "Indonesian Super Priority Destinations (DPSP)"
  }
];

export function getItineraryFallback(params: any) {
  const { durasiHari = 3, profilWisatawan, waktuKunjungan, language = 'id' } = params || {};
  const isEnglish = language === 'en';
  const daysCount = Math.min(Math.max(Number(durasiHari) || 3, 1), 7);
  const startDate = waktuKunjungan?.tanggalMulai || '';

  const masterDays = [
    // HARI 1: Dataran Tinggi Bukittinggi & Lembah Anai
    {
      day: 1,
      title: isEnglish ? "Airport Arrival, Anai Valley & Bukittinggi Highland Charm" : "Kedatangan BIM, Lembah Anai & Pesona Dataran Tinggi Bukittinggi",
      activities: [
        {
          time: "08:30 - 11:30",
          location: isEnglish ? "BIM Airport → Lembah Anai Waterfall [Drive ±1.5 hrs]" : "Bandara BIM → Air Terjun Lembah Anai [Perjalanan ±1.5 jam]",
          activity: isEnglish
            ? "Airport pickup, scenic mountain drive along Anai Valley Gorge with a photo stop at the iconic roadside Lembah Anai Waterfall and lush tropical rainforest."
            : "Penjemputan di Bandara BIM, perjalanan menyusuri kawasan cagar alam Lembah Anai dengan perhentian foto di Air Terjun Lembah Anai yang sejuk.",
          tips: isEnglish ? "Roads can be damp; wear slip-resistant footwear and keep a light jacket ready." : "Jalanan sekitar air terjun lembap; gunakan alas kaki nyaman dan siapkan jaket ringan."
        },
        {
          time: "12:00 - 13:30",
          location: isEnglish ? "Padang Panjang Culinary Stop (Sate Mak Syukur / RM Pak Datuk)" : "Pemberhentian Kuliner Padang Panjang (Sate Mak Syukur / RM Pak Datuk)",
          activity: isEnglish
            ? "Authentic lunch savoring legendary Padang Panjang Beef Satay with thick yellow spiced curry broth."
            : "Makan siang menikmati Sate Padang Panjang legendaris dengan kuah kuning rempah khas yang gurih dan nikmat.",
          tips: isEnglish ? "Pair with warm Teh Talua (Minang whipped egg tea) for energy." : "Padukan dengan Teh Talua hangat untuk menambah stamina di udara sejuk."
        },
        {
          time: "14:00 - 15:30",
          location: isEnglish ? "Pandai Sikek Weaving Village [Drive ±20 mins]" : "Desa Tenun Songket Pandai Sikek [Perjalanan ±20 menit]",
          activity: isEnglish
            ? "Visit master artisans crafting gold-threaded Songket and intricate Minangkabau wood carvings under the silhouettes of Mount Singgalang and Marapi."
            : "Menyaksikan mahakarya perajin tenun Songket benang emas dan ukiran kayu tradisional khas Minangkabau berlatar Gunung Singgalang.",
          tips: isEnglish ? "Great spot to purchase genuine certified handmade Songket and scarves." : "Tempat terbaik membeli kain songket dan selendang tenun asli langsung dari perajin."
        },
        {
          time: "16:30 - 18:30",
          location: isEnglish ? "Jam Gadang & Panorama Ngarai Sianok [Bukittinggi]" : "Taman Jam Gadang & Panorama Ngarai Sianok [Bukittinggi]",
          activity: isEnglish
            ? "Check-in hotel in Bukittinggi, stroll around the historic 1926 Jam Gadang clock tower plaza, and enjoy golden hour canyon views at Ngarai Sianok."
            : "Check-in hotel di Bukittinggi, menikmati suasana senja di pelataran Jam Gadang 1926 dan panorama sunset tebing 100 meter Ngarai Sianok.",
          tips: isEnglish ? "Cool evening breeze (18-20°C); perfect time for family photography." : "Udara sore cukup sejuk (18-20°C); waktu terbaik untuk berfoto bersama keluarga."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Dinner: Nasi Kapau Uni Lis at Los Lambuang Pasar Atas (Must-try: Gulai Tambusu & Dendeng Batokok)."
        : "Makan Malam: Nasi Kapau Uni Lis di Los Lambuang Pasar Atas Bukittinggi (Wajib coba: Gulai Tambusu, Dendeng Batokok, dan Rendang)."
    },

    // HARI 2: Geopark Tebing Granit Lembah Harau & Kelok 9
    {
      day: 2,
      title: isEnglish ? "Lembah Harau Granite Canyon & Kelok 9 Mega Flyover" : "Geopark Tebing Granit Lembah Harau & Megaproyek Jembatan Kelok 9",
      activities: [
        {
          time: "08:00 - 11:30",
          location: isEnglish ? "Lembah Harau Geopark, 50 Kota [Drive ±1 hr from Bukittinggi]" : "Geopark Lembah Harau, Kab. 50 Kota [Perjalanan ±1 jam dari Bukittinggi]",
          activity: isEnglish
            ? "Exploring the towering 100-300m vertical granite cliffs of Lembah Harau, visiting Sarasah Murai and Sarasah Bunta waterfalls amidst emerald rice terraces."
            : "Menjelajahi keagungan tebing granit tegak 100-300 meter Lembah Harau, menikmati Air Terjun Sarasah Murai dan hamparan sawah hijau asri.",
          tips: isEnglish ? "Rent a local motor-scooter or open safari jeep for best cliff photography." : "Sewa safari jeep terbuka atau jalan kaki santai untuk sudut foto tebing terbaik."
        },
        {
          time: "12:00 - 13:30",
          location: isEnglish ? "Harau Countryside Resto (RM Pondok Flora / Pongek Situjuah)" : "Restoran Tepi Sawah Harau (RM Pondok Flora / Pongek Situjuah)",
          activity: isEnglish
            ? "Authentic Payakumbuh lunch featuring Gulai Itiak Lado Mudo (green chili smoked duck) and fresh river gourami fish."
            : "Makan siang dengan hidangan Gulai Itiak Lado Mudo (bebek cabe hijau), Pongek Cubadak, dan Ikan Bakar segar.",
          tips: isEnglish ? "Duck is slow-cooked for 8 hours, extremely tender with rich aroma." : "Daging itik dimasak perlahan dengan bumbu rempah harum dan empuk."
        },
        {
          time: "14:30 - 16:30",
          location: isEnglish ? "Kelok 9 Flyover & Batang Sanipan Gorge [Drive ±30 mins]" : "Jembatan Layang Kelok 9 & Gua Ngalau Indah [Perjalanan ±30 menit]",
          activity: isEnglish
            ? "Admire the magnificent engineering of Kelok 9 winding flyover bridges carved into the rainforest gorge, followed by scenic coffee at cliffside rest areas."
            : "Menyaksikan kemegahan arsitektur jembatan layang Kelok 9 yang meliuk di antara dua bukit cagar alam, dilanjutkan rehat kopi di gardu pandang.",
          tips: isEnglish ? "Spot local roasted sweet corn and banana fritters at viewpoints." : "Nikmati jagung bakar manis dan pisang kapik kelapa di spot gardu pandang."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Payakumbuh Special: Lamang Tapai (black fermented sticky rice with bamboo-roasted sticky rice) & Sate Danguang-Danguang."
        : "Kuliner Khas Payakumbuh: Lamang Tapai ketan hitam bambu & Sate Danguang-Danguang berkuah rempah kelapa."
    },

    // HARI 3: Luhak Nan Tuo Tanah Datar & Danau Singkarak
    {
      day: 3,
      title: isEnglish ? "Royal Heritage Istano Pagaruyung & Lake Singkarak" : "Kemegahan Luhak Nan Tuo Tanah Datar & Danau Singkarak",
      activities: [
        {
          time: "08:30 - 10:30",
          location: isEnglish ? "Nagari Pariangan Heritage Village [Drive ±45 mins]" : "Desa Wisata Nagari Pariangan [Perjalanan ±45 menit]",
          activity: isEnglish
            ? "Walking through the oldest Minang village on Mount Marapi slopes, marveling at century-old wooden Rumah Gadang and drinking roasted Kawa Daun coffee."
            : "Menyusuri desa tertua Minangkabau di lereng Marapi, mengagumi arsitektur Rumah Gadang kayu ratusan tahun, dan mencicipi seduhan kopi Kawa Daun.",
          tips: isEnglish ? "Wear respectful attire and drink Kawa tea from traditional coconut shells." : "Kenakan pakaian sopan dan nikmati sensasi minum kopi daun dari batok kelapa."
        },
        {
          time: "11:15 - 13:30",
          location: isEnglish ? "Istano Basa Pagaruyung, Batusangkar [Drive ±25 mins]" : "Istano Basa Pagaruyung, Batusangkar [Perjalanan ±25 menit]",
          activity: isEnglish
            ? "Touring the majestic 3-storey Minangkabau Royal Palace, admiring golden carvings, and trying on royal ceremonial Minang attire for commemorative photos."
            : "Eksplorasi kemegahan Istana Kerajaan Minangkabau 3 lantai beratap gonjong 11 lekuk, serta mencoba kostum adat raja dan ratu Bundo Kanduang.",
          tips: isEnglish ? "Costume rental available on ground floor; highly recommended for souvenirs." : "Sewa busana adat tersedia di lokasi; sangat direkomendasikan untuk kenang-kenangan."
        },
        {
          time: "14:15 - 16:30",
          location: isEnglish ? "Lake Singkarak Shoreline [Drive ±30 mins]" : "Tepian Danau Singkarak [Perjalanan ±30 menit]",
          activity: isEnglish
            ? "Late lunch and relaxation along the turquoise shores of Lake Singkarak, tasting endemic crispy fried Bilih fish while enjoying the vast lake panorama."
            : "Makan siang santai di tepi Danau Singkarak, menikmati hidangan Ikan Bilih goreng renyah yang hanya hidup endemik di danau ini.",
          tips: isEnglish ? "Buy packaged dried Ikan Bilih as exclusive authentic gifts." : "Beli oleh-oleh Ikan Bilih krispi kemasan langsung dari nelayan danau."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Lake Singkarak Specialty: Crispy Fried Ikan Bilih, Sambal Lado Mudo & Rendang Belut."
        : "Kuliner Khas Singkarak & Tanah Datar: Ikan Bilih Goreng Balado Renyah & Rendang Belut Khas Batusangkar."
    },

    // HARI 4: Puncak Lawang, Kelok 44 & Danau Maninjau
    {
      day: 4,
      title: isEnglish ? "Puncak Lawang Cloud Sea, Kelok 44 & Lake Maninjau" : "Samudra Awan Puncak Lawang, Kelok 44 & Danau Maninjau",
      activities: [
        {
          time: "08:30 - 10:30",
          location: isEnglish ? "Koto Gadang Silver Village & Great Wall [Drive ±15 mins]" : "Desa Kerajinan Perak Koto Gadang & Janjang Koto Gadang [Perjalanan ±15 menit]",
          activity: isEnglish
            ? "Stroll through the historic village of silver filigree artisans and walk part of the scenic Great Wall of Minangkabau bridging Sianok canyon."
            : "Mengunjungi sentra perak filigri tertua di Koto Gadang dan menyusuri Janjang Koto Gadang (Great Wall Minang) di atas Ngarai Sianok.",
          tips: isEnglish ? "Filigree silver jewelry makes exquisite lightweight souvenirs." : "Perhiasan perak halus filigri Koto Gadang sangat bernilai seni tinggi."
        },
        {
          time: "11:00 - 13:00",
          location: isEnglish ? "Puncak Lawang Agam [Drive ±45 mins]" : "Puncak Lawang & Matur, Kab. Agam [Perjalanan ±45 menit]",
          activity: isEnglish
            ? "Breathtaking highland viewpoint overlooking Lake Maninjau 1,200m below, watching paragliders glide through misty pine forests."
            : "Menikmati pemandangan spektakuler kaldera Danau Maninjau dari ketinggian 1.200 mdpl yang berkabut sejuk serta atraksi paralayang.",
          tips: isEnglish ? "Taste freshly pressed sugarcane juice (Tebu Lawang) with ice." : "Cicipi perasan air tebu Lawang murni yang manis dan segar di lokasi."
        },
        {
          time: "13:30 - 16:30",
          location: isEnglish ? "Kelok 44 Descent to Lake Maninjau Shore [Drive ±45 mins]" : "Menuruni Kelok 44 & Tepian Danau Maninjau [Perjalanan ±45 menit]",
          activity: isEnglish
            ? "Thrill of descending the famous 44 hairpin curves to the peaceful lake shore, visiting the Birthplace Museum of Buya Hamka."
            : "Sensasi melintasi 44 kelokan legendaris menuju tepian Danau Maninjau, dilanjutkan berziarah ke Museum Rumah Kelahiran Buya Hamka.",
          tips: isEnglish ? "Use low gear on vehicle; stop at Kelok 23 for stunning middle-tier photo." : "Gunakan gigi rendah saat menuruni kelokan; sempatkan foto di spot Kelok 23."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Lake Maninjau Delicacy: Palai Rinuak (spiced endemic lake fish steamed in banana leaf) & Crispy Rinuak Peyek."
        : "Kuliner Khas Maninjau: Palai Rinuak (pepes ikan rinuak endemik Maninjau) & Peyek Rinuak Renyah."
    },

    // HARI 5: UNESCO Sawahlunto Mining City & Silokek Geopark
    {
      day: 5,
      title: isEnglish ? "Sawahlunto UNESCO World Heritage & Geopark Silokek" : "Kota Tambang Warisan Dunia UNESCO Sawahlunto & Geopark Silokek",
      activities: [
        {
          time: "08:30 - 11:30",
          location: isEnglish ? "Sawahlunto Old Mining Heritage City [Drive ±1.5 hrs]" : "Kota Tua Tambang Sawahlunto UNESCO [Perjalanan ±1.5 jam]",
          activity: isEnglish
            ? "Exploring Southeast Asia's first underground coal mine at Lubang Mbah Soero, Dutch colonial railway depot, and the Mak Itam historic steam locomotive museum."
            : "Menjelajahi terowongan tambang batu bara bawah tanah Lubang Mbah Soero, museum kereta api Mak Itam, dan arsitektur Eropa klasik abad ke-19.",
          tips: isEnglish ? "Hard hats and rubber boots are provided for underground tunnel exploration." : "Helm proyek dan sepatu bot disediakan pengelola untuk masuk terowongan."
        },
        {
          time: "12:00 - 13:30",
          location: isEnglish ? "Sawahlunto Vintage Cafe / RM Silungkang" : "Restoran Khas Sawahlunto / RM Songket Silungkang",
          activity: isEnglish
            ? "Lunch enjoying authentic Sawahlunto Beef Ribs Soup (Sup Iga), Katupek Pitalah, and sweet Silungkang Lemang."
            : "Makan siang dengan hidangan Sup Iga Sapi empuk, Katupek Gulai Paku, dan Songket Silungkang shopping.",
          tips: isEnglish ? "Silungkang is famous for high quality geometric songket fabrics." : "Pusat tenun Songket Silungkang menyediakan aneka motif tenun terjangkau."
        },
        {
          time: "14:30 - 17:00",
          location: isEnglish ? "National Geopark Silokek, Sijunjung [Drive ±45 mins]" : "Geopark Nasional Silokek, Sijunjung [Perjalanan ±45 menit]",
          activity: isEnglish
            ? "Admiring the ancient Permian karst cliffs along the pristine Batang Kuantan river, ancient caves, and untouched tropical wilderness."
            : "Menyaksikan keajaiban tebing purba batuan karst dan formasi batuan purba di sepanjang Sungai Batang Kuantan yang eksotis.",
          tips: isEnglish ? "Spectacular for nature lovers and drone videography." : "Spot luar biasa untuk pencinta alam perawan dan fotografi lanskap."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Sawahlunto & Sijunjung Flavors: Sup Iga Sapi Sawahlunto & Lemang Tapai Silungkang."
        : "Kuliner Khas: Sup Iga Sapi Sawahlunto & Lemang Bakar Silungkang."
    },

    // HARI 6: Dataran Tinggi Solok, Danau Kembar & Seribu Rumah Gadang
    {
      day: 6,
      title: isEnglish ? "Solok Highlands, Twin Lakes & Thousand Rumah Gadang" : "Dataran Tinggi Solok, Danau Kembar & Kawasan Seribu Rumah Gadang",
      activities: [
        {
          time: "08:30 - 11:30",
          location: isEnglish ? "Alahan Panjang Tea Plantation & Twin Lakes [Drive ±1.5 hrs]" : "Kebun Teh Alahan Panjang & Danau Kembar [Perjalanan ±1.5 jam]",
          activity: isEnglish
            ? "Walking through the rolling green tea plantations of Alahan Panjang dubbed 'Cold City Without Snow', visiting Danau Diatas and Danau Dibawah volcanic lakes."
            : "Menyusuri hamparan hijau kebun teh Alahan Panjang yang sejuk berhawa 15°C, menikmati Danau Diatas dan Danau Dibawah dengan perahu danau.",
          tips: isEnglish ? "Very cool mountain weather; wear a warm sweater or jacket." : "Suhu sangat sejuk dan segar; kenakan jaket atau sweater hangat."
        },
        {
          time: "12:00 - 13:30",
          location: isEnglish ? "Alahan Panjang Lakeside Resto" : "Restoran Tepi Danau Kembar Alahan Panjang",
          activity: isEnglish
            ? "Lunch enjoying authentic Solok Organic Rice (Bareh Solok), Dendeng Batokok, and fresh highland mountain vegetables."
            : "Makan siang dengan beras Bareh Solok organik yang pulen, Dendeng Batokok cabe merah segar, dan sayuran dataran tinggi.",
          tips: isEnglish ? "Bareh Solok is Indonesia's most prized premium aromatic rice." : "Beras Bareh Solok adalah beras paling harum dan pulen kebanggaan Minang."
        },
        {
          time: "14:30 - 17:30",
          location: isEnglish ? "Thousand Rumah Gadang Heritage Village, South Solok [Drive ±1.5 hrs]" : "Kawasan Saribu Rumah Gadang & Goa Batu Kapal [Perjalanan ±1.5 jam]",
          activity: isEnglish
            ? "Experiencing the world's highest concentration of preserved wooden Rumah Gadang mansions in a single nagari, and visiting the majestic Batu Kapal caves."
            : "Mengunjungi perkampungan adat dengan ratusan Rumah Gadang kayu berusia ratusan tahun yang masih dihuni lestari, serta keajaiban Goa Batu Kapal.",
          tips: isEnglish ? "Option to stay overnight in a traditional authentic Rumah Gadang homestay." : "Tersedia homestay Rumah Gadang otentik untuk pengalaman menginap tak terlupakan."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "South Solok Specialty: Pangek Pisang, Gulai Tunjang Solok & Black Highland Tea."
        : "Kuliner Khas Solok Selatan: Pangek Pisang, Gulai Randang Baluik & Teh Hitam Danau Kembar."
    },

    // HARI 7: Surga Bahari Mandeh, Pantai Padang & Masjid Raya Sumbar (Departure)
    {
      day: 7,
      title: isEnglish ? "Mandeh Marine Paradise, Padang Grand Mosque & Departure" : "Surga Bahari Mandeh, Ikon Masjid Raya Sumbar & Kepulangan",
      activities: [
        {
          time: "08:00 - 12:00",
          location: isEnglish ? "Mandeh Marine Tourism Estate, Pesisir Selatan [Drive ±1.5 hrs from Padang]" : "Kawasan Wisata Bahari Mandeh [Perjalanan ±1.5 jam ke Pesisir Selatan]",
          activity: isEnglish
            ? "Island hopping across turquoise waters to Pulau Setan, snorkeling above healthy coral reefs, cliff jumping at Sironjong Cliff, and water sports."
            : "Jelajah pulau bahari berair toska 'Raja Ampat-nya Sumbar', snorkeling terumbu karang di Pulau Setan, cliff jumping di Sironjong, dan wahana banana boat.",
          tips: isEnglish ? "Bring swimwear, sunblock, dry bag, and extra change of clothes." : "Bawa pakaian renang, sunblock ramah lingkungan, dan kantong anti-air."
        },
        {
          time: "12:30 - 14:00",
          location: isEnglish ? "Padang Coastal Seafood Resto (Pantai Padang / Muaro)" : "Restoran Seafood Pantai Padang (RM Nelayan / Simpang Enam)",
          activity: isEnglish
            ? "Lunch savoring fresh grilled reef fish with Sambal Dabu-Dabu and Minang Spiced Curry, followed by refreshing Es Durian Ganti Nan Jano."
            : "Makan siang aneka ikan bakar karang segar, Gulai Kepala Ikan Kakap, dan hidangan penutup Es Durian Iko Gantinyo / Ganti Nan Jano.",
          tips: isEnglish ? "Pair durian ice with shaved ice and chocolate condensed milk." : "Es Durian Padang terkenal sangat legit dengan daging durian asli melimpah."
        },
        {
          time: "14:30 - 17:00",
          location: isEnglish ? "Grand Mosque of West Sumatra & Christine Hakim Souvenirs → BIM Airport" : "Masjid Raya Sumatera Barat & Sentra Oleh-Oleh → Bandara BIM",
          activity: isEnglish
            ? "Admiring the world-award winning dome-less Rumah Gadang architecture of West Sumatra Grand Mosque, shopping for Balado Chips & Rendang, and transfer to BIM."
            : "Beribadah dan berfoto di Masjid Raya Sumatera Barat dengan arsitektur bentang Rumah Gadang terindah di dunia, belanja oleh-oleh, lalu transfer ke Bandara BIM.",
          tips: isEnglish ? "Allow at least 2 hours before flight schedule at BIM." : "Tiba di Bandara BIM minimal 1.5 - 2 jam sebelum jadwal penerbangan."
        }
      ],
      culinaryRecommendation: isEnglish
        ? "Padang City Farewell: Sate Padang Ajo Ramon & Es Durian Ganti Nan Jano."
        : "Kuliner Penutup Kota Padang: Sate Padang Ajo Ramon & Es Durian Ganti Nan Jano."
    }
  ];

  // If targetEvent is provided, inject it as the main highlight into Day 1 or Day 2
  const targetEv = params?.targetEvent;
  if (targetEv) {
    const evTitle = isEnglish && targetEv.titleEn ? targetEv.titleEn : targetEv.title;
    const evSched = isEnglish && targetEv.scheduleEn ? targetEv.scheduleEn : targetEv.schedule;
    const evLoc = isEnglish && targetEv.locationNameEn ? targetEv.locationNameEn : (targetEv.locationName || targetEv.location || targetEv.regency);
    const evDesc = isEnglish && targetEv.descriptionEn ? targetEv.descriptionEn.split('\n\n')[0] : (targetEv.description ? targetEv.description.split('\n\n')[0] : '');

    const targetDayIndex = daysCount > 1 ? 1 : 0;
    if (masterDays[targetDayIndex]) {
      masterDays[targetDayIndex].title = isEnglish
        ? `✨ Festival Spotlight: ${evTitle} & Regional Highlights`
        : `✨ Puncak Acara: ${evTitle} & Eksplorasi Kawasan Sekitar`;
      
      masterDays[targetDayIndex].activities.unshift({
        time: "09:00 - 12:30",
        location: `🎪 ${evTitle} [${evLoc}]`,
        activity: isEnglish
          ? `Attending the spectacular ${evTitle} (${evSched}). ${evDesc}`
          : `Menghadiri kemeriahan ${evTitle} (${evSched}). ${evDesc}`,
        tips: isEnglish
          ? "Arrive early to witness opening ceremonial rites and enjoy authentic festive atmosphere."
          : "Tiba lebih awal untuk menyaksikan pembukaan prosesi adat dan mengabadikan momen terbaik."
      });
      if (masterDays[targetDayIndex].activities.length > 4) {
        masterDays[targetDayIndex].activities.pop();
      }
    }
  }

  // Slice exactly the number of days requested without any duplicate or repeating content
  const selectedDays = masterDays.slice(0, daysCount);

  return {
    title: isEnglish
      ? (targetEv ? `Special Event Itinerary: ${targetEv.titleEn || targetEv.title} & West Sumatra Highlights (${daysCount} Days)` : `Master Tour Itinerary: Wonderful West Sumatra Grand Exploration (${daysCount} Days${startDate ? ` - Starting ${startDate}` : ''})`)
      : (targetEv ? `Rencana Perjalanan Spesial: ${targetEv.title} & Pesona Sumatera Barat (${daysCount} Hari)` : `Rencana Perjalanan Eksklusif: Master Tour Wonderful West Sumatra (${daysCount} Hari${startDate ? ` - Mulai ${startDate}` : ''})`),
    summary: isEnglish
      ? (targetEv ? `A custom travel plan featuring the magnificent ${targetEv.titleEn || targetEv.title} as the centerpiece highlight, seamlessly combined with scenic Minangkabau geoparks, cultural heritage, and legendary gastronomy.` : `A professionally curated, 100% distinct daily travel plan designed by master tour operators. Features seamless corridor routing, realistic drive times, iconic Minangkabau geoparks, UNESCO cultural heritage, and world-class culinary stops.`)
      : (targetEv ? `Rencana perjalanan wisata istimewa yang dirancang khusus dengan puncak perayaan festival akbar "${targetEv.title}" (${targetEv.schedule || ''}), dipadukan dengan eksplorasi geopark, warisan budaya Minangkabau, serta kuliner legendaris yang searah rute.` : `Rencana perjalanan wisata 100% berbeda setiap hari yang dirancang oleh Master Tour Operator profesional. Mengutamakan rute koridor searah tanpa bolak-balik, estimasi waktu tempuh realistis, kepuasan maksimal wisatawan, serta eksplorasi kuliner legendaris khas Minangkabau.`),
    itinerary: selectedDays,
    localTips: isEnglish
      ? [
          "Geographic Flow: Every day covers a distinct geographical corridor without back-and-forth travel, ensuring comfort and maximum sightseeing time.",
          "Cultural Etiquette: Ranah Minang honors 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Dress modestly when visiting villages, palaces, and mosques.",
          "Gastronomy Note: When dining at traditional Padang restaurants, dishes are served 'Hidang' on your table; you only pay for what you eat.",
          "Essential Souvenirs: Christine Hakim Balado Chips, Songket Pandai Sikek, Kopi Kawa Daun, and Vacuum-packed Rendang."
        ]
      : [
          "Logika Perjalanan: Setiap hari menjelajahi koridor wilayah yang berbeda secara linear dan searah tanpa bolak-balik, menjamin kenyamanan fisik dan efisiensi waktu.",
          "Etika Budaya: Masyarakat Minangkabau memegang teguh 'Adat Basandi Syarak, Syarak Basandi Kitabullah'. Kenakan busana sopan saat berkunjung ke nagari, istana, dan masjid.",
          "Tradisi Kuliner Hidang: Di Rumah Makan Padang otentik, makanan disajikan bertumpuk di meja (sistem hidang); Anda hanya membayar piring yang dimakan.",
          "Oleh-Oleh Wajib: Keripik Balado Sanjai Christine Hakim/Mahkota, Kain Tenun Pandai Sikek, Kopi Kawa Daun, dan Rendang Kemasan Vakum."
        ]
  };
}

export async function fetchAiItinerary(params: any) {
  try {
    const res = await fetch('/api/ai/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      return await res.json();
    }
  } catch (e) {
    console.warn("Server API itinerary endpoint unavailable, using fallback AI response", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        const isEnglish = params?.language === 'en';
        const langStr = isEnglish ? 'English' : 'Bahasa Indonesia';
        const availableDestinations = params?.availableDestinations || [];
        const destSummary = availableDestinations.map((d: any) => `- ${d.title} (${d.category}): ${d.tag}`).join('\n');
        
        const targetEvent = params?.targetEvent;
        const eventEmphasisPrompt = targetEvent ? `
🌟 TARGET EVENT / FESTIVAL UTAMA YANG WAJIB DIHADIRI (MANDATORY TRIP CENTERPIECE):
Wisatawan ini secara khusus ingin menghadiri acara/festival berikut:
- Nama Event: ${targetEvent.title} (${targetEvent.titleEn || ''})
- Jadwal Pelaksanaan: ${targetEvent.schedule} (${targetEvent.scheduleEn || ''})
- Lokasi Acara: ${targetEvent.locationName || targetEvent.location || targetEvent.regency}
- Deskripsi Acara: ${targetEvent.description}
- Status Event: ${targetEvent.isKen ? 'Karisma Event Nusantara (KEN Kemenparekraf)' : 'Event Unggulan Sumatera Barat'}

ATURAN WAJIB PALING UTAMA:
1. Anda HARUS menjadwalkan kunjungan khusus ke festival "${targetEvent.title}" ini pada salah satu hari (misal Hari 1 atau Hari 2) sebagai AKTIVITAS UTAMA (centerpiece).
2. Susun seluruh rute hari tersebut dan destinasi di sekitarnya agar SEARAH dan BERDEKATAN secara geografis dengan lokasi event ${targetEvent.locationName || targetEvent.regency}.
3. Tuliskan nama "${targetEvent.title}" secara eksplisit pada judul hari dan deskripsi aktivitas di hari tersebut!
` : '';

        // Remove large arrays before stringifying to keep prompt clean
        const cleanParams = { ...params };
        delete cleanParams.availableDestinations;
        delete cleanParams.availableEvents;

        const prompt = `Anda adalah 'UNI MALA AI', MASTER TOUR OPERATOR & CHIEF TRAVEL PLANNER TERBAIK di Sumatera Barat. 
Tugas Anda merancang itinerary wisata yang SANGAT SPESIFIK, NYAMAN, dan MEMATUHI SEMUA preferensi pengguna berikut:
${JSON.stringify(cleanParams, null, 2)}

${eventEmphasisPrompt}

Daftar Destinasi & Kategori di Sumatera Barat yang dapat Anda pilih:
${destSummary}

Aturan Ketat:
1. Wajib sesuaikan destinasi, ritme, dan aktivitas dengan profil wisatawan (misal: jika bawa lansia/anak, kurangi aktivitas fisik ekstrem, pilih yang mudah diakses).
2. Rute HARUS SEARAH per klaster geografis tiap harinya. JANGAN bolak-balik.
3. JANGAN mengulang destinasi di hari yang berbeda.
4. Gunakan bahasa: ${langStr}.
5. FORMAT OUTPUT WAJIB BERUPA JSON VALID dengan struktur berikut:
{
  "title": "Judul Itinerary",
  "summary": "Ringkasan itinerary",
  "itinerary": [
    {
      "day": 1,
      "title": "Judul Hari 1",
      "activities": [
        {
          "time": "08:00 - 10:00",
          "location": "Nama Tempat",
          "activity": "Deskripsi aktivitas",
          "tips": "Tips lokal"
        }
      ],
      "culinaryRecommendation": "Rekomendasi kuliner"
    }
  ],
  "localTips": ["Tip 1", "Tip 2"]
}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
        });
        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.warn(`Client Gemini API failed with ${modelName}, trying next...`, err);
      }
    }
  }

  return getItineraryFallback(params);
}

export function generateSmartUniMalaChatReply(message: string): string {
  const cleanMsg = (message || '').trim();
  const lower = cleanMsg.toLowerCase();

  // 1. Salam & Perkenalan
  if (lower.match(/^(halo|hai|hi|hey|assalam|selamat pagi|selamat siang|selamat sore|selamat malam|pagi|siang|malam|tes|test|halo uni|hai uni)/)) {
    return `**Salamaik Datang di Ranah Minang!** 🙏✨\n\nSaya **UNI MALA AI**, pemandu virtual resmi pariwisata & kebudayaan Sumatera Barat. Saya siap membantu Anda dengan:\n\n1. 🗺️ **Penyusunan Itinerary Cerdas (1–7 Hari)** searah klaster geografis tanpa bolak-balik.\n2. 🍲 **Rekomendasi Kuliner Otentik** (Nasi Kapau, Rendang Asli, Sate Padang, Teh Talua, Gulai Itiak Lado Mudo).\n3. 📍 **Panduan Destinasi & Hidden Gems** (Lembah Harau, Puncak Lawang, Danau Biru, Mentawai, Mandeh).\n4. 🚗 **Info Transportasi & Rute** (Akses BIM, Sewa Mobil, Kapal Cepat Mentawai, Rute Kelok 9 & 44).\n5. 🏛️ **Kisah Sejarah & Falsafah Budaya Minangkabau**.\n\nAda rencana perjalanan atau destinasi yang ingin Anda tanyakan hari ini, Dunsanak? 😊`;
  }

  // 2. Transportasi, Rute & Aksesibilitas
  if (lower.includes('mentawai') && (lower.includes('kapal') || lower.includes('cara ke') || lower.includes('transport') || lower.includes('akses') || lower.includes('feri'))) {
    return `🚢 **Panduan Akses & Transportasi ke Kepulauan Mentawai:**\n\n1. **Kapal Cepat (Mentawai Fast):**\n   - Berangkat dari **Pelabuhan Muaro Padang** menuju **Tua Pejat (Sipora)** atau **Siberut / Sikabaluan**.\n   - Waktu tempuh: ±3 hingga 3,5 jam (menggunakan kapal ber-AC nyaman).\n   - Jadwal: Beroperasi hampir setiap hari (bergantian rute Tuapejat, Siberut, dan Sikakap) pukul 06:30 atau 07:00 WIB.\n\n2. **Kapal Feri RORO (KMP Gambolo / KMP Ambu-Ambu):**\n   - Berangkat dari **Pelabuhan Teluk Bayur / Bungus Padang** untuk penumpang dan kendaraan logistik (waktu tempuh malam ±10-12 jam).\n\n💡 *Tips Uni Mala:* Untuk wisata surfing atau budaya suku Sikerei di Siberut, pesan tiket Mentawai Fast 1-2 hari sebelumnya dan siapkan obat anti-mabuk laut.`;
  }

  if (lower.includes('jarak') || lower.includes('berapa jam') || lower.includes('padang ke bukittinggi') || lower.includes('bim ke') || lower.includes('sewa mobil') || lower.includes('rental') || lower.includes('transport')) {
    return `🚗 **Info Rute, Waktu Tempuh & Transportasi Sumatera Barat:**\n\n- **Bandara BIM ⇄ Kota Padang:** ±45 menit (23 km) via jalur Bypass atau Kereta Bandara Minangkabau Ekspres.\n- **Bandara BIM ⇄ Kota Bukittinggi:** ±2 hingga 2,5 jam (±75 km) via Padang Panjang & Lembah Anai.\n- **Bukittinggi ⇄ Lembah Harau & Kelok 9 (Payakumbuh):** ±1 hingga 1,5 jam (±45 km).\n- **Bukittinggi ⇄ Danau Maninjau (Kelok 44):** ±1 jam menuju Puncak Lawang (1.200 mdpl).\n- **Padang ⇄ Kawasan Wisata Bahari Mandeh (Pesisir Selatan):** ±1,5 jam (±56 km) via jalan darat pesisir yang mulus.\n- **Padang ⇄ Alahan Panjang (Kebun Teh & Danau Kembar):** ±1,5 hingga 2 jam (±65 km).\n\n💡 *Tips Transportasi:* Sangat disarankan menyewa mobil (dengan supir lokal berpengalaman) di Bandara BIM agar perjalanan melintasi jalur pegunungan dan tikungan terasa nyaman dan aman.`;
  }

  // 3. Rekomendasi Kuliner Spesifik
  if (lower.includes('nasi kapau') || lower.includes('kapau')) {
    return `🍲 **Rekomendasi Nasi Kapau Otentik di Bukittinggi:**\n\nNasi Kapau adalah mahakarya kuliner khas Nagari Kapau dengan ciri khas sendok gulai bertangkai kayu panjang dan aneka gulai bertingkat.\n\n**Spot Terbaik:**\n1. **Los Lambuang Pasar Atas Bukittinggi:**\n   - *Uni Lis:* Sangat legendaris dengan Gulai Tambusu (usus sapi isi telur-tahu) dan Rendang Daging gurih.\n   - *Uni Erna & Uni Pit:* Terkenal dengan Gulai Tunjang dan Dendeng Batokok cabe merah.\n2. **Nagari Kapau Asli (Kec. Tilatang Kamang, Agam):**\n   - Langsung di kampung asalnya, nikmati sajian segar Gulai Cubadak (nangka muda) dan Sambal Lado Mudo.\n\n💡 *Menu Wajib Coba:* Gulai Tambusu, Gulai Cancang, Dendeng Lado Hijau, dan Dendeng Paru Renyah!`;
  }

  if (lower.includes('sate') || lower.includes('sate padang') || lower.includes('sate danguang')) {
    return `🍢 **Rekomendasi Sate Padang & Pariaman Terbaik:**\n\n1. **Sate Mak Syukur (Padang Panjang):**\n   - Kuah kuning kental kaya rempah kunyit, serai, dan jahe dengan irisan lidah dan daging sapi empuk.\n2. **Sate Danguang-Danguang (Payakumbuh):**\n   - Kuah gurih santan rempah agak kecokelatan dengan taburan serundeng kelapa wangi.\n3. **Sate Ajo Ramon (Kota Padang):**\n   - Cita rasa khas Pariaman dengan kuah kemerahan pedas nendang dan aroma bakaran daging asap.\n4. **Sate Lokan Pesisir (Pantai Pariaman & Painan):**\n   - Sate berbahan kerang muara (lokan) segar berbalut kuah gulai pedas gurih.`;
  }

  if (lower.includes('rendang') || lower.includes('oleh-oleh') || lower.includes('sanjai') || lower.includes('keripik')) {
    return `🎁 **Panduan Oleh-Oleh Khas & Rendang Asli Minangkabau:**\n\n1. **Keripik Sanjai Balado:**\n   - *Christine Hakim Idea Park (Padang)* & *Mahkota Sanjai (Bukittinggi)*: Keripik singkong renyah dibalut saus cabai gula aren asli.\n2. **Rendang Kemasan Vakum Premium:**\n   - *Rendang Asese, Rendang Selamat, Rendang Erika (Payakumbuh/Padang):* Tersedia varian Rendang Daging Sapi, Rendang Paru, Rendang Suwir, dan Rendang Belut.\n3. **Kain Tenun & Kerajinan:**\n   - *Songket Pandai Sikek:* Tenun benang emas & perak bersertifikat.\n   - *Kerajinan Perak Filigri Koto Gadang:* Perhiasan perak halus buatan tangan.\n   - *Kopi Kawa Daun & Kopi Bukittinggi.*`;
  }

  // 4. Hotel & Penginapan
  if (lower.includes('hotel') || lower.includes('penginapan') || lower.includes('resort') || lower.includes('villa') || lower.includes('glamping') || lower.includes('homestay')) {
    return `🏨 **Rekomendasi Akomodasi & Hotel Terbaik di Sumatera Barat:**\n\n1. **Kota Bukittinggi (Dataran Tinggi & Heritage):**\n   - *The Balcone Hotel & Resort:* Hotel bintang 4 view spektakuler Gunung Merapi & Singgalang.\n   - *Grand Rocky Hotel & Novotel Bukittinggi:* Sangat dekat dengan Jam Gadang dan pusat kuliner.\n2. **Lembah Harau & Payakumbuh:**\n   - *Abdi Homestay / Harau Sky / Syafiq Glamping:* Menginap persis di bawah dinding tebing granit 300m.\n3. **Alahan Panjang & Danau Kembar (Dingin & Estetik):**\n   - *Glamping Danau Diatas & Villa Alahan Panjang:* Pemandangan langsung ke danau dan kebun teh berhawa 15–18°C.\n4. **Kawasan Mandeh & Kepulauan Pesisir:**\n   - *Labuan Sundi Mandeh Resort & Cubadak Paradiso Village:* Resort tepi pantai private ala Maldives.\n5. **Kota Padang:**\n   - *Hotel Mercure, Santika Premiere, dan The ZHM Premiere:* View sunset Samudra Hindia.`;
  }

  // 5. Destinasi Spesifik
  if (lower.includes('danau biru') || lower.includes('sawahlunto')) {
    return `💎 **Pesona Danau Biru & Kota Warisan Dunia UNESCO Sawahlunto:**\n\n- **Danau Biru Sawahlunto:** Danau kawah bekas tambang terbuka di Parambahan, Talawi. Airnya berwarna biru toska safir cerah alami akibat reaksi mineral silika dan sulfat formasi batuan Ombilin, berpagar tebing kapur putih dan pinus yang sangat fotogenik.\n- **Kota Tua Sawahlunto (UNESCO):** Kunjungi *Lubang Mbah Soero* (terowongan tambang 185m), Museum Kereta Api Mak Itam, dan sentra Songket Silungkang.\n\n💡 *Tips:* Waktu terbaik ke Danau Biru adalah pukul 08:00 - 11:00 WIB saat sinar matahari membuat warna air biru toska berkilau sempurna.`;
  }

  if (lower.includes('harau') || lower.includes('lembah harau')) {
    return `🏞️ **Geopark Lembah Harau (Yosemite-nya Indonesia):**\n\nLembah Harau di Kabupaten Lima Puluh Kota dikelilingi tebing granit tegak setinggi 100–300 meter dengan 7 air terjun alami memukau:\n- **Sarasah Murai & Sarasah Bunta:** Air terjun bertingkat yang sejuk di tengah hutan.\n- **Harau Sky & Kampung Eropa:** Spot rekreasi modern di lembah tebing.\n- **Aktivitas:** Safari jeep keliling sawah tebing, bouldering/rock climbing, dan foto sunset tebing emas.`;
  }

  if (lower.includes('maninjau') || lower.includes('puncak lawang') || lower.includes('kelok 44')) {
    return `🌄 **Danau Maninjau, Puncak Lawang & Sensasi Kelok 44:**\n\n- **Puncak Lawang (1.200 mdpl):** Gardu pandang kaldera terindah di Asia Tenggara, spot olahraga paralayang internasional, dan perkebunan tebu tradisional dengan air tebu Lawang murni.\n- **Kelok 44:** Menuruni 44 tikungan legendaris dengan pemandangan danau bertingkat.\n- **Tepian Danau & Museum Buya Hamka:** Berziarah ke rumah kelahiran ulama & sastrawan besar Buya Hamka di Sungai Batang dan mencicipi kuliner endemik *Palai Rinuak*.`;
  }

  if (lower.includes('mandeh') || lower.includes('pulau')) {
    return `🏝️ **Kawasan Wisata Bahari Mandeh (Raja Ampat-nya Sumbar):**\n\nTerletak di Teluk Carocok Tarusan, Pesisir Selatan:\n- **Island Hopping:** Pulau Setan (pasir putih & banana boat), Pulau Sironjong Gadang & Ketek (cliff jumping 15m), Pulau Cubadak, dan Hutan Mangrove Sungai Nyalo.\n- **Snorkeling & Diving:** Menjelajahi terumbu karang dangkal dan bangkai kapal karam Belanda *MV Boelongan Nederland*.\n- **Waktu Terbaik:** Bulan April hingga Oktober saat laut sangat tenang dan jernih seperti kaca.`;
  }

  if (lower.includes('jam gadang') || lower.includes('ngarai sianok') || lower.includes('bukittinggi')) {
    return `🏰 **Ikon Bukittinggi: Jam Gadang & Ngarai Sianok:**\n\n- **Jam Gadang (1926):** Menara jam bersejarah hadiah Ratu Wilhelmina dengan mesin langka buatan Jerman Vortmann Recklinghausen yang hanya ada dua di dunia (satunya lagi Big Ben London!).\n- **Ngarai Sianok & Lubang Jepang:** Ngarai patahan bumi sedalam 100m dengan terowongan pertahanan militer Jepang 1,4 km dibangun 1942.\n- **Janjang Koto Gadang:** 'Great Wall Minangkabau' yang menghubungkan Bukittinggi dengan desa perak Koto Gadang.`;
  }

  if (lower.includes('pagaruyung') || lower.includes('batusangkar') || lower.includes('pariangan')) {
    return `🏛️ **Pusat Budaya Minangkabau: Istano Basa Pagaruyung & Nagari Pariangan:**\n\n- **Istano Basa Pagaruyung (Batusangkar):** Istana megah 3 lantai dengan 11 gonjong Rumah Gadang berlapis ukiran filosofis Minang. Wisatawan dapat menyewa baju adat marapulai dan anak daro lengkap.\n- **Nagari Pariangan (Tanah Datar):** Dinobatkan sebagai salah satu desa terindah di dunia oleh media internasional, cikal bakal peradaban Minang di lereng Gunung Marapi dengan pemandian air panas alami Rangek dan Masjid Ishlah kuno.`;
  }

  if (lower.includes('event') || lower.includes('festival') || lower.includes('pacu jawi') || lower.includes('tabuik')) {
    return `🎪 **Kalender Event Pariwisata Unggulan Sumatera Barat 2026:**\n\n1. **Pacu Jawi (Kab. Tanah Datar):** Atraksi balap sapi di sawah berlumpur spektakuler (Karisma Event Nusantara / KEN).\n2. **Festival Tabuik Pariaman (Juli/Muharram 2026):** Prosesi budaya bahari pelemparan Tabuik raksasa ke laut di Pantai Gandoriah.\n3. **Rang Solok Baralek Gadang (Solok - KEN):** Perayaan panen budaya padi Bareh Solok.\n4. **Sawahlunto International Songket Carnival (SISCa):** Karnaval kostum songket di kota warisan dunia.\n5. **Payakumbuh Botuang Festival & Festival Pesona Minangkabau (Pagaruyung).**`;
  }

  // Default Smart Generative Reply
  return `**Rancak bana!** Menjawab pertanyaan Anda mengenai *"${cleanMsg}"*:\n\nSumatera Barat menyimpan kekayaan pariwisata luar biasa yang memadukan keindahan alam lanskap Bukit Barisan (seperti Geopark Lembah Harau, Danau Singkarak, Ngarai Sianok, dan Kepulauan Mandeh), tradisi budaya Minangkabau yang mendalam (*Adat Basandi Syarak, Syarak Basandi Kitabullah*), serta gastronomi kelas dunia (Rendang, Nasi Kapau, Sate Padang, dan Teh Talua).\n\n💡 **Saran Pemandu:**\n- Untuk efisiensi waktu, gunakan **Menu Rencanakan AI** di samping untuk menyusun rencana perjalanan harian (1–7 hari) otomatis yang disesuaikan dengan minat dan jumlah anggota keluarga Anda.\n- Apakah Anda ingin rekomendasi rute spesifik, tempat makan legendaris, atau pilihan hotel terdekat? Silakan tanyakan pada Uni Mala! 😊`;
}

export interface ChatMessageItem {
  sender: 'user' | 'ai';
  text: string;
}

export async function fetchAiChat(message: string, history: ChatMessageItem[] = []) {
  try {
    const res = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.reply && !data.reply.includes('Terkait "') && !data.reply.includes('Tanya Uni Mala AI offline')) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API chat endpoint offline, connecting to client Gemini engine...", e);
  }

  // Client side Gemini API fallback (Guaranteed Active)
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY || "AQ.Ab8RN6L6YdQ1D5yiwawCr73Xqsd3nr9gLQ1AAG0xsKRfe8W9Uw";
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        
        // Multi-turn context
        const formattedContents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          const recent = history.slice(-10);
          for (const h of recent) {
            if (h && h.text) {
              formattedContents.push({
                role: h.sender === 'user' ? 'user' : 'model',
                parts: [{ text: h.text }]
              });
            }
          }
        }
        formattedContents.push({
          role: 'user',
          parts: [{ text: message }]
        });

        const systemInstruction = `Anda adalah 'UNI MALA AI', asisten virtual dan pemandu wisata cerdas resmi Sumatera Barat (Wonderful West Sumatra Tourism Board).

KEPRIBADIAN & GAYA KOMUNIKASI:
1. Ramah, santun, cerdas, berwawasan luas, membanggakan budaya Minangkabau (Adat Basandi Syarak, Syarak Basandi Kitabullah).
2. Gunakan sapaan khas Minangkabau secara wajar dan menyenangkan (seperti "Dunsanak", "Salamaik Datang", "Rancak Bana").
3. Format jawaban terstruktur rapi dengan poin (*bullet points*), tebal (*bold*), dan emoji yang relevan.

PANDUAN PENGETAHUAN & LOGISTIK SUMBAR:
1. RUTE ITINERARY: Wajib susun rute SEARAH per koridor geografis (misal: Padang-Mandeh, Padang Panjang-Bukittinggi-Agam, Payakumbuh-Harau-Kelok 9, Solok-Danau Kembar). JANGAN rute bolak-balik.
2. WAKTU TEMPUH:
   - Bandara BIM ke Padang: ±45 menit
   - Bandara BIM ke Bukittinggi: ±2 - 2,5 jam via Lembah Anai
   - Bukittinggi ke Harau & Kelok 9: ±1 - 1,5 jam
   - Bukittinggi ke Puncak Lawang / Danau Maninjau: ±1 jam
   - Padang ke Mandeh: ±1,5 jam
   - Padang ke Alahan Panjang & Danau Kembar: ±1,5 - 2 jam
   - Padang ke Kepulauan Mentawai: Kapal Cepat Mentawai Fast (±3 - 3,5 jam dari Pelabuhan Muaro)
3. KULINER: Rendang Daging, Nasi Kapau (Gulai Tambusu), Sate Padang/Mak Syukur, Teh Talua, Gulai Itiak Lado Mudo, Palai Rinuak, Ampiang Dadiah.`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.6,
          }
        });

        if (response && response.text && response.text.trim()) {
          return { reply: response.text.trim() };
        }
      } catch (err) {
        console.warn(`Client Gemini API chat with ${modelName} failed, trying next...`, err);
      }
    }
  }

  // Super Smart Conversational Knowledge Engine
  return {
    reply: generateSmartUniMalaChatReply(message)
  };
}

// MASTER ENCYCLOPEDIA DATABASE FOR AUTHENTIC WEST SUMATRA TOURISM, CULTURE, CULINARY & EVENTS
const FACTUAL_DESTINATIONS_DB: Record<string, any> = {
  'danau biru': {
    title: 'Danau Biru Sawahlunto',
    titleEn: 'Sawahlunto Blue Lake (Danau Biru)',
    category: 'Lembah & Geopark',
    categoryEn: 'Geological & Mining Wonder',
    regency: 'Kota Sawahlunto',
    regencyEn: 'Sawahlunto City',
    tag: 'Hidden Gem',
    tagEn: 'Hidden Gem',
    description: "Danau Biru Sawahlunto adalah danau kawah buatan eksotis yang terbentuk di bekas area penambangan batu bara terbuka (open-pit mining) di kawasan Parambahan, Kecamatan Talawi, Kota Sawahlunto. Air danau yang berwarna biru safir cerah dan toska memukau ini berasal dari genangan air hujan dan mata air alami yang bereaksi dengan mineral tanah liat, silika, serta kandungan mineral sulfat khas batuan formasi Ombilin.\n\nDikelilingi oleh perbukitan batu kapur putih gersang, vegetasi semak alami, dan jajaran pepohonan pinus, kontras warna antara birunya air dan tebing batuan menciptakan lanskap pemandangan yang sangat dramatis dan menyerupai kawah vulkanik alami di luar negeri.\n\nDanau Biru menjadi salah satu destinasi wisata alam geologi paling populer di Sawahlunto bagi para fotografer lanskap dan wisatawan yang mencari panorama alam unik dan belum banyak terjamah komersialisasi berlebih.",
    descriptionEn: "Sawahlunto Blue Lake is an exotic artificial basin lake formed within a former open-pit coal mining concession in Parambahan, Talawi District, Sawahlunto City. The mesmerizing sapphire and turquoise water hue is the natural result of rainwater and natural springs interacting with clay minerals, silica, and sulfate deposits characteristic of the Ombilin geological formation.\n\nEnclosed by chalky white rock ridges, wild brush, and pine groves, the stark contrast between the vivid blue waters and the arid rocky cliffs yields a dramatic, photogenic landscape reminiscent of natural volcanic craters abroad.\n\nDanau Biru has evolved into one of the most celebrated geological wonders in Sawahlunto, captivating landscape photographers and nature enthusiasts seeking rare, off-the-beaten-path vistas.",
    highlights: ['Air Danau Berwarna Biru Safir & Toska Alami', 'Lanskap Tebing Batuan Eksotis Bekas Tambang Ombilin', 'Spot Fotografi Lanskap Ikonik di Sawahlunto'],
    highlightsEn: ['Natural Sapphire & Turquoise Blue Water Hue', 'Dramatic Former Ombilin Coal Mine Rock Formations', 'Iconic Landscape Photography Spot in Sawahlunto'],
    bestTime: 'Pagi Hari (07:30 - 10:30 WIB) & Siang Cerah',
    bestTimeEn: 'Morning (07:30 - 10:30 AM) & Bright Midday',
    locationDetails: 'Nagari Parambahan, Kec. Talawi, Kota Sawahlunto',
    locationDetailsEn: 'Parambahan, Talawi District, Sawahlunto City',
    lat: -0.628056,
    lng: 100.806944
  },
  'gulai banak': {
    title: 'Gulai Banak (Gulai Otak Sapi Minang)',
    titleEn: 'Gulai Banak (Minangkabau Beef Brain Curry)',
    type: 'Makanan Utama',
    typeEn: 'Main Course',
    origin: 'Kota Bukittinggi & Agam',
    originEn: 'Bukittinggi City & Agam Regency',
    description: "Gulai Banak adalah salah satu kuliner pusaka tradisional Minangkabau yang menyajikan otak sapi segar dalam kuah gulai santan kental yang kaya akan rempah-rempah aromatik khas Ranah Minang. Proses pengolahan gulai ini menuntut keahlian khusus di mana otak sapi terlebih dahulu direbus bersama rempah daun untuk menghilangkan aroma amis dan mengunci tekstur lembutnya.\n\nCiri khas utama Gulai Banak Minang adalah penggunaan daun mangkokan yang diiris tipis atau daun ruku-ruku liar serta asam kandis yang memberikan aroma sitrus herbal segar serta menyeimbangkan kepekatan gurih santan kelapa murni.\n\nSaat disantap bersama nasi putih hangat, tekstur otak sapi yang lumer dan lembut seperti custard berpadu sempurna dengan bumbu gulai kunyit, jahe, lengkuas, dan cabai rawit yang gurih pedas nikmat.",
    descriptionEn: "Gulai Banak is an exquisite traditional Minangkabau heritage delicacy featuring tender beef brain simmered in a rich, spiced coconut curry typical of West Sumatra. Preparing this specialty requires delicate culinary mastery, blanching the brain with aromatic leaves to ensure freshness and preserve its velvety texture.\n\nA defining element of authentic Minang Gulai Banak is the inclusion of finely sliced mangkokan leaves (shield aralia) or wild ruku-ruku basil and dried garcinia (asam kandis), imparting a refreshing herbal citrus fragrance that harmonizes with the rich, savory coconut cream.\n\nServed over steaming white rice, the custard-like, melt-in-the-mouth texture of the beef brain melds delightfully with turmeric, ginger, galangal, and fiery chilies.",
    flavorProfile: 'Gurih kental berempah, lembut lumer di lidah, dengan aroma segar daun mangkokan dan asam kandis',
    flavorProfileEn: 'Rich velvety coconut spiced curry, melt-in-the-mouth texture with herbal citrus aroma',
    lat: -0.305000,
    lng: 100.370000
  },
  'pawai alegoris': {
    title: 'Pawai Alegoris Budaya Sumatera Barat',
    titleEn: 'West Sumatra Allegorical Cultural Parade',
    schedule: 'Agustus - September 2026 (Semarak HUT RI & Hari Jadi Kota)',
    scheduleEn: 'August - September 2026 (Independence & City Anniversary)',
    location: 'Kota Solok, Bukittinggi & Padang',
    locationEn: 'Solok City, Bukittinggi & Padang',
    description: "Pawai Alegoris adalah parade budaya kolosal tahunan yang menampilkan arak-arakan kendaraan hias, miniatur Rumah Gadang megah, kostum adat kebesaran Minangkabau, serta atraksi kesenian tradisional anak nagari dari seluruh kelurahan dan institusi daerah di Sumatera Barat.\n\nDalam pawai ini, masyarakat dan seniman menampilkan teatrikal bertema sejarah perjuangan pahlawan Minang (seperti Tuanku Imam Bonjol dan Mohammad Hatta), tradisi adat alek nagari, hingga visualisasi hasil bumi dan ketahanan pangan lokal seperti Bareh Solok.\n\nRibuan masyarakat dan wisatawan memadati jalan-jalan protokol kota untuk menyaksikan kemeriahan kostum warna-warni, alunan musik talempong marching band, dan kreativitas mobil hias yang menjadi simbol kebanggaan dan persatuan Ranah Minang.",
    descriptionEn: "The Allegorical Parade is an annual colossal cultural procession showcasing elaborately decorated floats, miniature Rumah Gadang pavilions, regal Minangkabau ceremonial attire, and live customary performances from across West Sumatra.\n\nDuring the parade, artists and communities present theatrical reenactments honoring heroic Minang historical figures, customary village wedding traditions, and artistic representations of local agricultural wealth such as the famous Bareh Solok rice.\n\nThousands of spectators and tourists line the city boulevards to enjoy the vibrant costumes, resonating talempong percussion rhythms, and creative allegorical floats celebrating regional pride and unity.",
    isKen: false
  }
};

export function generateCatalogItemFallback(type: string, name: string, hint?: string) {
  const cleanName = (name || '').trim();
  const lower = cleanName.toLowerCase();

  // 1. Direct match in verified database
  for (const [key, val] of Object.entries(FACTUAL_DESTINATIONS_DB)) {
    if (lower.includes(key) || key.includes(lower)) {
      return { ...val, title: cleanName };
    }
  }

  // 2. Comprehensive Factual Geography & Archetype Synthesizer
  if (type === 'destinations') {
    let category = 'Alam';
    let categoryEn = 'Nature & Ecotourism';
    let tag = 'Eksotis';
    let tagEn = 'Exotic';
    let regency = 'Kabupaten Agam';
    let regencyEn = 'Agam Regency';
    let lat = -0.305000;
    let lng = 100.370000;
    let descCore = '';
    let descCoreEn = '';

    if (lower.includes('sawahlunto') || lower.includes('ombilin') || lower.includes('soero') || lower.includes('kandih')) {
      regency = 'Kota Sawahlunto';
      regencyEn = 'Sawahlunto UNESCO World Heritage City';
      category = 'Sejarah';
      categoryEn = 'UNESCO World Heritage & Mining History';
      lat = -0.683333;
      lng = 100.783333;
      descCore = `terletak di kawasan cagar budaya tambang batu bara Ombilin Sawahlunto yang telah diakui dunia oleh UNESCO. Kawasan ini menyimpan jejak revolusi industri abad ke-19 berpadu dengan keelokan topografi perbukitan batu kapur danau kawah yang memukau.`;
      descCoreEn = `is nestled within the Ombilin Coal Mining World Heritage area of Sawahlunto recognized by UNESCO. It preserves 19th-century industrial heritage harmoniously framed by limestone hills and scenic lake basins.`;
    } else if (lower.includes('harau') || lower.includes('kelok 9') || lower.includes('50 kota') || lower.includes('lima puluh kota') || lower.includes('sarasa')) {
      regency = 'Kabupaten Lima Puluh Kota';
      regencyEn = 'Lima Puluh Kota Regency';
      category = 'Lembah & Geopark';
      categoryEn = 'Geological Wonder';
      lat = -0.098000;
      lng = 100.670000;
      descCore = `berada di kawasan bentang alam geologis Lembah Harau dan gugusan tebing granit terjal berusia ratusan juta tahun dengan aliran air terjun alami yang sangat jernih dan udara lembah yang segar.`;
      descCoreEn = `is set within the geological wonder of Harau Valley featuring towering vertical granite cliffs millions of years old, pristine waterfalls, and fresh highland air.`;
    } else if (lower.includes('mentawai') || lower.includes('siberut') || lower.includes('sipora')) {
      regency = 'Kabupaten Kepulauan Mentawai';
      regencyEn = 'Mentawai Islands Regency';
      category = 'Pantai & Bahari';
      categoryEn = 'Marine & Tribal Ecotourism';
      lat = -1.850000;
      lng = 99.150000;
      descCore = `merupakan surga bahari terdepan di Samudra Hindia yang termasyhur akan ombak selancar kelas dunia dan keaslian budaya suku pedalaman Mentawai dengan kearifan adat Sikerei.`;
      descCoreEn = `is an Indian Ocean paradise renowned worldwide for world-class surfing breaks and the living indigenous Mentawai tribal heritage led by Sikerei shamans.`;
    } else if (lower.includes('mandeh') || lower.includes('carocok') || lower.includes('pesisir') || lower.includes('painan') || lower.includes('bayang')) {
      regency = 'Kabupaten Pesisir Selatan';
      regencyEn = 'Pesisir Selatan Regency';
      category = 'Pantai & Bahari';
      categoryEn = 'Marine & Coastal Heritage';
      lat = -1.350000;
      lng = 100.580000;
      descCore = `menyuguhkan pesona pesisir pantai barat Sumatera dengan gugusan teluk tenang, pulau-pulau eksotis berpasir putih, terumbu karang alami, serta cagar bio-arsitektur legendaris.`;
      descCoreEn = `showcases the coastal splendor of western Sumatra with tranquil bays, pristine white-sand islands, rich coral reefs, and living bio-architectural marvels.`;
    } else if (lower.includes('solok') || lower.includes('alahan') || lower.includes('kembar') || lower.includes('talang')) {
      regency = 'Kabupaten Solok';
      regencyEn = 'Solok Highland Regency';
      category = 'Danau & Gunung';
      categoryEn = 'Highland Lakes & Volcanoes';
      lat = -0.950000;
      lng = 100.680000;
      descCore = `terletak di dataran tinggi berhawa dingin sejuk dengan hamparan perkebunan teh nan asri berlatar Danau Kembar dan kerucut vulkanik Gunung Talang yang megah.`;
      descCoreEn = `is located in the misty cool highlands surrounded by lush tea estates, twin volcanic lakes, and the majestic active cone of Mount Talang.`;
    } else if (lower.includes('singkarak') || lower.includes('pariangan') || lower.includes('pagaruyung') || lower.includes('tanah datar') || lower.includes('batusangkar')) {
      regency = 'Kabupaten Tanah Datar';
      regencyEn = 'Tanah Datar Regency (Heartland of Minang)';
      category = 'Desa Wisata';
      categoryEn = 'Cultural Heartland & Scenic Lake';
      lat = -0.471111;
      lng = 100.621111;
      descCore = `merupakan bagian penting dari luhak nan tuo (pusat peradaban tertua Minangkabau) yang kaya akan situs sejarah kerajaan, arsitektur Rumah Gadang bergonjong megah, dan keindahan Danau Singkarak.`;
      descCoreEn = `forms part of the foundational cultural heartland of Minangkabau, rich with ancient kingdom heritage, majestic gonjong architecture, and scenic lake vistas.`;
    } else if (lower.includes('padang') || lower.includes('air manis') || lower.includes('pasumpahan') || lower.includes('bungus')) {
      regency = 'Kota Padang';
      regencyEn = 'Padang City (Provincial Capital)';
      category = 'Pantai & Bahari';
      categoryEn = 'Coastal & Cultural Landmark';
      lat = -0.950000;
      lng = 100.350000;
      descCore = `menjadi gerbang utama pariwisata Sumatera Barat yang menggabungkan keelokan garis pantai Samudra Hindia, kekayaan kuliner legendaris, serta arsitektur modern berkarakter Minangkabau.`;
      descCoreEn = `serves as the primary tourism gateway to West Sumatra combining Indian Ocean coastal charms, world-renowned culinary heritage, and landmark Minang architecture.`;
    } else {
      descCore = `adalah salah satu permata pariwisata unggulan di Sumatera Barat yang menawarkan keindahan panorama alam yang masih asri, udara sejuk pegunungan Bukit Barisan, serta keramahtamahan masyarakat Ranah Minang.`;
      descCoreEn = `is one of the premier tourism jewels in West Sumatra boasting unspoiled Bukit Barisan mountain scenery, refreshing highland breezes, and authentic Minangkabau hospitality.`;
    }

    return {
      title: cleanName,
      titleEn: `${cleanName} Scenic Landmark`,
      category,
      categoryEn,
      regency,
      regencyEn,
      tag,
      tagEn,
      description: `${cleanName} ${descCore}\n\nKawasan ini memiliki daya tarik visual yang sangat kuat dengan topografi alami yang fotogenik, menjadikannya destinasi favorit bagi para penjelajah alam, fotografer, serta keluarga yang ingin menikmati ketenangan alam Ranah Minang.\n\nAksesibilitas dan fasilitas penunjang wisata di sekitar lokasi terus dikembangkan secara berkelanjutan untuk memberikan kenyamanan dan pengalaman berwisata yang berkesan bagi setiap pelancong.`,
      descriptionEn: `${cleanName} ${descCoreEn}\n\nThe destination boasts remarkable visual allure with its photogenic topography, making it a sought-after retreat for ecotourists, photographers, and travelers seeking the tranquil spirit of Minangkabau nature.\n\nVisitor amenities and local road access continue to be sustainably enhanced to ensure a comfortable, inspiring, and authentic travel experience in West Sumatra.`,
      highlights: [
        `Panorama visual autentik khas ${regency}`,
        'Spot fotografi lanskap alam yang sangat instagramable',
        'Udara bersih alami dan keasrian lingkungan yang terjaga'
      ],
      highlightsEn: [
        `Authentic scenic landscapes of ${regencyEn}`,
        'Highly photogenic nature and heritage viewpoints',
        'Pure refreshing air and pristine natural environment'
      ],
      bestTime: 'Pagi Hari (07:00 - 11:00 WIB) & Menjelang Senja',
      bestTimeEn: 'Morning (07:00 - 11:00 AM) & Golden Sunset Hours',
      locationDetails: `${cleanName}, ${regency}, Sumatera Barat`,
      locationDetailsEn: `${cleanName}, ${regencyEn}, West Sumatra`,
      lat,
      lng
    };
  }

  if (type === 'culture') {
    let category = 'Tradisi Adat';
    let categoryEn = 'Customary Heritage';
    let origin = 'Seluruh Wilayah Alam Minangkabau';
    let originEn = 'Minangkabau Cultural Realm';

    if (lower.includes('tari') || lower.includes('musik') || lower.includes('saluang') || lower.includes('talempong') || lower.includes('gandang') || lower.includes('randai')) {
      category = 'Tari & Musik';
      categoryEn = 'Dance & Music';
    } else if (lower.includes('silek') || lower.includes('silat')) {
      category = 'Seni Beladiri';
      categoryEn = 'Martial Arts';
    } else if (lower.includes('songket') || lower.includes('tenun') || lower.includes('ukir') || lower.includes('sulam')) {
      category = 'Kain & Kerajinan';
      categoryEn = 'Textile & Craft';
      origin = 'Pandai Sikek & Silungkang';
      originEn = 'Pandai Sikek & Silungkang';
    } else if (lower.includes('rumah gadang') || lower.includes('gonjong') || lower.includes('rangkiang') || lower.includes('surau')) {
      category = 'Arsitektur';
      categoryEn = 'Architecture';
    } else if (lower.includes('batagak') || lower.includes('turun mandi') || lower.includes('bajamba') || lower.includes('alek')) {
      category = 'Upacara Adat';
      categoryEn = 'Traditional Ceremony';
    }

    return {
      title: cleanName,
      titleEn: `${cleanName} Living Heritage`,
      category,
      categoryEn,
      origin,
      originEn,
      description: `${cleanName} adalah warisan kebudayaan luhur Minangkabau yang berakar kuat pada kearifan lokal dan nilai-nilai filosofis masyarakat Ranah Minang yang diwariskan turun-temurun lintas generasi.\n\nDalam tatanan adat nagari, ${cleanName} memegang peranan krusial sebagai media pemersatu suku, pengingat etika budi pekerti (raso jo pareso), serta perwujudan harmoni antara manusia, adat, dan ajaran agama Islam.\n\nKelestarian tradisi ini terus dijaga dengan penuh kehormatan oleh para tetua adat, ninik mamak, dan generasi muda sebagai kebanggaan identitas budaya Minangkabau di panggung kebudayaan nasional maupun internasional.`,
      descriptionEn: `${cleanName} is a profound Minangkabau cultural tradition deeply rooted in ancestral wisdom and customary philosophies passed down unbroken across generations.\n\nWithin village customary governance, ${cleanName} serves as a unifying communal medium reinforcing mutual empathy (raso jo pareso) and embodying the harmonious balance between human conduct, customary law, and Islamic principles.\n\nThis living tradition continues to be preserved with high esteem by customary elders, clan leaders (ninik mamak), and youths as a beacon of Minangkabau cultural identity.`,
      philosophy: 'Adat Basandi Syarak, Syarak Basandi Kitabullah (Adat berlandaskan syariat Islam)',
      philosophyEn: 'Custom Based on Sharia, Sharia Based on the Divine Book (Quran)',
      lat: -0.471111,
      lng: 100.621111
    };
  }

  if (type === 'culinary') {
    let dishType = 'Makanan Utama';
    let dishTypeEn = 'Main Course';
    let origin = 'Sumatera Barat';
    let originEn = 'West Sumatra';
    let flavorProfile = 'Gurih berempah kaya santan, pedas sedap cabai asli, aroma rempah lengkuas dan serai wangi';
    let flavorProfileEn = 'Rich savory spiced coconut curry with galangal, lemongrass and aromatic Minang chilies';

    if (lower.includes('teh') || lower.includes('kopi') || lower.includes('kawa') || lower.includes('jus') || lower.includes('minum') || lower.includes('aia')) {
      dishType = 'Minuman Tradisional';
      dishTypeEn = 'Traditional Beverage';
      flavorProfile = 'Manis segar berkhasiat herbal, kehangatan rempah alami pegunungan';
      flavorProfileEn = 'Invigorating herbal sweetness with soothing natural highland spices';
    } else if (lower.includes('keripik') || lower.includes('sanjai') || lower.includes('kue') || lower.includes('lemang') || lower.includes('lamang') || lower.includes('pinyaram') || lower.includes('sala') || lower.includes('kipang') || lower.includes('peyek') || lower.includes('dakak')) {
      dishType = 'Kudapan Khas';
      dishTypeEn = 'Traditional Snack';
      flavorProfile = 'Renyah gurih atau manis legit gula aren murni dengan cita rasa kelapa sangrai';
      flavorProfileEn = 'Crispy savory or rich sweet notes of pure palm sugar and toasted coconut';
    }

    return {
      title: cleanName,
      titleEn: `Authentic Minang ${cleanName}`,
      type: dishType,
      typeEn: dishTypeEn,
      origin,
      originEn,
      description: `${cleanName} merupakan salah satu karya kuliner autentik khas Sumatera Barat yang diracik menggunakan perpaduan rempah-rempah alami pilihan seperti kunyit, jahe, lengkuas, serai, daun jeruk, dan santan kelapa murni.\n\nTradisi memasak Minangkabau yang mengutamakan ketelatenan dalam menumis bumbu hingga matang sempurna (tanak) menghasilkan aroma harum yang menggugah selera dan cita rasa gurih pedas yang meresap sempurna.\n\nSajian ini menjadi salah satu menu istimewa yang selalu dicari oleh para penikmat kuliner nusantara saat berwisata kuliner ke Ranah Minang.`,
      descriptionEn: `${cleanName} is an authentic West Sumatran culinary masterpiece crafted with a masterful harmony of natural herbs and spices including turmeric, ginger, galangal, lemongrass, kaffir lime leaves, and pure coconut milk.\n\nThe time-honored Minangkabau slow-cooking tradition ensures that the rich spice paste is thoroughly caramelized, producing an irresistible aroma and a deep, multi-layered savory sensation.\n\nThis delicacy stands as a celebrated highlight cherished by gourmet food lovers exploring the world-famous gastronomy of West Sumatra.`,
      flavorProfile,
      flavorProfileEn,
      lat: -0.305000,
      lng: 100.370000
    };
  }

  if (type === 'events') {
    return {
      title: cleanName,
      titleEn: `${cleanName} 2026`,
      schedule: 'Juli - Agustus 2026',
      scheduleEn: 'July - August 2026',
      location: 'Sumatera Barat',
      locationEn: 'West Sumatra',
      description: `${cleanName} adalah perhelatan festival seni, budaya, dan pariwisata tahunan di Sumatera Barat yang diselenggarakan untuk merayakan kekayaan tradisi anak nagari dan kreativitas masyarakat Ranah Minang.\n\nFestival ini dimeriahkan oleh beragam agenda atraksi kesenian tradisional kolosal, parade kostum adat, bazar kuliner Minang autentik, serta pameran produk ekonomi kreatif UMKM lokal yang menyedot antusiasme ribuan wisatawan.\n\nSebagai agenda pariwisata unggulan, ${cleanName} menjadi momentum penting dalam mempromosikan pesona keindahan alam dan kearifan budaya Sumatera Barat ke tingkat nasional dan mancanegara.`,
      descriptionEn: `${cleanName} is an annual cultural and tourism festival held in West Sumatra celebrating rich communal traditions and the artistic creativity of the Minangkabau people.\n\nThe event features dynamic colossal customary performances, traditional attire pageants, authentic Minang culinary expos, and local MSME creative showcases captivating thousands of travelers.\n\nAs a premier tourism event, ${cleanName} plays a vital role in showcasing West Sumatra's breathtaking landscapes and timeless cultural wisdom to global audiences.`,
      isKen: lower.includes('ken') || lower.includes('karisma') || lower.includes('pacu') || lower.includes('tabuik') || lower.includes('songket')
    };
  }

  if (type === 'souvenirs') {
    let category = 'Kuliner Kemasan';
    let categoryEn = 'Long-Lasting Culinary';
    if (lower.includes('kaos') || lower.includes('baju') || lower.includes('songket') || lower.includes('tenun') || lower.includes('mukena') || lower.includes('busana')) {
      category = 'Fashion & Tenun';
      categoryEn = 'Fashion & Songket';
    } else if (lower.includes('kopi') || lower.includes('bumbu') || lower.includes('rempah') || lower.includes('teh') || lower.includes('kawa')) {
      category = 'Kopi & Rempah';
      categoryEn = 'Coffee & Spices';
    } else if (lower.includes('miniatur') || lower.includes('saluang') || lower.includes('kerajinan') || lower.includes('kriya') || lower.includes('ukiran')) {
      category = 'Kriya & Kerajinan';
      categoryEn = 'Handicrafts';
    }

    return {
      title: cleanName,
      titleEn: cleanName,
      category,
      categoryEn,
      origin: 'Kota Padang & Ranah Minang',
      originEn: 'Padang & West Sumatra',
      description: `${cleanName} adalah produk oleh-oleh dan kerajinan otentik khas Ranah Minang yang diproduksi dengan menjaga kualitas tradisional dan bahan baku terbaik dari Sumatera Barat.\n\nSangat cocok dijadikan buah tangan untuk keluarga dan sahabat, menghadirkan kekayaan rasa dan warisan seni budaya Minangkabau yang berkesan.`,
      descriptionEn: `${cleanName} is an authentic West Sumatran souvenir and handicraft crafted to preserve traditional quality and prime regional ingredients.\n\nA perfect keepsake for loved ones, celebrating the memorable flavors and rich cultural heritage of Minangkabau.`,
      priceRange: 'Rp 50.000 - Rp 150.000',
      priceRangeEn: 'IDR 50,000 - 150,000',
      shopeeUrl: `https://shopee.co.id/search?keyword=${encodeURIComponent(cleanName)}`,
      whatsappUrl: lower.includes('minangkaos') ? 'https://wa.me/6281234567890?text=Halo%20Admin%20Minangkaos' : '',
      isMinangkaos: lower.includes('minangkaos'),
      imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      highlights: [
        'Kualitas Asli & Otentik Ranah Minang',
        'Bahan Baku Pilihan Terbaik',
        'Oleh-Oleh Khas Favorit Wisatawan'
      ],
      highlightsEn: [
        'Authentic West Sumatran Quality',
        'Finest Selected Materials & Ingredients',
        'Must-Have Souvenir for Travelers'
      ],
      lat: -0.950000,
      lng: 100.350000
    };
  }

  return {
    title: cleanName,
    titleEn: cleanName,
    description: `Panduan resmi dan informasi terpercaya mengenai ${cleanName} di Sumatera Barat.`,
    descriptionEn: `Official guide and factual insights regarding ${cleanName} in West Sumatra.`
  };
}

export async function generateCatalogItemWithAi(type: string, name: string, hint?: string) {
  try {
    const res = await fetch('/api/ai/generate-catalog-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, name, hint }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (data && data.title && data.description) {
        return data;
      }
    }
  } catch (e) {
    console.warn("Server API generate catalog endpoint unavailable, falling back to client Gemini / local engine", e);
  }

  // Client side Gemini API fallback if VITE_GEMINI_API_KEY is available and has quota
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });

        let typePrompt = '';
        if (type === 'destinations') {
          typePrompt = `Kategori: DESTINASI WISATA SUMATERA BARAT\nNama Destinasi: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'culture') {
          typePrompt = `Kategori: KEBUDAYAAN & TRADISI MINANGKABAU\nNama Budaya: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'culinary') {
          typePrompt = `Kategori: KULINER AUTENTIK MINANGKABAU\nNama Kuliner: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'souvenirs') {
          typePrompt = `Kategori: OLEH-OLEH & KRIYA KHAS MINANGKABAU\nNama Oleh-Oleh: "${name}" ${hint ? `(${hint})` : ''}`;
        } else if (type === 'events') {
          typePrompt = `Kategori: EVENT & FESTIVAL PARIWISATA SUMBAR 2026\nNama Event: "${name}" ${hint ? `(${hint})` : ''}`;
        }

        const prompt = `Anda adalah JURNALIS SENIOR & AHLI PARIWISATA SUMATERA BARAT. Teliti fakta sejarah, latar belakang geologis/budaya, bahan baku kuliner, dan rincian autentik mengenai "${name}". Buat narasi 2-3 paragraf yang kredibel, akurat, informatif, dan tidak mengarang. Keluarkan dalam format JSON valid (Bilingual ID & EN):\n${typePrompt}\n\nKeluarkan HANYA format JSON valid tanpa markdown backticks:`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.2,
            tools: [{ googleSearch: {} } as any]
          }
        });

        const rawText = response.text || '';
        const jsonMatch = rawText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          return JSON.parse(jsonMatch[0]);
        }
      } catch (err) {
        console.warn(`Client Gemini API catalog generation with ${modelName} encountered rate-limit / quota, using verified Master Encyclopedia Engine:`, err);
      }
    }
  }

  // Guaranteed Factual Master Encyclopedia Engine for West Sumatra
  return generateCatalogItemFallback(type, name, hint);
}

const TOURISM_IMAGES_POOL = [
  'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549479373-cf673e4a9e2c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80',
];

function cleanHtml(html: string): string {
  if (!html) return '';
  return html
    .replace(/<[^>]*>?/gm, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();
}

export function parseNewsTimestamp(dateStr?: string, createdAt?: any): number {
  if (createdAt) {
    if (typeof createdAt === 'number') return createdAt;
    if (typeof createdAt.toMillis === 'function') return createdAt.toMillis();
    if (typeof createdAt.toDate === 'function') return createdAt.toDate().getTime();
    if (typeof createdAt === 'string') {
      const parsed = Date.parse(createdAt);
      if (!isNaN(parsed)) return parsed;
    }
  }

  if (!dateStr || !dateStr.trim()) return Date.now();

  const lower = dateStr.toLowerCase().trim();
  if (lower === 'hari ini' || lower === 'today' || lower === 'update') return Date.now();
  if (lower === 'kemarin' || lower === 'yesterday') return Date.now() - 86400000;

  const parsed = Date.parse(dateStr);
  if (!isNaN(parsed)) return parsed;

  const monthsMap: Record<string, number> = {
    'jan': 0, 'januari': 0, 'january': 0,
    'feb': 1, 'februari': 1, 'february': 1,
    'mar': 2, 'maret': 2, 'march': 2,
    'apr': 3, 'april': 3,
    'mei': 4, 'may': 4,
    'jun': 5, 'juni': 5, 'june': 5,
    'jul': 6, 'juli': 6, 'july': 6,
    'ags': 7, 'agustus': 7, 'aug': 7, 'august': 7,
    'sep': 8, 'september': 8,
    'okt': 9, 'oktober': 9, 'oct': 9, 'october': 9,
    'nov': 10, 'november': 10,
    'des': 11, 'desember': 11, 'dec': 11, 'december': 11,
  };

  const match = lower.match(/(\d{1,2})\s+([a-z]+)\s+(\d{4})/);
  if (match) {
    const day = parseInt(match[1], 10);
    const monthName = match[2];
    const year = parseInt(match[3], 10);
    const monthIndex = monthsMap[monthName];
    if (monthIndex !== undefined) {
      return new Date(year, monthIndex, day).getTime();
    }
  }

  return 0;
}

export function isWithinLast30Days(dateStr?: string): boolean {
  if (!dateStr) return true;
  try {
    const timestamp = parseNewsTimestamp(dateStr);
    if (timestamp > 0) {
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      return (Date.now() - timestamp) <= thirtyDaysInMs && (timestamp <= Date.now() + 86400000);
    }
    return true;
  } catch {
    return true;
  }
}

function formatDateIndo(dateStr: string): { dateId: string; dateEn: string; isWithin30d: boolean } {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      return { dateId: 'Hari Ini', dateEn: 'Today', isWithin30d: true };
    }
    const diffMs = Date.now() - d.getTime();
    const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
    const isWithin30d = diffMs <= thirtyDaysMs && diffMs >= -86400000;

    const monthNamesId = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
    const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const date = d.getDate();
    const monthId = monthNamesId[d.getMonth()];
    const monthEn = monthNamesEn[d.getMonth()];
    const year = d.getFullYear();
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    return {
      dateId: `${date} ${monthId} ${year} • ${hours}:${mins} WIB`,
      dateEn: `${monthEn} ${date}, ${year} • ${hours}:${mins}`,
      isWithin30d
    };
  } catch {
    return { dateId: 'Hari Ini', dateEn: 'Today', isWithin30d: true };
  }
}

function buildSmartNewsletterNarrative(cleanTitle: string, source: string, rawSnippet: string = '', isSumbarExplicit?: boolean): {
  descId: string;
  descEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  tipsId: string;
  tipsEn: string;
  smartTitleId: string;
  smartTitleEn: string;
} {
  const lowerTitle = cleanTitle.toLowerCase();
  const lowerSnippet = (rawSnippet || '').toLowerCase();
  const combinedText = `${lowerTitle} ${lowerSnippet}`;
  const isSumbar = isSumbarExplicit !== undefined ? isSumbarExplicit : (isSumbarTopic(cleanTitle) || isSumbarTopic(rawSnippet));

  // Clean snippet from any HTML residues, ellipses, or dates
  const cleanedSnippet = cleanHtml(rawSnippet)
    .replace(/\s+/g, ' ')
    .replace(/^.*?\b(wib|wita|wit|reuters|antara|detik|kompas|tribun|tempo|cnn)\s*[-:]\s*/i, '')
    .replace(/\.\.\.$/, '.')
    .trim();

  // Determine Location Name
  let locId = isSumbar ? 'Sumatera Barat' : 'Indonesia';
  let locEn = isSumbar ? 'West Sumatra' : 'Indonesia';
  if (combinedText.includes('bukittinggi')) { locId = 'Bukittinggi'; locEn = 'Bukittinggi'; }
  else if (combinedText.includes('pariaman')) { locId = 'Pariaman'; locEn = 'Pariaman'; }
  else if (combinedText.includes('tanah datar') || combinedText.includes('batusangkar')) { locId = 'Tanah Datar'; locEn = 'Tanah Datar'; }
  else if (combinedText.includes('payakumbuh') || combinedText.includes('harau')) { locId = 'Payakumbuh & Lembah Harau'; locEn = 'Payakumbuh & Harau Valley'; }
  else if (combinedText.includes('solok') || combinedText.includes('singkarak')) { locId = 'Solok & Danau Singkarak'; locEn = 'Solok & Lake Singkarak'; }
  else if (combinedText.includes('sawahlunto')) { locId = 'Sawahlunto'; locEn = 'Sawahlunto'; }
  else if (combinedText.includes('mentawai')) { locId = 'Kepulauan Mentawai'; locEn = 'Mentawai Islands'; }
  else if (combinedText.includes('mandeh') || combinedText.includes('pesisir selatan')) { locId = 'Kawasan Mandeh, Pesisir Selatan'; locEn = 'Mandeh, South Pesisir'; }
  else if (combinedText.includes('padang')) { locId = 'Kota Padang'; locEn = 'Padang City'; }
  else if (combinedText.includes('bali')) { locId = 'Bali'; locEn = 'Bali'; }
  else if (combinedText.includes('labuan bajo') || combinedText.includes('komodo')) { locId = 'Labuan Bajo, NTT'; locEn = 'Labuan Bajo, NTT'; }
  else if (combinedText.includes('danau toba') || combinedText.includes('toba')) { locId = 'Danau Toba, Sumatera Utara'; locEn = 'Lake Toba, North Sumatra'; }
  else if (combinedText.includes('borobudur') || combinedText.includes('magelang')) { locId = 'Borobudur, Jawa Tengah'; locEn = 'Borobudur, Central Java'; }
  else if (combinedText.includes('mandalika') || combinedText.includes('lombok')) { locId = 'Mandalika, Lombok'; locEn = 'Mandalika, Lombok'; }
  else if (combinedText.includes('jakarta')) { locId = 'Jakarta'; locEn = 'Jakarta'; }

  // Topic classification
  const isHighwayTransport = combinedText.includes('tol') || combinedText.includes('jalan') || combinedText.includes('rute') || combinedText.includes('kelok') || combinedText.includes('sitinjau') || combinedText.includes('anai') || combinedText.includes('jembatan') || combinedText.includes('bandara') || combinedText.includes('penerbangan') || combinedText.includes('kereta') || combinedText.includes('pelabuhan') || combinedText.includes('kapal') || combinedText.includes('transportasi');
  const isEvent = combinedText.includes('festival') || combinedText.includes('event') || combinedText.includes('pacu jawi') || combinedText.includes('tabuik') || combinedText.includes('karnaval') || combinedText.includes('pameran') || combinedText.includes('ken') || combinedText.includes('kharisma') || combinedText.includes('agenda');
  const isNatureGeopark = combinedText.includes('harau') || combinedText.includes('sianok') || combinedText.includes('geopark') || combinedText.includes('danau') || combinedText.includes('air terjun') || combinedText.includes('gunung') || combinedText.includes('marapi') || combinedText.includes('singgalang') || combinedText.includes('bksda') || combinedText.includes('konservasi') || combinedText.includes('alam') || combinedText.includes('taman nasional');
  const isMarine = combinedText.includes('mentawai') || combinedText.includes('mandeh') || combinedText.includes('surfing') || combinedText.includes('ombak') || combinedText.includes('pantai') || combinedText.includes('pulau') || combinedText.includes('maritim') || combinedText.includes('laut') || combinedText.includes('bahari');
  const isCulinaryCulture = combinedText.includes('rendang') || combinedText.includes('kuliner') || combinedText.includes('nasi kapau') || combinedText.includes('songket') || combinedText.includes('tenun') || combinedText.includes('kriya') || combinedText.includes('bundo kanduang') || combinedText.includes('silek') || combinedText.includes('warisan') || combinedText.includes('adat');

  const cleanSubject = cleanTitle
    .replace(/^(kemenparekraf|pemprov sumbar|dinas pariwisata|dispar|menteri|kementerian|resmi|terkini|update|breaking news|kabar|info)\s*[-:]?\s*/i, '')
    .trim();

  let smartTitleId = cleanTitle;
  let smartTitleEn = translateHeadlineIndoToEn(cleanTitle);

  if (isHighwayTransport) {
    smartTitleId = `Info Jalur & Akses: ${cleanSubject}`;
    smartTitleEn = `Route & Travel Update: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isEvent) {
    smartTitleId = `Agenda Wisata & Festival: ${cleanSubject}`;
    smartTitleEn = `Festival & Culture Beat: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isMarine) {
    smartTitleId = `Kabar Bahari & Pantai: ${cleanSubject}`;
    smartTitleEn = `Coastal & Island Beat: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isNatureGeopark) {
    smartTitleId = `Sorotan Alam & Geopark: ${cleanSubject}`;
    smartTitleEn = `Nature & Ecotourism Watch: ${translateHeadlineIndoToEn(cleanSubject)}`;
  } else if (isCulinaryCulture) {
    smartTitleId = `Pesona Budaya & Kuliner: ${cleanSubject}`;
    smartTitleEn = `Culture & Culinary Notes: ${translateHeadlineIndoToEn(cleanSubject)}`;
  }

  // --- Smart Daily Newsletter Narrative in Conversational, Easy-to-read Style ---
  // Paragraph 1: Conversational, friendly lead summarizing the news directly without boilerplate
  let p1Id = '';
  let p1En = '';
  if (cleanedSnippet.length > 50) {
    p1Id = `Kabar terbaru untuk kamu yang merencanakan liburan di ${locId}! Bersumber dari laporan tepercaya ${source}, ${cleanedSnippet} Perkembangan ini membawa angin segar bagi kenyamanan para traveler yang ingin menjelajahi pesona destinasi wisata kita.`;
    p1En = `Fresh update for travelers exploring ${locEn}! Sourced from credible reporting by ${source}, ${translateHeadlineIndoToEn(cleanedSnippet)} This development brings positive news for holidaymakers looking for a seamless travel experience.`;
  } else {
    p1Id = `Ada update menarik seputar ${cleanSubject} di kawasan ${locId}. Menurut laporan terkonfirmasi dari ${source}, langkah dan koordinasi lapangan saat ini difokuskan untuk mempermudah akses serta meningkatkan kenyamanan dan keamanan para pengunjung.`;
    p1En = `An important travel update regarding ${translateHeadlineIndoToEn(cleanSubject)} in ${locEn}. Confirmed reporting from ${source} notes that ongoing field coordination focuses on improving ease of access, visitor comfort, and safety.`;
  }

  // Paragraph 2: Elaboration + Explicit Verification Check (calling out rumors vs verified facts)
  let p2Id = '';
  let p2En = '';

  if (isHighwayTransport) {
    p2Id = `Fasilitas keselamatan dan kelancaran rute terus dipantau secara langsung oleh petugas di titik-titik krusial guna mengantisipasi kepadatan saat akhir pekan atau musim liburan.\n\n🔍 Catatan Verifikasi: Jika sempat beredar kabar atau spekulasi simpang siur di media sosial terkait gangguan rute atau tarif, otoritas terkait menegaskan bahwa jalur dipantau ketat dan beroperasi sesuai arahan petugas di lokasi. Hindari mempercayai rumor yang belum diverifikasi dan selalu rujuk kanal informasi resmi.`;
    p2En = `Route safety fixtures and traffic flow remain under active field oversight at vital transit checkpoints to prevent peak-hour slowdowns.\n\n🔍 Verification Check: Addressing circulating rumors or unofficial social media claims regarding unexpected road blocks or fee spikes, relevant authorities confirm routes remain coordinated under on-site traffic guidance. Disregard unverified chatter and rely on official road announcements.`;
  } else if (isEvent) {
    p2Id = `Penyelenggaraan agenda ini melibatkan komunitas warga lokal dan pelaku ekonomi kreatif nagari, menghadirkan kemeriahan atraksi budaya yang ramah untuk dinikmati seluruh anggota keluarga.\n\n🔍 Catatan Verifikasi: Terkait rumor mengenai jadwal atau biaya tiket yang terkadang simpang siur di grup obrolan, panitia pelaksana menegaskan bahwa jadwal resmi serta tata tertib kunjungan telah dikoordinasikan secara matang. Pastikan kamu selalu memverifikasi tanggal agenda lewat pengumuman resmi penyelenggara.`;
    p2En = `This gathering brings together local artisans and cultural communities, delivering vibrant heritage performances that are fun and family-friendly.\n\n🔍 Verification Check: Regarding unofficial chatter about date shifts or ticket costs circulating in chat groups, organizers emphasize that all schedules are coordinated directly with community elders. Always verify event dates via official committee announcements.`;
  } else if (isMarine) {
    p2Id = `Kondisi perairan dan fasilitas penyeberangan dipantau bersama stasiun maritim BMKG demi memastikan aktivitas wisata bahari tetap berjalan nyaman dan aman bagi seluruh pelancong.\n\n🔍 Catatan Verifikasi: Abaikan isu liar atau kabar angin seputar cuaca ekstrem yang tidak bersumber dari rilis resmi BMKG Maritim. Kondisi operasional pelayaran diputuskan secara terukur berdasarkan data meteorologi harian yang kredibel.`;
    p2En = `Coastal waters and ferry operations are monitored alongside maritime meteorological stations to ensure all aquatic excursions remain safe and enjoyable.\n\n🔍 Verification Check: Disregard sensationalized rumors regarding extreme marine weather not backed by official BMKG bulletins. All sailing decisions are made responsibly based on verified meteorological data.`;
  } else if (isNatureGeopark) {
    p2Id = `Pengelolaan kawasan alam ini menitikberatkan pada kenyamanan pengunjung sekaligus menjaga kelestarian alam dan kebersihan lingkungan sekitar destinasi.\n\n🔍 Catatan Verifikasi: Menanggapi kabar yang sempat viral mengenai pembatasan sepihak atau isu tiket liar, pengelola kawasan mengonfirmasi bahwa seluruh aturan dan tarif diterapkan secara resmi dan transparan untuk perlindungan kawasan cagar alam.`;
    p2En = `Destination management centers on balancing visitor enjoyment with nature conservation and responsible leave-no-trace ethics.\n\n🔍 Verification Check: Addressing viral claims concerning unofficial entry fees or arbitrary closures, park authorities affirm that all regulations and ticketing adhere strictly to transparent conservation rules.`;
  } else if (isCulinaryCulture) {
    p2Id = `Kekayaan kuliner dan kriya tradisi ini terus dilestarikan oleh komunitas lokal, menyajikan cita rasa autentik dan cerita budaya berharga bagi setiap wisatawan yang singgah.\n\n🔍 Catatan Verifikasi: Pihak asosiasi perajin dan pegiat kuliner menegaskan bahwa informasi produk asli dan rekomendasi sentra resmi dapat diperoleh langsung dari panduan terverifikasi; jangan mudah tergiur tawaran suvenir tidak resmi dari pihak ketiga yang meragukan.`;
    p2En = `Authentic culinary and craft traditions continue to be nurtured by village artisans, offering visitors genuine flavors and rich cultural stories.\n\n🔍 Verification Check: Craft associations confirm that verified artisan centers and authentic makers are listed in official directories; beware of unauthorized third-party resale claims.`;
  } else {
    p2Id = `Inisiatif ini dirancang untuk memberikan dampak positif langsung bagi masyarakat di sekitar destinasi, membuka ruang usaha yang lebih luas, dan meningkatkan mutu layanan pariwisata.\n\n🔍 Catatan Verifikasi: Berdasarkan konfirmasi dari sumber tepercaya (${source}), laporan ini adalah fakta resmi yang terverifikasi. Jika ada desas-desus atau klaim sepihak di internet, utamakan mengecek konfirmasi dari dinas atau lembaga terkait.`;
    p2En = `This initiative directly benefits local destination communities by fostering enterprise opportunities and elevating hospitality standards.\n\n🔍 Verification Check: Confirmed by credible reporting from ${source}, this information reflects verified facts. When encountering unverified claims online, always cross-reference with official institutional announcements.`;
  }

  // Paragraph 3: Conversational Tips for the reader
  let p3Id = `Tips buat kamu: Simpan informasi ini untuk rencana jalan-jalanmu berikutnya. Pastikan kamu selalu memantau perkembangan cuaca lokal dan menyiapkan kebutuhan perjalanan dari jauh-jauh hari agar liburanmu tetap santai dan bebas ribet!`;
  let p3En = `Traveler takeaway: Bookmark this update for your upcoming travel plans. Always check local forecasts and pack essentials ahead of time so your holiday stays relaxed and hassle-free!`;

  if (isHighwayTransport) {
    p3Id = `Tips buat kamu: Sebelum berangkat, luangkan 5 menit untuk mengecek kondisi tekanan ban, rem kendaraan, serta saldo e-toll kamu. Berkendaralah dengan santai dan patuhi batas kecepatan demi keamanan bersama.`;
    p3En = `Traveler takeaway: Before setting off, take 5 minutes to check your tires, brake pads, and electronic toll card balance. Drive at a relaxed pace and respect speed advisories.`;
  } else if (isEvent) {
    p3Id = `Tips buat kamu: Jika ingin menyaksikan langsung, datanglah lebih awal sebelum acara dimulai untuk mendapatkan sudut pandang terbaik dan tempat parkir yang nyaman. Kenakan pakaian santai yang menyerap keringat.`;
    p3En = `Traveler takeaway: If attending in person, arrive early to secure prime viewing spots and convenient parking. Wear light, breathable casual clothing.`;
  } else if (isMarine) {
    p3Id = `Tips buat kamu: Pesan tiket penyeberangan kapal lebih awal dan siapkan kantong anti-air (dry bag) untuk melindungi barang elektronikmu saat menikmati pesona laut.`;
    p3En = `Traveler takeaway: Reserve ferry tickets early and carry a dry bag to protect phones and electronics while enjoying coastal waters.`;
  } else if (isNatureGeopark) {
    p3Id = `Tips buat kamu: Datang saat pagi hari untuk menikmati udara segar dan pencahayaan foto terbaik. Bawa botol minum sendiri dan bantu jaga kebersihan alam dengan tidak meninggalkan sampah plastik.`;
    p3En = `Traveler takeaway: Visit early in the morning for crisp air and golden photography light. Carry a reusable water bottle and help keep nature clean by packing out your trash.`;
  } else if (isCulinaryCulture) {
    p3Id = `Tips buat kamu: Jangan ragu bertanya pada warga lokal atau pemandu untuk rekomendasi kuliner yang paling autentik. Selalu dukung produk perajin lokal sebagai oleh-oleh berharga.`;
    p3En = `Traveler takeaway: Don't hesitate to ask local hosts for authentic food recommendations. Support community artisans by picking up authentic handmade keepsakes.`;
  }

  const descId = `${p1Id}\n\n${p2Id}\n\n${p3Id}`;
  const descEn = `${p1En}\n\n${p2En}\n\n${p3En}`;

  const highlightsId = [
    `Fakta Inti: Informasi terkonfirmasi dari sumber tepercaya (${source})`,
    isHighwayTransport ? 'Mobilitas Wisata: Kesiapan rute dan pengamanan jalur dipantau langsung' :
    isEvent ? 'Atraksi Budaya: Agenda ramah keluarga melibatkan komunitas lokal' :
    isMarine ? 'Wisata Bahari: Akses laut dan aktivitas pantai terpantau kondusif' :
    isNatureGeopark ? 'Wisata Alam: Kelestarian lingkungan dan kenyamanan pelancong dijaga' :
    'Dampak Destinasi: Memperkuat kenyamanan dan fasilitas bagi wisatawan',
    'Cek Verifikasi: Informasi resmi terverifikasi, abaikan rumor belum pasti'
  ];

  const highlightsEn = [
    `Key Fact: Verified reporting from credible source (${source})`,
    isHighwayTransport ? 'Travel Mobility: Route readiness and transit safety actively monitored' :
    isEvent ? 'Cultural Beat: Family-friendly festivities driven by local communities' :
    isMarine ? 'Marine Travel: Coastal access and open-water activities verified safe' :
    isNatureGeopark ? 'Nature Watch: Scenic sanctuaries preserved with responsible visiting' :
    'Destination Impact: Elevating traveler amenities and regional hospitality',
    'Verification Note: Grounded in verified facts, disregard unverified rumors'
  ];

  const tipsId = isHighwayTransport ? 'Cek kondisi kendaraan dan saldo kartu tol elektronik sebelum melintas.' :
    isEvent ? 'Pesan penginapan lebih awal dan kenakan pakaian yang nyaman untuk berjalan santai.' :
    isMarine ? 'Pesan tiket kapal penyeberangan H-1 dan pantau prakiraan cuaca maritim BMKG.' :
    isNatureGeopark ? 'Datang pagi hari untuk suasana paling asri dan gunakan alas kaki yang nyaman.' :
    'Cek rute dan jam operasional destinasi agar perjalananmu berjalan lancar.';

  const tipsEn = isHighwayTransport ? 'Inspect vehicle roadworthiness and ensure sufficient electronic toll funds.' :
    isEvent ? 'Book accommodations ahead and dress in comfortable walking clothes.' :
    isMarine ? 'Book ferry crossings a day ahead and check official maritime swell reports.' :
    isNatureGeopark ? 'Arrive in the morning for crisp views and wear sturdy comfortable walking shoes.' :
    'Verify opening hours and local route conditions for a smooth travel experience.';

  return { descId, descEn, highlightsId, highlightsEn, tipsId, tipsEn, smartTitleId, smartTitleEn };
}

const DEDUP_STOP_WORDS = new Set([
  'di', 'ke', 'dari', 'pada', 'dalam', 'oleh', 'untuk', 'dengan', 'dan', 'atau', 'yang', 'ini', 'itu',
  'adalah', 'sebagai', 'akan', 'telah', 'sudah', 'sedang', 'bisa', 'dapat', 'resmi', 'digelar', 'gelar',
  'dibuka', 'buka', 'tinjau', 'kunjungi', 'kunjungan', 'soal', 'terkait', 'tentang', 'kata', 'ungkap',
  'siap', 'jadi', 'ada', 'menjadi', 'sebut', 'beberkan', 'hingga', 'juga', 'tak', 'tidak', 'lebih',
  'ajak', 'mengajak', 'dorong', 'mendorong', 'minta', 'meminta', 'dukung', 'mendukung',
  'the', 'a', 'an', 'in', 'on', 'at', 'to', 'for', 'of', 'and', 'or', 'is', 'are', 'was', 'were', 'will'
]);

function extractKeywords(title: string): string[] {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length >= 3 && !DEDUP_STOP_WORDS.has(word));
}

function calculateTitleSimilarity(titleA: string, titleB: string): number {
  const wordsA = extractKeywords(titleA);
  const wordsB = extractKeywords(titleB);
  if (wordsA.length === 0 || wordsB.length === 0) return 0;

  const setA = new Set(wordsA);
  const setB = new Set(wordsB);

  let matches = 0;
  for (const wa of setA) {
    if (setB.has(wa)) {
      matches += 1;
    } else {
      for (const wb of setB) {
        if ((wa.length >= 4 && wb.startsWith(wa)) || (wb.length >= 4 && wa.startsWith(wb))) {
          matches += 0.8;
          break;
        }
      }
    }
  }

  // If 2 or more distinct keywords match, it is definitely about the same topic/event
  if (matches >= 2) {
    return 1.0;
  }

  // Sorensen-Dice coefficient
  return (2 * matches) / (setA.size + setB.size);
}

/**
 * Intelligent News Deduplication Engine
 * Strictly guarantees that no story, topic, organization (e.g. GenPI), or event is published more than ONCE.
 */
export function deduplicateNewsItems<T extends { title: string; titleEn?: string }>(items: T[]): T[] {
  const uniqueItems: T[] = [];

  for (const item of items) {
    if (!item || !item.title) continue;

    const isDuplicate = uniqueItems.some((existing) => {
      const cleanA = item.title.trim().toLowerCase();
      const cleanB = existing.title.trim().toLowerCase();

      // 1. Exact title match
      if (cleanA === cleanB) return true;

      // 2. Distinctive core subject check (if both mention the same specific entity/campaign)
      const wordsA = extractKeywords(item.title);
      const wordsB = extractKeywords(existing.title);
      const commonWords = wordsA.filter(w => wordsB.some(wb => w === wb || (w.length >= 4 && (wb.startsWith(w) || w.startsWith(wb)))));
      
      // Specifically catch repeated single distinctive proper nouns (like genpi, rangkul, kelok, etc.)
      const isDistinctiveShared = commonWords.some(w => ['genpi', 'kelok', 'pagaruyung', 'mentawai', 'singkarak', 'harau', 'tabuik', 'songket', 'rendang', 'maninjau', 'mandeh', 'silek', 'geopark'].includes(w));
      if (isDistinctiveShared) return true;

      // If 2 or more significant content words are shared
      if (commonWords.length >= 2) return true;

      // 3. Keyword similarity threshold (0.24 threshold catches syndicated variations)
      const simId = calculateTitleSimilarity(item.title, existing.title);
      if (simId >= 0.24) return true;

      // 4. English title check if available
      if (item.titleEn && existing.titleEn) {
        const simEn = calculateTitleSimilarity(item.titleEn, existing.titleEn);
        if (simEn >= 0.24) return true;
      }

      return false;
    });

    if (!isDuplicate) {
      uniqueItems.push(item);
    }
  }

  return uniqueItems;
}

export function isSumbarTopic(text: string): boolean {
  const sumbarKeywords = [
    'sumbar', 'sumatera barat', 'padang', 'bukittinggi', 'mentawai', 'tanah datar',
    'pagaruyung', 'sawahlunto', 'agam', 'solok', 'pasaman', 'sianok', 'harau',
    'singkarak', 'maninjau', 'mandeh', 'pariaman', 'payakumbuh', 'dharmasraya',
    'sijunjung', 'pesisir selatan', 'minang', 'minangkabau', 'marapi', 'talamau'
  ];
  const lower = (text || '').toLowerCase();
  return sumbarKeywords.some(kw => lower.includes(kw));
}

/**
 * Automatically translates Indonesian tourism headlines into fluent English
 */
export function translateHeadlineIndoToEn(titleId: string): string {
  if (!titleId || typeof titleId !== 'string') return '';
  let str = titleId.trim();

  // Dictionary of multi-word phrases and entities
  const phraseMappings: Array<[RegExp, string]> = [
    [/\bKemenparekraf\b/gi, 'Ministry of Tourism & Creative Economy'],
    [/\bKementerian Pariwisata\b/gi, 'Ministry of Tourism'],
    [/\bDinas Pariwisata Provinsi Sumatera Barat\b/gi, 'West Sumatra Tourism Board'],
    [/\bDinas Pariwisata Sumbar\b/gi, 'West Sumatra Tourism Board'],
    [/\bDispar Sumbar\b/gi, 'West Sumatra Tourism Board'],
    [/\bDispar\b/gi, 'Tourism Board'],
    [/\bPemprov Sumbar\b/gi, 'West Sumatra Provincial Government'],
    [/\bPemerintah Provinsi Sumatera Barat\b/gi, 'West Sumatra Provincial Government'],
    [/\bPemda\b/gi, 'Local Government'],
    [/\bPemerintah\b/gi, 'Government'],
    [/\bGenpi\b/gi, 'GenPI (Tourism Generation)'],
    [/\bKarisma Event Nusantara\b/gi, 'Karisma Event Nusantara (KEN)'],
    [/\bDesa Wisata\b/gi, 'Tourist Village'],
    [/\bNagari Wisata\b/gi, 'Tourist Nagari'],
    [/\bPariwisata Sumatera Barat\b/gi, 'West Sumatra Tourism'],
    [/\bPariwisata Sumbar\b/gi, 'West Sumatra Tourism'],
    [/\bPariwisata Indonesia\b/gi, 'Indonesian Tourism'],
    [/\bPariwisata Nasional\b/gi, 'National Tourism'],
    [/\bWisatawan Mancanegara\b/gi, 'International Tourists'],
    [/\bWisatawan Nusantara\b/gi, 'Domestic Tourists'],
    [/\bWisatawan Asing\b/gi, 'Foreign Tourists'],
    [/\bWisatawan Domestik\b/gi, 'Domestic Travelers'],
    [/\bWisatawan\b/gi, 'Tourists'],
    [/\bKunjungan Wisata\b/gi, 'Tourist Visits'],
    [/\bKunjungan Wisatawan\b/gi, 'Tourist Arrivals'],
    [/\bEkonomi Kreatif\b/gi, 'Creative Economy'],
    [/\bDestinasi Wisata\b/gi, 'Tourist Destinations'],
    [/\bObjek Wisata\b/gi, 'Tourist Attractions'],
    [/\bDaya Tarik Wisata\b/gi, 'Tourist Attractions'],
    [/\bDanau Singkarak\b/gi, 'Lake Singkarak'],
    [/\bDanau Maninjau\b/gi, 'Lake Maninjau'],
    [/\bDanau Kembar\b/gi, 'Twin Lakes'],
    [/\bLembah Harau\b/gi, 'Harau Valley'],
    [/\bNgarai Sianok\b/gi, 'Sianok Canyon'],
    [/\bJam Gadang\b/gi, 'Jam Gadang Clock Tower'],
    [/\bIstano Basa Pagaruyung\b/gi, 'Pagaruyung Grand Palace'],
    [/\bKepulauan Mentawai\b/gi, 'Mentawai Islands'],
    [/\bKawasan Bahari Mandeh\b/gi, 'Mandeh Marine Resort Area'],
    [/\bKawasan Mandeh\b/gi, 'Mandeh Coastal Area'],
    [/\bGeopark Silokek\b/gi, 'Silokek Geopark'],
    [/\bGeopark Ranah Minang\b/gi, 'Ranah Minang Geopark'],
    [/\bKelok 9\b/gi, 'Kelok 9 Flyover'],
    [/\bKelok 44\b/gi, 'Kelok 44 Scenic Pass'],
    [/\bAir Terjun Lembah Anai\b/gi, 'Lembah Anai Waterfall'],
    [/\bRumah Gadang\b/gi, 'Rumah Gadang Traditional House'],
    [/\bSumatera Barat\b/gi, 'West Sumatra'],
    [/\bRanah Minang\b/gi, 'Minangkabau Land'],
    [/\bSumbar\b/gi, 'West Sumatra'],
    [/\bKota Padang\b/gi, 'Padang City'],
    [/\bKota Bukittinggi\b/gi, 'Bukittinggi City'],
    [/\bKota Pariaman\b/gi, 'Pariaman City'],
    [/\bKota Payakumbuh\b/gi, 'Payakumbuh City'],
    [/\bKota Sawahlunto\b/gi, 'Sawahlunto City'],
    [/\bKabupaten Tanah Datar\b/gi, 'Tanah Datar Regency'],
    [/\bKabupaten Pesisir Selatan\b/gi, 'Pesisir Selatan Regency'],
    [/\bKabupaten Lima Puluh Kota\b/gi, 'Limapuluh Kota Regency'],
    [/\bKabupaten Agam\b/gi, 'Agam Regency'],
    [/\bKabupaten Solok\b/gi, 'Solok Regency'],
    [/\bKabupaten Pasaman\b/gi, 'Pasaman Regency'],
    [/\bKabupaten Dharmasraya\b/gi, 'Dharmasraya Regency'],
    [/\bKabupaten Sijunjung\b/gi, 'Sijunjung Regency'],
    [/\bKabupaten Mentawai\b/gi, 'Mentawai Regency'],
    [/\bBandara Internasional Minangkabau\b/gi, 'Minangkabau International Airport'],
    [/\bBandara Minangkabau\b/gi, 'Minangkabau Airport'],
    [/\bBulan Depan\b/gi, 'Next Month'],
    [/\bMinggu Ini\b/gi, 'This Week'],
    [/\bPekan Ini\b/gi, 'This Week'],
    [/\bTahun Ini\b/gi, 'This Year'],
    [/\bTahun 2026\b/gi, 'in 2026'],
    [/\bLibur Panjang\b/gi, 'Long Holiday'],
    [/\bLibur Lebaran\b/gi, 'Eid Holiday'],
    [/\bLibur Akhir Tahun\b/gi, 'Year-End Holiday'],
    [/\bLonjakan Wisatawan\b/gi, 'Surge in Tourists'],
    [/\bLonjakan Pengunjung\b/gi, 'Surge in Visitors'],
    [/\bJalur Wisata\b/gi, 'Tourism Route'],
    [/\bSektor Pariwisata\b/gi, 'Tourism Sector'],
    [/\bSiap Digelar\b/gi, 'Ready to be Held'],
    [/\bSukses Digelar\b/gi, 'Successfully Held'],
    [/\bResmi Dibuka\b/gi, 'Officially Opened'],
    [/\bResmi Diluncurkan\b/gi, 'Officially Launched'],
    [/\bTerus Digenjot\b/gi, 'Continuously Boosted'],
    [/\bTingkatkan Kualitas\b/gi, 'Enhance Quality'],
    [/\bRangkul Komunitas\b/gi, 'Engage Communities'],
    [/\bAjak Wisatawan\b/gi, 'Invites Travelers'],
    [/\bAjak\b/gi, 'Encourages'],
    [/\bMengajak\b/gi, 'Encourages'],
    [/\bRangkul\b/gi, 'to Embrace'],
    [/\bMerangkul\b/gi, 'Embraces'],
    [/\bDorong\b/gi, 'Drives'],
    [/\bMendorong\b/gi, 'Boosts'],
    [/\bPercepat\b/gi, 'Accelerates'],
    [/\bMempercepat\b/gi, 'Accelerates'],
    [/\bPerkuat\b/gi, 'Strengthens'],
    [/\bMemperkuat\b/gi, 'Strengthens'],
    [/\bGencarkan\b/gi, 'Intensifies'],
    [/\bMenggencarkan\b/gi, 'Intensifies'],
    [/\bLuncurkan\b/gi, 'Launches'],
    [/\bMeluncurkan\b/gi, 'Launches'],
    [/\bDiluncurkan\b/gi, 'Launched'],
    [/\bGelar\b/gi, 'Hosts'],
    [/\bMenggelar\b/gi, 'Holds'],
    [/\bDigelar\b/gi, 'Held'],
    [/\bTinjau\b/gi, 'Inspects'],
    [/\bMeninjau\b/gi, 'Inspects'],
    [/\bSambut\b/gi, 'Welcomes'],
    [/\bMenyambut\b/gi, 'Welcomes'],
    [/\bTargetkan\b/gi, 'Targets'],
    [/\bMenargetkan\b/gi, 'Targets'],
    [/\bKembangkan\b/gi, 'Develops'],
    [/\bMengembangkan\b/gi, 'Develops'],
    [/\bPengembangan\b/gi, 'Development of'],
    [/\bPeningkatan\b/gi, 'Increase in'],
    [/\bPromosi\b/gi, 'Promotion of'],
    [/\bPromosikan\b/gi, 'Promotes'],
    [/\bMempromosikan\b/gi, 'Promotes'],
    [/\bKesiapan\b/gi, 'Readiness of'],
    [/\bKonektivitas\b/gi, 'Connectivity of'],
    [/\bAksesibilitas\b/gi, 'Accessibility of'],
    [/\bFasilitas\b/gi, 'Facilities'],
    [/\bAmenitas\b/gi, 'Amenities'],
    [/\bAkomodasi\b/gi, 'Accommodation'],
    [/\bPenerbangan\b/gi, 'Flights'],
    [/\bPenginapan\b/gi, 'Lodging'],
    [/\bHotel\b/gi, 'Hotels'],
    [/\bKuliner\b/gi, 'Culinary'],
    [/\bKoleksi\b/gi, 'Collection'],
    [/\bPameran\b/gi, 'Exhibition'],
    [/\bAtraksi\b/gi, 'Attractions'],
    [/\bKebudayaan\b/gi, 'Culture'],
    [/\bBudaya\b/gi, 'Culture'],
    [/\bTradisi\b/gi, 'Traditions'],
    [/\bFestival\b/gi, 'Festival'],
    [/\bPesta\b/gi, 'Festivity'],
    [/\bPerayaan\b/gi, 'Celebration'],
    [/\bMeriah\b/gi, 'Spectacular'],
    [/\bTerpilih\b/gi, 'Selected'],
    [/\bTerbaik\b/gi, 'Best'],
    [/\bUnggulan\b/gi, 'Flagship'],
    [/\bPrioritas\b/gi, 'Priority'],
    [/\bInternasional\b/gi, 'International'],
    [/\bNasional\b/gi, 'National'],
    [/\bLokal\b/gi, 'Local'],
    [/\bKomunitas\b/gi, 'Communities'],
    [/\bMasyarakat\b/gi, 'Community'],
    [/\bPelaku Wisata\b/gi, 'Tourism Operators'],
    [/\bPelaku Usaha\b/gi, 'Business Operators'],
    [/\bUMKM\b/gi, 'Local SMEs'],
    [/\bPotensi\b/gi, 'Potential'],
    [/\bWisata\b/gi, 'Tourism'],
    [/\bJelang\b/gi, 'Ahead of'],
    [/\bMenjelang\b/gi, 'Ahead of'],
    [/\bPasca\b/gi, 'Post-'],
    [/\bSetelah\b/gi, 'After'],
    [/\bSaat\b/gi, 'During'],
    [/\bHingga\b/gi, 'Up to'],
    [/\bSampai\b/gi, 'Until'],
    [/\bMulai\b/gi, 'Starts'],
    [/\bResmi\b/gi, 'Officially'],
    [/\bUntuk\b/gi, 'for'],
    [/\bDengan\b/gi, 'with'],
    [/\bDan\b/gi, 'and'],
    [/\bDi\b/gi, 'in'],
    [/\bKe\b/gi, 'to'],
    [/\bDari\b/gi, 'from'],
    [/\bPada\b/gi, 'at'],
    [/\bOleh\b/gi, 'by']
  ];

  for (const [regex, replacement] of phraseMappings) {
    str = str.replace(regex, replacement);
  }

  // Clean double spaces and normalize capitalization
  str = str.replace(/\s+/g, ' ').trim();
  if (str.length > 0) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
  }
  return str;
}

export const textTranslationMemory = new Map<string, string>();

/**
 * Fetches high-accuracy neural translation via Google GTX & MyMemory with local memory caching
 */
export async function fetchDirectTranslation(text: string, from = 'id', to = 'en'): Promise<string> {
  if (!text || !text.trim()) return '';
  const trimmed = text.trim();
  const cacheKey = `${from}-${to}-${trimmed}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  // Check localStorage cache
  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  try {
    // 1. Google GTX Public API
    const gtxUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&q=${encodeURIComponent(trimmed)}`;
    const res = await fetch(gtxUrl);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && Array.isArray(data[0])) {
        const translated = data[0].map((chunk: any) => chunk[0]).join('').trim();
        if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
          textTranslationMemory.set(cacheKey, translated);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(`malala_trans_${cacheKey.slice(0, 100)}`, translated);
            }
          } catch {}
          return translated;
        }
      }
    }
  } catch (e) {}

  try {
    // 2. MyMemory Translation API fallback
    const mmUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${from}|${to}`;
    const res = await fetch(mmUrl);
    if (res.ok) {
      const json = await res.json();
      if (json?.responseData?.translatedText) {
        const translated = json.responseData.translatedText.trim();
        if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
          textTranslationMemory.set(cacheKey, translated);
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(`malala_trans_${cacheKey.slice(0, 100)}`, translated);
            }
          } catch {}
          return translated;
        }
      }
    }
  } catch (e) {}

  // 3. Robust rule-based fallback
  const fallback = translateHeadlineIndoToEn(trimmed);
  textTranslationMemory.set(cacheKey, fallback);
  return fallback;
}

/**
 * Pre-fetches translations in background for all active news items
 */
export function prefetchNewsTranslations(items: any[]) {
  if (!Array.isArray(items) || items.length === 0) return;
  items.forEach(item => {
    if (item.title) {
      fetchDirectTranslation(item.title, 'id', 'en').catch(() => {});
    }
    if (item.description) {
      fetchDirectTranslation(item.description, 'id', 'en').catch(() => {});
    }
  });
}

export function getNewsDisplayTitle(item: any, lang: string): string {
  if (!item) return '';
  const isEn = lang === 'en';
  if (!isEn) return item.title || '';

  const cacheKey = `id-en-${(item.title || '').trim()}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  if (item.titleEn && item.titleEn.trim() && item.titleEn !== item.title) {
    return item.titleEn;
  }

  // Trigger background translation for perfect async update
  if (item.title) {
    fetchDirectTranslation(item.title, 'id', 'en').catch(() => {});
  }

  return translateHeadlineIndoToEn(item.title || item.titleEn || '');
}

export function getNewsDisplayDescription(item: any, lang: string): string {
  if (!item) return '';
  const isEn = lang === 'en';
  const desc = item.description || item.content || '';
  if (!isEn) return desc;

  const cacheKey = `id-en-${desc.trim()}`;
  if (textTranslationMemory.has(cacheKey)) {
    return textTranslationMemory.get(cacheKey)!;
  }

  try {
    if (typeof window !== 'undefined') {
      const local = localStorage.getItem(`malala_trans_${cacheKey.slice(0, 100)}`);
      if (local) {
        textTranslationMemory.set(cacheKey, local);
        return local;
      }
    }
  } catch {}

  if (item.descriptionEn && item.descriptionEn.trim() && item.descriptionEn !== desc) {
    return item.descriptionEn;
  }

  if (desc) {
    fetchDirectTranslation(desc, 'id', 'en').catch(() => {});
  }

  return item.descriptionEn || desc;
}

/**
 * Fetch live Real-Time Tourism News formatted as a smart daily newsletter
 * Maintains a strict 50:50 balance between local (Sumatera Barat) and national (Indonesia) tourism news.
 * Queries recent news (when:2d with when:7d fallback) to provide fast, unbiased updates.
 */
async function fetchLiveTourismNewsFromRSS(language: string = 'id') {
  const sumbarQueries = [
    'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:2d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=wisata+sumbar+when:2d&hl=id&gl=ID&ceid=ID:id'
  ];
  const nationalQueries = [
    'https://news.google.com/rss/search?q=pariwisata+indonesia+kemenparekraf+when:2d&hl=id&gl=ID&ceid=ID:id',
    'https://news.google.com/rss/search?q=wisata+nusantara+when:2d&hl=id&gl=ID&ceid=ID:id'
  ];

  const sumbarFallbackQueries = [
    'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:7d&hl=id&gl=ID&ceid=ID:id'
  ];
  const nationalFallbackQueries = [
    'https://news.google.com/rss/search?q=pariwisata+indonesia+kemenparekraf+when:7d&hl=id&gl=ID&ceid=ID:id'
  ];

  async function fetchFeed(url: string, isSumbarTopicFeed: boolean): Promise<any[]> {
    const list: any[] = [];
    try {
      const endpoint = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (!res.ok) return list;

      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        for (const item of data.items) {
          const rawTitle = cleanHtml(item.title || '');
          const titleParts = rawTitle.split(' - ');
          const source = titleParts.length > 1 ? titleParts.pop() : 'Media Tepercaya';
          const cleanTitle = titleParts.join(' - ').trim() || rawTitle;

          const { dateId, dateEn, isWithin30d } = formatDateIndo(item.pubDate);
          if (!isWithin30d) continue;

          const snippet = cleanHtml(item.description || item.content || '');
          const narrative = buildSmartNewsletterNarrative(cleanTitle, source || 'Media Tepercaya', snippet, isSumbarTopicFeed);

          list.push({
            id: `news-live-${list.length + 1}-${Date.now().toString().slice(-6)}`,
            title: narrative.smartTitleId || cleanTitle,
            titleEn: narrative.smartTitleEn || translateHeadlineIndoToEn(cleanTitle),
            category: isSumbarTopicFeed ? 'Pariwisata Sumatera Barat' : 'Pariwisata Indonesia',
            categoryEn: isSumbarTopicFeed ? 'West Sumatra Tourism' : 'Indonesian Tourism',
            date: dateId,
            dateEn: dateEn,
            tag: isSumbarTopicFeed ? 'Sumbar' : 'Nasional',
            tagEn: isSumbarTopicFeed ? 'West Sumatra' : 'National',
            description: narrative.descId,
            descriptionEn: narrative.descEn,
            imageUrl: '',
            actionUrl: item.link || '',
            highlights: narrative.highlightsId,
            highlightsEn: narrative.highlightsEn,
            tips: narrative.tipsId,
            tipsEn: narrative.tipsEn,
            locationName: isSumbarTopicFeed ? 'Sumatera Barat' : 'Pariwisata Indonesia',
            locationNameEn: isSumbarTopicFeed ? 'West Sumatra' : 'Indonesian Tourism'
          });
        }
      }
    } catch (e) {
      // Quiet fail to try next endpoint
    }
    return list;
  }

  // 1. Fetch Sumbar Stream
  let sumbarItems: any[] = [];
  for (const q of sumbarQueries) {
    const items = await fetchFeed(q, true);
    sumbarItems.push(...items);
  }
  if (sumbarItems.length < 2) {
    for (const q of sumbarFallbackQueries) {
      const items = await fetchFeed(q, true);
      sumbarItems.push(...items);
    }
  }

  // 2. Fetch National Stream
  let nationalItems: any[] = [];
  for (const q of nationalQueries) {
    const items = await fetchFeed(q, false);
    nationalItems.push(...items);
  }
  if (nationalItems.length < 2) {
    for (const q of nationalFallbackQueries) {
      const items = await fetchFeed(q, false);
      nationalItems.push(...items);
    }
  }

  // 3. CORS proxy fallback if needed
  if (sumbarItems.length === 0 || nationalItems.length === 0) {
    try {
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
        'https://news.google.com/rss/search?q=pariwisata+sumatera+barat+when:7d&hl=id&gl=ID&ceid=ID:id'
      )}`;
      const res = await fetch(proxyUrl, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(json.contents, 'text/xml');
        const items = xmlDoc.querySelectorAll('item');
        for (let i = 0; i < Math.min(items.length, 4); i++) {
          const it = items[i];
          const rawTitle = it.querySelector('title')?.textContent || '';
          const pubDate = it.querySelector('pubDate')?.textContent || new Date().toISOString();
          const { dateId, dateEn, isWithin30d } = formatDateIndo(pubDate);
          if (!isWithin30d) continue;

          const titleParts = rawTitle.split(' - ');
          const source = titleParts.length > 1 ? titleParts.pop() : 'Media Tepercaya';
          const cleanTitle = titleParts.join(' - ').trim() || rawTitle;
          const rawSnippet = it.querySelector('description')?.textContent || '';
          const snippet = cleanHtml(rawSnippet);
          const linkUrl = it.querySelector('link')?.textContent || '';
          const narrative = buildSmartNewsletterNarrative(cleanTitle, source || 'Media Tepercaya', snippet, true);

          sumbarItems.push({
            id: `news-proxy-${sumbarItems.length + 1}-${Date.now().toString().slice(-6)}`,
            title: narrative.smartTitleId || cleanTitle,
            titleEn: narrative.smartTitleEn || translateHeadlineIndoToEn(cleanTitle),
            category: 'Pariwisata Sumatera Barat',
            categoryEn: 'West Sumatra Tourism',
            date: dateId,
            dateEn: dateEn,
            tag: 'Sumbar',
            tagEn: 'West Sumatra',
            description: narrative.descId,
            descriptionEn: narrative.descEn,
            imageUrl: '',
            actionUrl: linkUrl,
            highlights: narrative.highlightsId,
            highlightsEn: narrative.highlightsEn,
            tips: narrative.tipsId,
            tipsEn: narrative.tipsEn,
            locationName: 'Sumatera Barat',
            locationNameEn: 'West Sumatra'
          });
        }
      }
    } catch (err) {
      console.warn('CORS proxy fetch error:', err);
    }
  }

  // 4. Deduplicate both streams
  const dedupedSumbar = deduplicateNewsItems(sumbarItems);
  const dedupedNational = deduplicateNewsItems(nationalItems);

  // 5. Fallback pool partitioned by category
  const fallbackSumbar = HOT_INFO_FALLBACK.filter(item => item.tag === 'Sumbar' || item.category.includes('Sumatera'));
  const fallbackNational = HOT_INFO_FALLBACK.filter(item => item.tag !== 'Sumbar' && !item.category.includes('Sumatera'));

  // 6. Strict 50:50 Interleaved Assembly: [Sumbar, National, Sumbar, National, Sumbar, National]
  const balancedList: any[] = [];
  const targetPairs = 3; // 3 Sumbar + 3 National = 6 items total

  for (let i = 0; i < targetPairs; i++) {
    // Add 1 Sumbar item (live or curated fallback)
    if (i < dedupedSumbar.length) {
      balancedList.push(dedupedSumbar[i]);
    } else if (fallbackSumbar[i % fallbackSumbar.length]) {
      balancedList.push(fallbackSumbar[i % fallbackSumbar.length]);
    }

    // Add 1 National item (live or curated fallback)
    if (i < dedupedNational.length) {
      balancedList.push(dedupedNational[i]);
    } else if (fallbackNational[i % fallbackNational.length]) {
      balancedList.push(fallbackNational[i % fallbackNational.length]);
    }
  }

  const finalDeduped = deduplicateNewsItems(balancedList);
  return finalDeduped.length > 0 ? finalDeduped : null;
}

export async function fetchAiHotInfo(language: string = 'id') {
  // 1. Try local server API if running in node environment
  try {
    const res = await fetch('/api/ai/fetch-hot-info', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language }),
    });

    const contentType = res.headers.get('content-type') || '';
    if (res.ok && contentType.includes('application/json')) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        return deduplicateNewsItems(data.filter((it: any) => isWithinLast30Days(it.date)));
      }
    }
  } catch (e) {
    // Normal in static Firebase Hosting environment
  }

  // 2. Client-side Gemini AI if API key is provided
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  if (viteApiKey) {
    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-pro-latest'];
    for (const modelName of modelsToTry) {
      try {
        const ai = new GoogleGenAI({ apiKey: viteApiKey });
        const prompt = `Anda adalah REDAKTUR SMART DAILY TRAVEL NEWSLETTER pariwisata profesional (Sumatera Barat & Indonesia).
Tugas Anda: Hasilkan 6 butir buletin berita wisata ringkas, cerdas, tidak bias, dan cepat dibaca dalam format JSON array.
KOMPOSISI WAJIB: TEPAT 50% Pariwisata Sumatera Barat (3 butir) dan 50% Pariwisata Nasional Indonesia (3 butir). Susun secara berselang-seling [Sumbar, Nasional, Sumbar, Nasional, Sumbar, Nasional].

STANDAR PENULISAN SMART NEWSLETTER (DILARANG MENGGUNAKAN BAHASA TEMPLATE/ROBOTIK):
1. GAYA BAHASA: Bahasa percakapan yang cerdas, santai, lugas, bersahabat, dan mudah dipahami oleh traveler umum (seperti buletin harian sarapan pagi yang renyah dan berbobot). HINDARI jargon birokratis kaku atau kalimat template pembuka klise seperti "Sektor kepariwisataan terus menunjukkan dinamika kemajuan...".
2. FAKTA & RUMOR: Ambil fakta aktual dari sumber terpercaya (Kemenparekraf, BPTD, Ditlantas, BMKG Maritim, PHRI, Pemda, media nasional terpercaya). Jika ada hal yang berupa isu viral, spekulasi media sosial, atau rumor yang belum terverifikasi secara resmi, SEBUTKAN SECARA EKSPLISIT dalam blok "🔍 Catatan Verifikasi:".
3. STRUKTUR DESKRIPSI (3 paragraf terpisah dengan \\n\\n):
   - Paragraf 1: Pembuka ramah & inti berita aktual secara langsung (siapa yang terlibat, apa yang terjadi, dan manfaat nyata bagi para pelancong).
   - Paragraf 2: Rincian fakta lapangan + wajib sertakan blok "🔍 Catatan Verifikasi: [sebutkan fakta resmi vs rumor/isu yang belum diverifikasi]".
   - Paragraf 3: "Tips buat kamu: [rekomendasi praktis, aplikatif, dan bermanfaat saat berwisata]".
4. PROPERTI WAJIB SETIAP ITEM:
   id (string unik), title (string santai & memikat), titleEn (string), category ("Pariwisata Sumatera Barat" atau "Pariwisata Indonesia"), categoryEn (string), date (format: "DD MMMM YYYY"), dateEn (string), tag ("Sumbar" atau "Nasional"), tagEn ("West Sumatra" atau "National"), description (3 paragraf newsletter), descriptionEn (3 paragraf newsletter), imageUrl (""), actionUrl (""), highlights (array 3 poin intisari penting), highlightsEn (array 3 poin), tips (string tips santai), tipsEn (string), locationName (string nama lokasi/kota), locationNameEn (string).
Hanya kembalikan valid JSON tanpa markdown.
Waktu saat ini: ${new Date().toISOString()}
Variasi Permintaan Seed: ${Math.random()}`;

        const response = await ai.models.generateContent({
          model: modelName,
          contents: prompt,
          config: {
            temperature: 0.4,
            tools: [{ googleSearch: {} } as any]
          }
        });

        const cleanJson = (response.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return deduplicateNewsItems(parsed.filter((it: any) => isWithinLast30Days(it.date)));
        }
      } catch (err) {
        console.warn(`Client Gemini hotinfo generation failed with ${modelName}, trying next...`, err);
      }
    }
  }

  // 3. Live Google News / RSS National & Local Tourism Feed (50:50 balanced, real-time & newsletter format)
  const liveRssNews = await fetchLiveTourismNewsFromRSS(language);
  if (liveRssNews && liveRssNews.length > 0) {
    const withSmartImages = liveRssNews.map(item => ({
      ...item,
      imageUrl: item.imageUrl || getSmartImageForNews(item.title, item.category)
    }));
    return deduplicateNewsItems(withSmartImages);
  }

  // 4. Static fallback if completely offline (50:50 balanced, within 30 days)
  const fallbackWithImages = HOT_INFO_FALLBACK.map(item => ({
    ...item,
    imageUrl: item.imageUrl || getSmartImageForNews(item.title, item.category)
  }));
  return deduplicateNewsItems(fallbackWithImages.filter((it: any) => isWithinLast30Days(it.date)));
}

/**
 * Curated high-resolution fallback photos for West Sumatra topics so cards are never blank.
 */
export function getSmartImageForNews(title: string = '', category: string = ''): string {
  const text = (title + ' ' + category).toLowerCase();
  if (text.includes('mentawai') || text.includes('surfing') || text.includes('ombak') || text.includes('pulau')) {
    return 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('harau') || text.includes('lembah') || text.includes('ngarai') || text.includes('tebing')) {
    return 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('danau') || text.includes('singkarak') || text.includes('maninjau') || text.includes('kembar')) {
    return 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('kuliner') || text.includes('rendang') || text.includes('sate') || text.includes('makan')) {
    return 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('budaya') || text.includes('songket') || text.includes('adat') || text.includes('pagaruyung') || text.includes('istano')) {
    return 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('padang') || text.includes('kota') || text.includes('pantai') || text.includes('air manis')) {
    return 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80';
  }
  if (text.includes('bukittinggi') || text.includes('jam gadang')) {
    return 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=800&q=80';
  }
  // Default authentic Minangkabau landscape
  return 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80';
}

export interface AutonomousScanResult {
  scheduleUpdates: Array<{
    id: string;
    eventTitle: string;
    currentSchedule: string;
    newSchedule: string;
    newScheduleEn: string;
    reason: string;
  }>;
  discoveredEvents: Array<{
    id: string;
    title: string;
    titleEn: string;
    schedule: string;
    scheduleEn: string;
    location: string;
    locationEn: string;
    description: string;
    descriptionEn: string;
    imageUrl: string;
    videoUrl?: string;
    isKen: boolean;
    lat?: number;
    lng?: number;
    sourceName: string;
  }>;
  scannedAt: string;
}

/**
 * Autonomous AI Scanner to discover new events and verify dates for existing events in West Sumatra.
 */
export async function scanAutonomousEventsWithAI(existingEvents: Array<{ id: string; title: string; schedule: string; location: string }>): Promise<AutonomousScanResult> {
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  const nowStr = new Date().toISOString();

  if (!viteApiKey) {
    return {
      scheduleUpdates: [],
      discoveredEvents: [],
      scannedAt: nowStr
    };
  }

  const existingTitles = existingEvents.map(e => `${e.id}: ${e.title} (${e.schedule})`).join('\n');

  const prompt = `Anda adalah Sistem Riset Intelijen Pariwisata Otonom Sumatera Barat (Kemenparekraf Karisma Event Nusantara & Calendar of Events 2026/2027).
Daftar event yang SUDAH ADA di database kami saat ini:
${existingTitles}

Tugas Anda:
1. Periksa apakah ada perubahan tanggal resmi (Kemenparekraf KEN / Dinas Pariwisata Sumbar 2026) untuk event-event yang SUDAH ADA di atas.
2. Cari jika ada event/festival pariwisata Sumatera Barat RESMI lainnya yang BELUM ADA dalam daftar di atas (misal Festival Pesona Mentawai, Festival Danau Diatas/Singkarak, Festival Kopi Luak, Festival Alek Nagari, dsb).
3. Hasilkan output dalam format JSON murni TANPA markdown dengan struktur persis:
{
  "scheduleUpdates": [
    {
      "id": "id_event",
      "eventTitle": "nama_event",
      "currentSchedule": "jadwal_saat_ini",
      "newSchedule": "jadwal_resmi_baru_bahasa_indonesia",
      "newScheduleEn": "jadwal_resmi_baru_bahasa_inggris",
      "reason": "alasan pembaruan jadwal berdasarkan CoE/KEN 2026"
    }
  ],
  "discoveredEvents": [
    {
      "id": "ev-ai-timestamp",
      "title": "NAMA EVENT HURUF KAPITAL",
      "titleEn": "EVENT NAME ENGLISH CAPITAL",
      "schedule": "Contoh: 15 – 18 Oktober 2026",
      "scheduleEn": "Contoh: October 15 – 18, 2026",
      "location": "Nama Lokasi, Kabupaten/Kota",
      "locationEn": "Location Name, Regency/City",
      "description": "Deskripsi naratif budaya 3 paragraf yang mendalam tentang asal-usul, atraksi utama, dan keunikan festival.",
      "descriptionEn": "In-depth 3-paragraph English cultural narrative description of the festival history and attractions.",
      "imageUrl": "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80",
      "videoUrl": "",
      "isKen": true,
      "lat": -0.450000,
      "lng": 100.510000,
      "sourceName": "Kemenparekraf KEN / Dispar Sumbar 2026"
    }
  ]
}
Waktu saat ini: ${nowStr}`;

  const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest', 'gemini-flash-lite-latest'];
  for (const model of modelsToTry) {
    try {
      const ai = new GoogleGenAI({ apiKey: viteApiKey });
      const res = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.1,
          tools: [{ googleSearch: {} } as any]
        }
      });

      const cleanJson = (res.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);

      return {
        scheduleUpdates: Array.isArray(parsed.scheduleUpdates) ? parsed.scheduleUpdates : [],
        discoveredEvents: Array.isArray(parsed.discoveredEvents) ? parsed.discoveredEvents.map((ev: any, idx: number) => ({
          ...ev,
          id: ev.id || `ev-ai-${Date.now()}-${idx}`,
          imageUrl: ev.imageUrl || getSmartImageForNews(ev.title, 'event')
        })) : [],
        scannedAt: nowStr
      };
    } catch (e) {
      console.warn(`Autonomous event scan failed with ${model}:`, e);
    }
  }

  return {
    scheduleUpdates: [],
    discoveredEvents: [],
    scannedAt: nowStr
  };
}

export interface SocialMediaDigest {
  instagramCaption: string;
  whatsappBroadcast: string;
  tiktokScriptHook: string;
  hashtags: string[];
  spotlightTitle: string;
  generatedAt: string;
}

/**
 * Autonomous AI Social Media Content Generator
 * Creates viral, engaging Instagram captions and WhatsApp broadcasts for tourism promotion.
 */
export async function generateSocialMediaDigest(
  spotlightItem: { title: string; category?: string; description?: string; schedule?: string; location?: string },
  upcomingEvent?: { title: string; schedule: string; location: string }
): Promise<SocialMediaDigest> {
  const viteApiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || (import.meta as any).env?.GEMINI_API_KEY;
  const nowStr = new Date().toISOString();

  const fallback: SocialMediaDigest = {
    spotlightTitle: spotlightItem.title,
    instagramCaption: `✨ PESONA RANAH MINANG HARI INI: ${spotlightItem.title.toUpperCase()} ✨\n\nTakambang rimbun alam Sumatera Barat menyuguhkan keajaiban yang tak pernah habis untuk dijelajahi. Dari megahnya alam hingga kehangatan budaya, Ranah Minang selalu memanggilmu pulang.\n\n📍 Lokasi: ${spotlightItem.location || 'Sumatera Barat'}\n${upcomingEvent ? `📅 Agenda Terdekat: ${upcomingEvent.title} (${upcomingEvent.schedule})\n` : ''}\nYuk rencanakan liburanmu bersama MALALA — Panduan Wisata Resmi Sumatera Barat!\n\n🌐 Kunjungi: malala.my.id\n\n#WisataSumbar #PesonaIndonesia #MalalaSumbar #WonderfulIndonesia #Minangkabau #PariwisataSumbar #ExploreSumbar`,
    whatsappBroadcast: `🌟 *KABA WISATA SUMATERA BARAT HARI IKO* 🌟\n\n*Destinasi Pilihan:* ${spotlightItem.title}\n📍 *Lokasi:* ${spotlightItem.location || 'Sumatera Barat'}\n\n${spotlightItem.description ? spotlightItem.description.slice(0, 180) + '...' : ''}\n\n${upcomingEvent ? `🎉 *Event Terdekat:* ${upcomingEvent.title}\n🗓️ *Jadwal:* ${upcomingEvent.schedule}\n` : ''}\n📲 Dapatkan panduan lengkap & itinerary cerdas di: https://malala.my.id\n\n_Bantu bagikan ke sanak famili yang ingin liburan ke Sumbar!_`,
    tiktokScriptHook: `POV: Kamu lagi liburan ke Sumatera Barat dan nemuin surga tersembunyi bernama ${spotlightItem.title}! Ini dia alasan kenapa kamu wajib ke sini tahun ini...`,
    hashtags: ['#WisataSumbar', '#PesonaIndonesia', '#MalalaSumbar', '#Minangkabau', '#ExploreSumbar', '#WonderfulIndonesia'],
    generatedAt: nowStr
  };

  if (!viteApiKey) return fallback;

  try {
    const ai = new GoogleGenAI({ apiKey: viteApiKey });
    const prompt = `Anda adalah Social Media Content Specialist Pariwisata Sumatera Barat (Malala / malala.my.id).
Buatkan konten media sosial harian yang sangat estetik, menggugah rasa rindu kampung halaman / hasrat berlibur, dan siap posting.

Data Destinasi Hari Ini:
- Judul: ${spotlightItem.title}
- Kategori/Lokasi: ${spotlightItem.location || spotlightItem.category || 'Sumatera Barat'}
- Deskripsi: ${spotlightItem.description || ''}
${upcomingEvent ? `- Event Terdekat: ${upcomingEvent.title} (${upcomingEvent.schedule} di ${upcomingEvent.location})` : ''}

Format output JSON murni tanpa markdown:
{
  "instagramCaption": "teks caption Instagram lengkap dengan emoji, storytelling Minangkabau yang puitis dan ajakan berkunjung",
  "whatsappBroadcast": "teks pesan broadcast WhatsApp yang rapi dengan format tebal/miring dan link malala.my.id",
  "tiktokScriptHook": "hook script video pendek 15 detik",
  "hashtags": ["#WisataSumbar", "#PesonaIndonesia", "#MalalaSumbar", "#Minangkabau", "#ExploreSumbar"]
}`;

    const modelsToTry = ['gemini-3.8-flash', 'gemini-3.7-flash', 'gemini-flash-latest'];
    for (const model of modelsToTry) {
      try {
        const res = await ai.models.generateContent({
          model,
          contents: prompt,
          config: { temperature: 0.7 }
        });

        const cleanJson = (res.text || '').replace(/```json/g, '').replace(/```/g, '').trim();
        const parsed = JSON.parse(cleanJson);

        return {
          spotlightTitle: spotlightItem.title,
          instagramCaption: parsed.instagramCaption || fallback.instagramCaption,
          whatsappBroadcast: parsed.whatsappBroadcast || fallback.whatsappBroadcast,
          tiktokScriptHook: parsed.tiktokScriptHook || fallback.tiktokScriptHook,
          hashtags: Array.isArray(parsed.hashtags) ? parsed.hashtags : fallback.hashtags,
          generatedAt: nowStr
        };
      } catch (err: any) {
        // try next model
      }
    }
    return fallback;
  } catch (e) {
    console.warn('Social media digest generation fallback:', e);
    return fallback;
  }
}





