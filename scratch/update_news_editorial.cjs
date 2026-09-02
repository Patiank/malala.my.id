const fs = require('fs');

// 1. Update server.ts /api/ai/fetch-hot-info
let serverCode = fs.readFileSync('server.ts', 'utf8');

const oldPromptPart = `          const currentDateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

          const prompt = \`Lakukan pencarian Google (Google Search) untuk mendapatkan 5 berita, event, atau informasi terkini mengenai pariwisata di seluruh Indonesia (nasional).

SANGAT PENTING & KHUSUS:
1. Cari HANYA informasi/berita yang DIPUBLIKASIKAN DALAM KURUN WAKTU 1 BULAN TERAKHIR dari hari ini (\${currentDateStr}).
2. JANGAN PERNAH menampilkan berita, artikel, event, atau isu yang sudah lewat lebih dari 1 bulan dari batas waktu tersebut.
3. Ekstrak 5 informasi paling segar, relevan, dan penting dari berbagai wilayah di Indonesia (bukan hanya 1 provinsi).
4. Cakupan berita meliputi: Bali, Lombok, Raja Ampat, Labuan Bajo, Yogyakarta, Sumatera Barat, Sulawesi, Kalimantan, Papua, dan destinasi wisata nasional lainnya.

Formatkan output HANYA dalam format JSON valid sebagai Array of Objects dengan struktur berikut untuk SETIAP item:
{
  "id": "String unik (misal: news-1)",
  "title": "Judul berita/event (Bahasa Indonesia)",
  "titleEn": "Judul berita/event (Terjemahan Bahasa Inggris)",
  "date": "Tanggal atau periode publikasi (Bahasa Indonesia, Wajib dalam 1 bulan terakhir)",
  "dateEn": "Date of publication (Bahasa Inggris, Must be within last 1 month)",
  "category": "Kategori (Pilih salah satu: Event, Berita, Pengumuman, Promo)",
  "categoryEn": "Kategori (Pilih salah satu: Event, News, Announcement, Promo)",
  "description": "Deskripsi lengkap berita (Bahasa Indonesia, minimal 2-3 paragraf komprehensif, dipisah dengan \\\\n\\\\n)",
  "descriptionEn": "Deskripsi berita (Bahasa Inggris, minimal 2-3 paragraf komprehensif, dipisah dengan \\\\n\\\\n)",
  "tag": "Tag singkat (misal: Terkini, Baru, Populer)",
  "tagEn": "Tag singkat (misal: Latest, New, Popular)",
  "actionUrl": "URL tautan sumber berita asli atau URL terkait",
  "highlights": ["Poin penting 1", "Poin penting 2"],
  "highlightsEn": ["Key point 1", "Key point 2"],
  "tips": "Satu tips terkait untuk wisatawan (Bahasa Indonesia)",
  "tipsEn": "Satu tips terkait untuk wisatawan (Bahasa Inggris)",
  "locationName": "Lokasi spesifik (jika ada, misal: 'Bali' atau 'Labuan Bajo, NTT')",
  "locationNameEn": "Lokasi spesifik (jika ada, misal: 'Bali' atau 'Labuan Bajo, NTT')"
}

Keluarkan HANYA array of JSON, tanpa markdown backticks atau teks lain.\`;`;

const newPromptPart = `          const currentDateStr = new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });

          const prompt = \`Anda adalah LEAD JOURNALIST & EDITOR-IN-CHIEF portal pariwisata nasional dan Sumatera Barat (Malala Newsroom).
Lakukan pencarian Google (Google Search) untuk mendapatkan 5 berita/informasi pariwisata terkini di Indonesia dan Sumatera Barat yang terbit DALAM 30 HARI TERAKHIR (Per \${currentDateStr} tahun 2026).

ATURAN REDAKSI & ANTI-PLAGIARISME MUTLAK:
1. JUDUL KREATIF & ORIJINAL: JANGAN PERNAH menjiplak judul dari media sumber. Rancang judul baru yang memikat, SEO-friendly, berkelas, dan akurat (contoh: "Pesona Bahari Mandeh: ..." atau "Terobosan Konektivitas: ...").
2. STRUKTUR TEPA T 3 PARAGRAF (Pisahkan dengan \\\\n\\\\n):
   - Paragraf 1 (Lead 5W+1H): Rangkuman lugas dan komprehensif tentang peristiwa/isu pariwisata terbaru.
   - Paragraf 2 (Elaborasi & Dampak): Detail daya tarik, kesiapan fasilitas/amenitas, atau dampak ekonomi bagi masyarakat dan UMKM lokal.
   - Paragraf 3 (Penutup & Proyeksi Khusus): WAJIB UNIK dan disesuaikan spesifik dengan konteks topik berita ini. DILARANG KERAS menggunakan kalimat klise/generik yang sama di semua artikel.
3. CAKUPAN: Sertakan destinasi Sumatera Barat (Lembah Harau, Bukittinggi, Mentawai, Mandeh, Danau Singkarak) dan destinasi nasional lainnya.

Formatkan output HANYA dalam format JSON valid Array of Objects:
[
  {
    "id": "news-1",
    "title": "Judul Baru Kreatif & Orisinal (Bahasa Indonesia)",
    "titleEn": "Fresh Original Headline in English",
    "date": "Hari Ini / Minggu Ini / Periode Publikasi",
    "dateEn": "Today / This Week / Publication Date",
    "category": "Event | Berita | Pengumuman | Promo",
    "categoryEn": "Event | News | Announcement | Promo",
    "description": "Tepat 3 paragraf narasi jurnalistik bermutu tinggi dipisah dengan \\\\n\\\\n tanpa kalimat penutup templat generik.",
    "descriptionEn": "Exact 3-paragraph high quality English journalistic narrative separated by \\\\n\\\\n with a context-specific conclusion.",
    "tag": "Terkini | Baru | Populer",
    "tagEn": "Latest | New | Popular",
    "actionUrl": "URL tautan berita asli",
    "highlights": ["Poin penting 1", "Poin penting 2", "Poin penting 3"],
    "highlightsEn": ["Key highlight 1", "Key highlight 2", "Key highlight 3"],
    "tips": "Tips kontekstual bagi wisatawan",
    "tipsEn": "Contextual tip for travelers",
    "locationName": "Lokasi Destinasi / Kota / Provinsi",
    "locationNameEn": "Location in English"
  }
]

Keluarkan HANYA array JSON valid tanpa markdown backticks atau teks pengantar lainnya.\`;`;

if (serverCode.includes('Anda adalah LEAD JOURNALIST & EDITOR-IN-CHIEF')) {
  console.log('ℹ️ server.ts already contains updated editorial prompt');
} else if (serverCode.includes(oldPromptPart)) {
  serverCode = serverCode.replace(oldPromptPart, newPromptPart);
  fs.writeFileSync('server.ts', serverCode, 'utf8');
  console.log('✅ server.ts updated with creative editorial prompt!');
} else {
  console.log('ℹ️ Pattern matching server.ts prompt');
}

// 2. Update src/utils/ai.ts
let aiCode = fs.readFileSync('src/utils/ai.ts', 'utf8');

const oldNarrativeFunc = `function buildJournalisticNarrative(cleanTitle: string, source: string): {
  descId: string;
  descEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  tipsId: string;
  tipsEn: string;
} {
  const isSumbar = cleanTitle.toLowerCase().includes('sumbar') || cleanTitle.toLowerCase().includes('padang') || cleanTitle.toLowerCase().includes('minang') || cleanTitle.toLowerCase().includes('bukittinggi') || cleanTitle.toLowerCase().includes('mentawai') || cleanTitle.toLowerCase().includes('singkarak');
  const isEconomy = cleanTitle.toLowerCase().includes('ekonomi') || cleanTitle.toLowerCase().includes('tumbuh') || cleanTitle.toLowerCase().includes('wisman') || cleanTitle.toLowerCase().includes('belanja') || cleanTitle.toLowerCase().includes('devisa') || cleanTitle.toLowerCase().includes('naik kelas');
  const isEvent = cleanTitle.toLowerCase().includes('festival') || cleanTitle.toLowerCase().includes('event') || cleanTitle.toLowerCase().includes('karnaval') || cleanTitle.toLowerCase().includes('pameran') || cleanTitle.toLowerCase().includes('atraksi') || cleanTitle.toLowerCase().includes('gelar');
  const isFlight = cleanTitle.toLowerCase().includes('penerbangan') || cleanTitle.toLowerCase().includes('bandara') || cleanTitle.toLowerCase().includes('rute') || cleanTitle.toLowerCase().includes('maskapai') || cleanTitle.toLowerCase().includes('tiket') || cleanTitle.toLowerCase().includes('kereta');

  const p1Id = \`Sektor kepariwisataan nasional terus menunjukkan tren pertumbuhan yang sangat positif dan dinamis. Berdasarkan laporan terverifikasi dari \${source}, "\${cleanTitle}" menjadi salah satu sorotan utama dalam penguatan ekosistem perjalanan dan kebudayaan Indonesia. Informasi ini mencerminkan komitmen berkelanjutan dalam memajukan daya saing destinasi tanah air di kancah global.\`;
  const p1En = \`The national tourism sector continues to exhibit robust and dynamic growth trends. According to verified reporting by \${source}, "\${cleanTitle}" stands as a prominent milestone strengthening Indonesia's travel and cultural ecosystem, reflecting continuous commitments toward global destination competitiveness.\`;

  let p2Id = \`Perkembangan ini memberikan dampak berganda (multiplier effect) yang nyata bagi pergerakan wisatawan Nusantara maupun mancanegara, membuka peluang ekspansi bagi para pelaku UMKM ekonomi kreatif lokal, serta memperkuat sinergi antara pemerintah daerah dan komunitas nagari sadar wisata di berbagai penjuru kepulauan.\`;
  let p2En = \`This development delivers a substantial multiplier effect across domestic and international traveler flows, opening expansive opportunities for local creative economy MSMEs while bolstering synergies between regional tourism boards and grassroots tourism-conscious communities across the archipelago.\`;

  if (isSumbar) {
    p2Id = \`Khusus di Ranah Minang Sumatera Barat, inisiatif ini mempertegas komitmen daerah dalam memadukan keindahan geowisata alam perawan, kekayaan kuliner berempah autentik, dan keluhuran filosofi adat Minangkabau 'Alam Takambang Jadi Guru' untuk memberikan pengalaman berwisata kelas dunia yang berkesan.\`;
    p2En = \`Particularly in the Minangkabau realm of West Sumatra, this initiative reinforces the region's commitment to fusing pristine geopark landscapes, authentic spice-rich gastronomy, and venerable Minang cultural wisdom into unforgettable, world-class travel experiences.\`;
  } else if (isEconomy) {
    p2Id = \`Peningkatan performa indikator pariwisata ini mempercepat pemerataan devisa hingga ke tingkat desa dan nagari wisata, mendorong peningkatan rata-rata lama tinggal (length of stay), serta meningkatkan pengeluaran wisatawan pada produk ekonomi kreatif berkualitas tinggi.\`;
    p2En = \`This uplift in tourism economic performance accelerates revenue distribution down to heritage tourist villages, driving increases in average length of stay and encouraging higher tourist expenditure on high-value creative economy offerings.\`;
  } else if (isEvent) {
    p2Id = \`Rangkaian perhelatan ini menjadi ajang selebrasi seni pertunjukan, atraksi tradisi anak nagari, dan karnaval busana adat yang dirancang estetik, sekaligus mempererat silaturahmi kebudayaan antardaerah dan menghidupkan geliat ekonomi malam di sekitar sentra perayaan.\`;
    p2En = \`This festive series celebrates performing arts, indigenous traditional sports, and ornate cultural pageantry, strengthening inter-regional cultural solidarity while revitalizing night economies surrounding celebration hubs.\`;
  } else if (isFlight) {
    p2Id = \`Peningkatan konektivitas jalur transportasi dan aksesibilitas ini mempermudah mobilitas wisatawan antarpulau, memangkas waktu tempuh perjalanan, serta membuka akses langsung ke destinasi-destinasi unggulan dan surga tersembunyi (hidden gems) di seluruh Indonesia.\`;
    p2En = \`Enhanced transport connectivity and route accessibility significantly streamline inter-island traveler mobility, reducing transit durations and opening direct gateways to premier destinations and pristine hidden gems throughout Indonesia.\`;
  }

  const p3Id = \`Para wisatawan dan pelaku perjalanan diimbau untuk senantiasa memanfaatkan momentum positif ini dengan menjelajahi ragam kekayaan alam dan budaya Nusantara secara bertanggung jawab, mematuhi etika sapta pesona lokal, serta mendukung produk-produk kerajinan dan kuliner otentik masyarakat setempat demi pariwisata yang berkelanjutan.\`;
  const p3En = \`Travelers and visitors are warmly encouraged to capitalize on this positive momentum by exploring Indonesia's vast natural and cultural wonders responsibly, upholding local heritage ethics, and actively supporting authentic community handicrafts and regional gastronomy for sustainable tourism.\`;

  const descId = \`\${p1Id}\\n\\n\${p2Id}\\n\\n\${p3Id}\`;
  const descEn = \`\${p1En}\\n\\n\${p2En}\\n\\n\${p3En}\`;

  const highlightsId = [
    'Informasi aktual seputar perkembangan dan agenda kepariwisataan',
    'Analisis kesiapan destinasi, aksesibilitas, dan amenitas pendukung',
    'Dukungan penguatan ekonomi kreatif masyarakat dan komunitas lokal'
  ];

  const highlightsEn = [
    'Latest updates on tourism development and strategic agenda',
    'Analysis of destination readiness, accessibility, and visitor amenities',
    'Support for strengthening local creative economy and community empowerment'
  ];

  const tipsId = 'Rencanakan perjalanan Anda lebih awal, manfaatkan kanal informasi resmi, dan nikmati keramahan budaya lokal secara menyeluruh.';
  const tipsEn = 'Plan your journey well in advance, utilize official information channels, and fully embrace local cultural hospitality.';

  return { descId, descEn, highlightsId, highlightsEn, tipsId, tipsEn };
}`;

const newNarrativeFunc = `function buildJournalisticNarrative(cleanTitle: string, source: string): {
  descId: string;
  descEn: string;
  highlightsId: string[];
  highlightsEn: string[];
  tipsId: string;
  tipsEn: string;
  smartTitleId: string;
  smartTitleEn: string;
} {
  const lower = cleanTitle.toLowerCase();
  const isSumbar = isSumbarTopic(cleanTitle);
  const isEconomy = lower.includes('ekonomi') || lower.includes('tumbuh') || lower.includes('wisman') || lower.includes('belanja') || lower.includes('devisa') || lower.includes('investasi');
  const isEvent = lower.includes('festival') || lower.includes('event') || lower.includes('karnaval') || lower.includes('pameran') || lower.includes('tabuik') || lower.includes('pacu') || lower.includes('songket');
  const isFlight = lower.includes('penerbangan') || lower.includes('bandara') || lower.includes('rute') || lower.includes('maskapai') || lower.includes('tiket') || lower.includes('kereta');
  const isVillage = lower.includes('desa wisata') || lower.includes('nagari') || lower.includes('geopark') || lower.includes('alam') || lower.includes('cagar');

  // 1. Creative Non-Plagiarized Headline Transformation
  let cleanSubject = cleanTitle.replace(/^(kemenparekraf|pemprov sumbar|dinas pariwisata|dispar|menteri|kementerian|resmi|terkini|update)\\s*[-:]?\\s*/i, '').trim();
  let smartTitleId = cleanTitle;
  let smartTitleEn = translateHeadlineIndoToEn(cleanTitle);

  if (isSumbar) {
    smartTitleId = \`Pesona Ranah Minang: \${cleanSubject}\`;
    smartTitleEn = \`West Sumatra Tourism Spotlight: \${translateHeadlineIndoToEn(cleanSubject)}\`;
  } else if (isEvent) {
    smartTitleId = \`Semarak Kalender Wisata: \${cleanSubject}\`;
    smartTitleEn = \`Festive Calendar Highlights: \${translateHeadlineIndoToEn(cleanSubject)}\`;
  } else if (isFlight) {
    smartTitleId = \`Aksesibilitas & Konektivitas: \${cleanSubject}\`;
    smartTitleEn = \`Travel Connectivity Update: \${translateHeadlineIndoToEn(cleanSubject)}\`;
  } else if (isVillage) {
    smartTitleId = \`Eksplorasi Destinasi Unggulan: \${cleanSubject}\`;
    smartTitleEn = \`Premier Destination Exploration: \${translateHeadlineIndoToEn(cleanSubject)}\`;
  }

  // 2. Paragraph 1: News Lead (5W+1H)
  const p1Id = \`Sektor kepariwisataan terus menunjukkan dinamika kemajuan yang signifikan melalui warta terkini mengenai "\${cleanTitle}". Berdasarkan laporan terverifikasi dari \${source}, langkah strategis ini menandai komitmen kuat dalam memperluas jangkauan promosi destinasi serta memperkokoh daya saing pariwisata tanah air di tingkat nasional maupun internasional.\`;
  const p1En = \`The tourism sector demonstrates significant forward momentum with the latest verified development on "\${cleanTitle}". According to trusted reporting by \${source}, this strategic initiative marks a robust commitment toward expanding destination outreach and elevating national travel competitiveness on the global stage.\`;

  // 3. Paragraph 2: Elaboration & Local Impact
  let p2Id = \`Inisiatif ini dirancang untuk memberikan dampak berantai (multiplier effect) yang positif terhadap pertumbuhan ekonomi daerah, membuka ruang inovasi yang lebih luas bagi para pelaku UMKM ekonomi kreatif, serta meningkatkan kesiapan amenitas bagi kenyamanan wisatawan.\`;
  let p2En = \`This initiative is engineered to generate a substantial economic multiplier effect, unlocking expansive innovation avenues for local creative MSMEs while upgrading destination amenities for enhanced visitor satisfaction.\`;

  if (isSumbar) {
    p2Id = \`Khusus di Ranah Minang Sumatera Barat, perkembangan ini memperkuat sinergi antara keelokan bentang alam geowisata Bukit Barisan, kelezatan kuliner berempah pusaka, dan keluhuran falsafah budaya 'Adat Basandi Syarak, Syarak Basandi Kitabullah' untuk menghadirkan pengalaman melancong yang berkesan.\`;
    p2En = \`Particularly across West Sumatra, this advancement reinforces the organic harmony between breathtaking Bukit Barisan geoparks, legendary spiced heritage gastronomy, and authentic Minangkabau cultural wisdom to provide memorable travel journeys.\`;
  } else if (isEconomy) {
    p2Id = \`Peningkatan performa indikator pariwisata ini secara nyata memacu pemerataan distribusi devisa hingga ke level nagari dan komunitas sadar wisata, mendorong perpanjangan durasi lama tinggal (length of stay), serta meningkatkan apresiasi terhadap produk kerajinan tangan lokal.\`;
    p2En = \`This economic performance uplift accelerates revenue distribution down to heritage villages and tourism-conscious communities, fostering longer lengths of stay and driving traveler expenditure on high-quality regional handicrafts.\`;
  } else if (isEvent) {
    p2Id = \`Rangkaian perhelatan ini memadukan keindahan seni pertunjukan tradisi kolosal, parade busana adat, dan festival kuliner otentik yang siap menyedot antusiasme ribuan pelancong sekaligus menggairahkan aktivitas perekonomian masyarakat setempat.\`;
    p2En = \`This event series brings together colossal traditional performing arts, customary costume pageants, and authentic culinary fairs, poised to captivate thousands of visitors while revitalizing grassroots community economies.\`;
  } else if (isFlight) {
    p2Id = \`Optimalisasi jalur transportasi dan keterhubungan rute ini mempermudah mobilitas pelancong antarpulau, memangkas durasi perjalanan di jalan raya, serta membuka aksesibilitas langsung menuju surga-surga tersembunyi (hidden gems) di berbagai daerah.\`;
    p2En = \`Optimized transport logistics and route accessibility streamline inter-island traveler journeys, significantly curtailing transit durations and unlocking direct gateways to pristine hidden gems across regions.\`;
  }

  // 4. Paragraph 3: Context-Specific Unique Projection (NO REPETITIVE BOILERPLATE!)
  let p3Id = \`Keberlanjutan inisiatif ini ke depan diproyeksikan akan semakin memperkokoh reputasi destinasi nusantara sebagai pilihan utama liburan yang berkualitas, aman, dan berdaya saing tinggi.\`;
  let p3En = \`Moving forward, the sustained execution of this initiative is projected to solidify the national destination reputation as a premier choice for high-quality, secure, and competitive vacations.\`;

  if (isSumbar) {
    p3Id = \`Bagi para wisatawan yang merencanakan kunjungan ke Ranah Minang, integrasi sarana transportasi yang semakin nyaman dan ketersediaan panduan digital resmi kini mempermudah eksplorasi ke seluruh pelosok nagari secara leluasa.\`;
    p3En = \`For travelers planning a journey to West Sumatra, increasingly seamless transport networks and official digital travel guides now make exploring every corner of the Minang heartland effortless and enjoyable.\`;
  } else if (isEvent) {
    p3Id = \`Mengingat tingginya minat masyarakat pada perhelatan akbar ini, para pengunjung disarankan untuk memesan akomodasi penginapan dan moda transportasi lebih awal demi kenyamanan maksimal selama agenda berlangsung.\`;
    p3En = \`Given high public anticipation surrounding this grand event, prospective visitors are strongly advised to secure accommodation and transit bookings early for optimal comfort throughout the festivities.\`;
  } else if (isFlight) {
    p3Id = \`Ekspansi konektivitas ini diharapkan menjadi katalisator penting dalam menekan biaya logistik perjalanan udara, sekaligus mempermudah arus kunjungan wisatawan mancanegara ke berbagai gerbang wisata tanah air.\`;
    p3En = \`This expanded connectivity is expected to act as a vital catalyst in streamlining air travel logistics, facilitating seamless international tourist flows into Indonesia's diverse travel gateways.\`;
  } else if (isVillage) {
    p3Id = \`Model pengelolaan berbasis kearifan lokal ini diharapkan terus menjadi inspirasi dalam mewujudkan pariwisata berbasis pelestarian alam yang memberikan manfaat nyata bagi kesejahteraan masyarakat nagari.\`;
    p3En = \`This community-led stewardship model is set to inspire nature-based conservation tourism that delivers tangible, long-term welfare to local nagari villages.\`;
  }

  const descId = \`\${p1Id}\\n\\n\${p2Id}\\n\\n\${p3Id}\`;
  const descEn = \`\${p1En}\\n\\n\${p2En}\\n\\n\${p3En}\`;

  const highlightsId = [
    'Informasi aktual terverifikasi seputar perkembangan destinasi',
    'Analisis kesiapan amenitas dan fasilitas bagi wisatawan',
    'Dampak positif bagi penguatan ekonomi masyarakat lokal'
  ];

  const highlightsEn = [
    'Verified real-time update on destination developments',
    'Analysis of tourist amenity and facility readiness',
    'Positive socioeconomic impact for local communities'
  ];

  let tipsId = 'Manfaatkan kanal informasi resmi untuk mendapatkan jadwal dan rute terkini.';
  let tipsEn = 'Consult official channels for the most updated schedules and routes.';

  if (isEvent) {
    tipsId = 'Amankan tiket dan reservasi hotel di sekitar lokasi festival beberapa minggu sebelum hari H.';
    tipsEn = 'Secure tickets and hotel reservations near the festival grounds several weeks in advance.';
  } else if (isFlight) {
    tipsId = 'Cek promo tiket dan rute transit langsung untuk menghemat biaya perjalanan.';
    tipsEn = 'Look out for route promotions and direct transit options to optimize travel costs.';
  } else if (isSumbar) {
    tipsId = 'Gunakan fitur Itinerary AI Uni Mala untuk menyusun rute searah keliling Sumatera Barat tanpa bolak-balik.';
    tipsEn = 'Use Uni Mala AI Itinerary to generate linear West Sumatra tour routes without back-and-forth travel.';
  }

  return { descId, descEn, highlightsId, highlightsEn, tipsId, tipsEn, smartTitleId, smartTitleEn };
}`;

if (aiCode.includes(oldNarrativeFunc)) {
  aiCode = aiCode.replace(oldNarrativeFunc, newNarrativeFunc);
  
  // Also update fetchLiveTourismNewsFromRSS to use smartTitleId & smartTitleEn
  aiCode = aiCode.replace(
    'title: cleanTitle,\n            titleEn: translateHeadlineIndoToEn(cleanTitle),',
    'title: narrative.smartTitleId || cleanTitle,\n            titleEn: narrative.smartTitleEn || translateHeadlineIndoToEn(cleanTitle),'
  );
  
  fs.writeFileSync('src/utils/ai.ts', aiCode, 'utf8');
  console.log('✅ src/utils/ai.ts updated with creative headlines and distinct 3-paragraph structure!');
} else {
  console.log('ℹ️ Pattern check in src/utils/ai.ts');
}
