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

async function fetchCollection(database: any, name: string) {
  try {
    const snap = await getDocs(collection(database, name));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    return [];
  }
}

async function syncToGitHub() {
  console.log('🔄 1/4 Menghubungi Google Firebase Firestore...');
  
  // Try default database first, fallback to named DB if empty
  let dbInstance = getFirestore(app);
  let dests = await fetchCollection(dbInstance, 'destinations');
  
  if (dests.length === 0) {
    try {
      const customDb = getFirestore(app, "ai-studio-malaladiscoverwe-562e18f6-b088-4083-a613-a873b9667b3f");
      const customDests = await fetchCollection(customDb, 'destinations');
      if (customDests.length > 0) {
        dbInstance = customDb;
        dests = customDests;
      }
    } catch (e) {}
  }

  const cults = await fetchCollection(dbInstance, 'cultures');
  const culs = await fetchCollection(dbInstance, 'culinaries');
  const evs = await fetchCollection(dbInstance, 'events');
  const downs = await fetchCollection(dbInstance, 'downloads');
  const hots = await fetchCollection(dbInstance, 'hot_info');
  const settings = await fetchCollection(dbInstance, 'app_settings');

  console.log(`📦 Data dari Firestore:`);
  console.log(`   - Destinasi: ${dests.length}`);
  console.log(`   - Kebudayaan: ${cults.length}`);
  console.log(`   - Kuliner: ${culs.length}`);
  console.log(`   - Event: ${evs.length}`);
  console.log(`   - Downloads: ${downs.length}`);
  console.log(`   - Hot Info: ${hots.length}`);

  const dataBackup = {
    timestamp: new Date().toISOString(),
    destinations: dests,
    cultureItems: cults,
    culinaryItems: culs,
    eventItems: evs,
    downloadItems: downs,
    hotInfoItems: hots,
    appSettings: settings.length > 0 ? settings[0] : null
  };

  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  fs.writeFileSync(backupPath, JSON.stringify(dataBackup, null, 2), 'utf-8');
  console.log(`💾 2/4 Backup tersimpan di: src/data/firestore_backup.json`);

  console.log('🔄 2.5/4 Memperbarui HTML, PDF Seamless, dan Export JPG...');
  try {
    execSync('cmd /c npx tsx scripts/export_all_pages_jpg.ts', { stdio: 'inherit' });
  } catch (err) {
    console.warn('Gagal merender PDF otomatis:', err);
  }

  console.log('🚀 3/4 Menjalankan Git Commit...');
  try {
    execSync('git add .', { stdio: 'inherit' });
    execSync('git commit -m "sync: update live data, PDF ebooklet, and high-res page JPGs from admin Firestore"', { stdio: 'inherit' });
  } catch (e) {
    console.log('ℹ️ File repositori sudah up to date.');
  }

  console.log('📤 4/4 Mem-push ke GitHub...');
  execSync('git push origin main', { stdio: 'inherit' });

  console.log('\n✅ SUKSES: Seluruh data admin telah tersinkronisasi dan ter-push ke GitHub!');
  process.exit(0);
}

syncToGitHub();
