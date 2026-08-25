const fs = require('fs');
let code = fs.readFileSync('src/data/content.ts', 'utf8');

// Update Kawasan Wisata Bahari Mandeh
code = code.replace(
  /description: "Kawasan Wisata Bahari Mandeh sering dijuluki sebagai 'Raja Ampat-nya Sumatera Barat'/g,
  'description: "Kawasan Wisata Bahari Mandeh dikenal sebagai surga tersembunyi Mandeh dan sering dijuluki sebagai \'Raja Ampat-nya Sumatera Barat\''
);

// Update Sate Padang
code = code.replace(
  /description: "Sate Padang adalah hidangan sate daging/g,
  'description: "Berburu sate padang terenak di Sumbar adalah agenda wajib. Sate Padang adalah hidangan sate daging'
);

// Update Nasi Kapau
code = code.replace(
  /description: "Nasi Kapau adalah hidangan nasi rames khas dari Nagari Kapau/g,
  'description: "Nasi Kapau adalah hidangan nasi rames khas dari Nagari Kapau. Pecinta kuliner sering mencari tempat makan nasi kapau asli'
);

// Update Lembah Harau
code = code.replace(
  /description: "Lembah Harau adalah sebuah ngarai subur/g,
  'description: "Menjadi salah satu tempat wisata hits di Sumbar 2026, Lembah Harau adalah sebuah ngarai subur'
);

// Update Ngarai Sianok
code = code.replace(
  /description: "Ngarai Sianok adalah sebuah lembah curam/g,
  'description: "Wisatawan sering mencari info tiket masuk Ngarai Sianok sebelum berkunjung. Ngarai Sianok adalah sebuah lembah curam'
);

// Update Pacu Jawi
code = code.replace(
  /description: "Pacu Jawi adalah balapan sapi tradisional khas Minangkabau yang diadakan di Kabupaten Tanah Datar/g,
  'description: "Mencari jadwal Pacu Jawi 2026 Tanah Datar sangat disarankan sebelum ke Sumbar. Pacu Jawi adalah balapan sapi tradisional khas Minangkabau'
);

fs.writeFileSync('src/data/content.ts', code, 'utf8');
console.log("Content updated successfully.");
