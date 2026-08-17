import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-malaladiscoverwe-562e18f6-b088-4083-a613-a873b9667b3f");

async function syncToGitHub() {
  console.log('🔄 1/4 Menghubungi Google Firebase Firestore...');
  
  try {
    const destSnap = await getDocs(collection(db, 'destinations'));
    const cultSnap = await getDocs(collection(db, 'cultures'));
    const culSnap = await getDocs(collection(db, 'culinaries'));
    const evSnap = await getDocs(collection(db, 'events'));
    const downSnap = await getDocs(collection(db, 'downloads'));
    const hotSnap = await getDocs(collection(db, 'hot_info'));
    const settSnap = await getDocs(collection(db, 'app_settings'));

    console.log(`📦 Ditemukan dari Firestore:`);
    console.log(`   - Destinasi: ${destSnap.docs.length}`);
    console.log(`   - Kebudayaan: ${cultSnap.docs.length}`);
    console.log(`   - Kuliner: ${culSnap.docs.length}`);
    console.log(`   - Event: ${evSnap.docs.length}`);
    console.log(`   - Downloads: ${downSnap.docs.length}`);
    console.log(`   - Hot Info: ${hotSnap.docs.length}`);

    // If collections exist in Firestore, update backup JSON for easy inspection
    const dataBackup = {
      timestamp: new Date().toISOString(),
      destinations: destSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      cultureItems: cultSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      culinaryItems: culSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      eventItems: evSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      downloadItems: downSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      hotInfoItems: hotSnap.docs.map(d => ({ id: d.id, ...d.data() })),
      appSettings: settSnap.docs.length > 0 ? settSnap.docs[0].data() : null
    };

    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(dataBackup, null, 2), 'utf-8');
    console.log(`💾 2/4 Backup data tersimpan di: src/data/firestore_backup.json`);

    console.log('🚀 3/4 Menjalankan Git Commit...');
    try {
      execSync('git add .', { stdio: 'inherit' });
      execSync('git commit -m "sync: update live data from admin Firestore database"', { stdio: 'inherit' });
    } catch (e) {
      console.log('ℹ️ Tidak ada file yang berubah atau commit sudah up to date.');
    }

    console.log('📤 4/4 Mem-push perubahan ke GitHub main branch...');
    execSync('git push origin main', { stdio: 'inherit' });

    console.log('\n✅ SUKSES: Seluruh data admin terbaru telah tersimpan dan ter-push ke GitHub!');
  } catch (error) {
    console.error('❌ Terjadi kesalahan saat sinkronisasi:', error);
  } finally {
    process.exit(0);
  }
}

syncToGitHub();
