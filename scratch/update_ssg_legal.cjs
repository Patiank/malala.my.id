const fs = require('fs');
let ssgTs = fs.readFileSync('scripts/generate_ssg_pages.ts', 'utf8');

const additionalCategories = `
    {
      route: 'hotinfo',
      title: 'Hot Info & Berita Pariwisata Terkini Sumbar - Malala',
      description: 'Dapatkan update berita pariwisata, penemuan destinasi baru, promo tiket, dan informasi cuaca liburan di Sumatera Barat.',
      h1: 'Hot Info & Berita Pariwisata Sumatera Barat Terkini'
    },
    {
      route: 'about',
      title: 'Tentang Kami - Portal Wisata Malala Sumatera Barat',
      description: 'Tentang Malala, portal pariwisata cerdas independen yang mempromosikan keindahan alam, budaya, dan kuliner Sumatera Barat (Ranah Minang).',
      h1: 'Tentang Malala - Portal Wisata Sumatera Barat'
    },
    {
      route: 'privacy',
      title: 'Kebijakan Privasi (Privacy Policy) - Malala',
      description: 'Kebijakan Privasi untuk pengguna situs web pariwisata Malala. Informasi mengenai pengelolaan data, cookie, dan privasi Google AdSense.',
      h1: 'Kebijakan Privasi - Malala.my.id'
    },
    {
      route: 'terms',
      title: 'Syarat dan Ketentuan (Terms of Service) - Malala',
      description: 'Syarat dan ketentuan penggunaan situs web portal pariwisata Malala.my.id.',
      h1: 'Syarat dan Ketentuan Layanan'
    },
    {
      route: 'disclaimer',
      title: 'Sanggahan (Disclaimer) - Malala',
      description: 'Sanggahan atau disclaimer terkait informasi destinasi wisata, harga tiket, dan jadwal event di portal Malala.',
      h1: 'Sanggahan (Disclaimer)'
    },
    {
      route: 'contact',
      title: 'Hubungi Kami (Contact) - Malala',
      description: 'Hubungi tim pengelola Malala untuk kerja sama promosi pariwisata, kritik, saran, atau pembaruan informasi destinasi wisata Sumatera Barat.',
      h1: 'Hubungi Kami - Malala.my.id'
    }
`;

ssgTs = ssgTs.replace(
  /\{\s*route:\s*'hotinfo'[\s\S]*?h1:\s*'Hot Info & Berita Pariwisata Sumatera Barat Terkini'\s*\}/,
  additionalCategories.trim()
);

fs.writeFileSync('scripts/generate_ssg_pages.ts', ssgTs, 'utf8');
console.log('SSG TS updated.');
