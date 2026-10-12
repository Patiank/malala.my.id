import * as fs from 'fs';
import * as path from 'path';

/**
 * Script untuk mengunggah otomatis 4 file PDF ke GitHub Release v1.0.0
 * Menggunakan GitHub REST API (Upload Release Asset)
 */
async function syncPdfsToGithubRelease() {
  const token = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
  const repo = process.env.GITHUB_REPOSITORY || 'Patiank/malala.my.id';
  const tag = 'v1.0.0';

  if (!token) {
    console.error('❌ Gagal: GITHUB_TOKEN tidak ditemukan di environment.');
    console.log('💡 Jalankan dengan: GITHUB_TOKEN=ghp_xxx npx tsx scripts/sync_release_pdfs.ts');
    process.exit(1);
  }

  const downloadsDir = path.join(process.cwd(), 'public', 'downloads');
  const filesToUpload = [
    'malala-panduan-wisata-sumbar-2026.pdf',
    'malala-tourism-guide-sumbar-2026-en.pdf',
    'kalender-event-sumbar-2026.pdf',
    'kalender-event-sumbar-2026-en.pdf'
  ];

  console.log(`🚀 Menghubungi GitHub API untuk repositori: ${repo} (Tag: ${tag})...`);

  // 1. Ambil Release ID dari Tag v1.0.0
  const releaseRes = await fetch(`https://api.github.com/repos/${repo}/releases/tags/${tag}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Malala-App-Uploader'
    }
  });

  if (!releaseRes.ok) {
    const errText = await releaseRes.text();
    console.error(`❌ Gagal mengambil info Release ${tag}: ${releaseRes.status} ${errText}`);
    process.exit(1);
  }

  const releaseData: any = await releaseRes.json();
  const releaseId = releaseData.id;
  const uploadUrlTemplate = releaseData.upload_url; // contoh: https://uploads.github.com/repos/.../releases/{id}/assets{?name,label}
  const baseUploadUrl = uploadUrlTemplate.split('{')[0];

  console.log(`✅ Release ditemukan! ID: ${releaseId}`);
  console.log(`📦 Assets yang ada saat ini: ${releaseData.assets?.length || 0}`);

  // 2. Loop setiap berkas PDF
  for (const filename of filesToUpload) {
    const filePath = path.join(downloadsDir, filename);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ Berkas ${filename} tidak ditemukan di ${downloadsDir}, dilewati.`);
      continue;
    }

    const fileBuffer = fs.readFileSync(filePath);
    const fileSizeMB = (fileBuffer.length / (1024 * 1024)).toFixed(2);
    console.log(`\n⏳ Memproses ${filename} (${fileSizeMB} MB)...`);

    // Periksa apakah asset dengan nama ini sudah ada di release
    const existingAsset = releaseData.assets?.find((a: any) => a.name === filename);
    if (existingAsset) {
      console.log(`   🗑️ Menghapus asset versi lama di GitHub (Asset ID: ${existingAsset.id})...`);
      const delRes = await fetch(`https://api.github.com/repos/${repo}/releases/assets/${existingAsset.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Malala-App-Uploader'
        }
      });
      if (!delRes.ok) {
        console.warn(`   ⚠️ Gagal menghapus asset lama: ${delRes.statusText}`);
      } else {
        console.log(`   ✅ Asset lama berhasil dihapus.`);
      }
    }

    // Unggah asset baru
    console.log(`   ⬆️ Mengunggah ${filename} ke GitHub CDN...`);
    const uploadRes = await fetch(`${baseUploadUrl}?name=${encodeURIComponent(filename)}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/pdf',
        'Content-Length': fileBuffer.length.toString(),
        'User-Agent': 'Malala-App-Uploader'
      },
      body: fileBuffer
    });

    if (uploadRes.ok) {
      console.log(`   🎉 Berhasil diunggah: https://github.com/${repo}/releases/download/${tag}/${filename}`);
    } else {
      const err = await uploadRes.text();
      console.error(`   ❌ Gagal mengunggah ${filename}: ${uploadRes.status} ${err}`);
    }
  }

  console.log(`\n🎉 SINKRONISASI SELESAI: Seluruh E-Book di CDN GitHub Release berhasil diperbarui!`);
}

syncPdfsToGithubRelease().catch(err => {
  console.error('Fatal sync error:', err);
  process.exit(1);
});
