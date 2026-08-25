const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

// Update Kawasan Wisata Bahari Mandeh
code = code.replace(
  /Kawasan Wisata Bahari Mandeh di Kabupaten Pesisir Selatan merupakan surga bahari tropis/g,
  "Kawasan Wisata Bahari Mandeh dikenal sebagai surga tersembunyi Mandeh di Kabupaten Pesisir Selatan, merupakan surga bahari tropis"
);

// Update Sate Padang
code = code.replace(
  /Sate Padang adalah perpaduan hidangan/g,
  "Berburu sate padang terenak di Sumbar adalah agenda wajib. Sate Padang adalah perpaduan hidangan"
);

// Update Nasi Kapau
code = code.replace(
  /Nasi Kapau adalah mahakarya seni meracik nasi rames/g,
  "Pecinta kuliner selalu mencari tempat makan nasi kapau asli. Nasi Kapau adalah mahakarya seni meracik nasi rames"
);

// Update Lembah Harau
code = code.replace(
  /Geopark Lembah Harau di Kabupaten Lima Puluh Kota adalah kawasan lembah/g,
  "Menjadi wisata Lembah Harau terbaru yang viral di 2026, Geopark Lembah Harau di Kabupaten Lima Puluh Kota adalah kawasan lembah"
);

// Update Ngarai Sianok
code = code.replace(
  /Ngarai Sianok adalah lembah curam purba/g,
  "Sebelum berkunjung, pastikan Anda mengecek info tiket masuk Ngarai Sianok. Ngarai Sianok adalah lembah curam purba"
);

// Update Pacu Jawi
code = code.replace(
  /Pacu Jawi adalah tradisi/g,
  "Cek selalu jadwal Pacu Jawi 2026 Tanah Datar! Pacu Jawi adalah tradisi"
);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Content updated successfully 2.");
