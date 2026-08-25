const fs = require('fs');
let code = fs.readFileSync('scripts/generate_ssg_pages.ts', 'utf8');

// Update FAQ 1
code = code.replace(
  /"Apa saja tempat wisata paling populer di Sumatera Barat\?"/g,
  '"Apa saja tempat wisata hits di Sumbar 2026 yang wajib dikunjungi?"'
);
code = code.replace(
  /"Sumatera Barat memiliki destinasi unggulan kelas dunia seperti Geopark Lembah Harau \(tebing granit & air terjun\).*?"/s,
  '"Untuk rekomendasi tempat wisata hits di Sumbar 2026, Anda wajib mengunjungi surga tersembunyi Mandeh (Raja Ampat-nya Sumatera Barat), pesona wisata Lembah Harau terbaru, menikmati sunset dan mencari info tiket masuk Ngarai Sianok di Bukittinggi, hingga selancar ombak kelas dunia di Kepulauan Mentawai."'
);

// Update FAQ 2
code = code.replace(
  /"Kapan waktu terbaik untuk berkunjung dan liburan ke Sumatera Barat\?"/g,
  '"Kapan jadwal Festival Tabuik Pariaman dan jadwal Pacu Jawi 2026 diadakan?"'
);
code = code.replace(
  /"Waktu terbaik adalah sepanjang musim kemarau antara bulan Mei hingga September untuk trekking alam dan wisata bahari pulau.*?bulan Juli hingga September."/s,
  '"Jadwal Pacu Jawi 2026 di Tanah Datar biasanya diadakan bergilir setiap akhir pekan pasca-panen raya. Sementara untuk kapan Festival Tabuik Pariaman 2026, acara puncak (Tabuik Naik Pangkek dan Dibuang ke Laut) diselenggarakan bertepatan dengan 10 Muharram kalender Hijriah. Anda juga bisa mengecek jadwal Tour de Singkarak di portal kalender event kami."'
);

// Update FAQ 3
code = code.replace(
  /"Apa kuliner khas Minangkabau yang wajib dicoba saat berwisata\?"/g,
  '"Apa saja rekomendasi kuliner khas Padang Bukittinggi yang terenak?"'
);
code = code.replace(
  /"Kuliner wajib Minang meliputi Rendang Daging \(dinobatkan sebagai makanan terlezat di dunia\).*?Teh Talua."/s,
  '"Rekomendasi kuliner khas Padang Bukittinggi meliputi Rendang Daging autentik, daftar tempat makan Nasi Kapau asli di Pasar Bawah, hingga berburu sate padang terenak di Sumbar (seperti Sate Mak Syukur atau Sate Danguang-Danguang). Jangan lewatkan juga Itiak Lado Mudo Koto Gadang."'
);

// Update FAQ 5
code = code.replace(
  /"Di mana saya bisa mengunduh buku panduan wisata dan peta pariwisata Sumbar 2026\?"/g,
  '"Di mana link download peta wisata Sumatera Barat PDF gratis?"'
);
code = code.replace(
  /"Anda dapat mengunduh E-Booklet Buku Panduan Wisata Resmi Sumatera Barat 113 Halaman dan Kalender Event 2026 secara gratis dalam format PDF resolusi tinggi langsung di portal https:\/\/malala\.my\.id\/unduhan."/s,
  '"Anda bisa download peta wisata Sumatera Barat PDF gratis dan download buku panduan pariwisata Sumbar 2026 PDF (lengkap 113 halaman) resolusi tinggi langsung melalui halaman Unduhan di portal resmi Malala."'
);

// Update Categories
code = code.replace(
  /description: 'Jelajahi 38\+ destinasi alam unggulan: Geopark Lembah Harau, Danau Singkarak, Danau Maninjau, Jam Gadang, Ngarai Sianok, Mandeh, Mentawai, dan Candi Padang Roco\.'/g,
  "description: 'Rekomendasi tempat wisata hits di Sumbar 2026. Jelajahi surga tersembunyi Mandeh, wisata Lembah Harau terbaru, Mentawai, info tiket masuk Ngarai Sianok & Danau Singkarak.'"
);

code = code.replace(
  /description: 'Daftar makanan terenak khas Minang: Rendang Daging, Sate Padang, Nasi Kapau Gulai Tambusu, Soto Padang, Gulai Itiak Lado Mudo, Dendeng Batokok, dan Teh Talua\.'/g,
  "description: 'Rekomendasi kuliner khas Padang Bukittinggi: berburu sate padang terenak di Sumbar, tempat makan Nasi Kapau asli, Rendang autentik, Itiak Lado Mudo, & Teh Talua.'"
);

code = code.replace(
  /description: 'Jadwal lengkap festival budaya KEN 2026: Pacu Jawi, Festival Tabuik Pariaman, Rang Solok Baralek Gadang, SISC Sawahlunto, dan Payakumbuh Botuang Festival\.'/g,
  "description: 'Cek jadwal Pacu Jawi 2026 Tanah Datar, info kapan Festival Tabuik Pariaman 2026, jadwal Tour de Singkarak, & kalender event budaya Sumatera Barat KEN 2026 terlengkap.'"
);

code = code.replace(
  /description: 'Unduh gratis buku panduan wisata resmi 113 halaman dan kalender event 27 halaman format PDF resolusi tinggi\.'/g,
  "description: 'Download peta wisata Sumatera Barat PDF gratis, download buku panduan pariwisata Sumbar 2026 PDF (113 halaman), serta kalender event wisata beresolusi tinggi.'"
);

fs.writeFileSync('scripts/generate_ssg_pages.ts', code, 'utf8');
console.log("SSG updated successfully.");
