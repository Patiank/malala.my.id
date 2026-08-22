import * as fs from 'fs';
import * as path from 'path';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Default DB

async function pullFirestoreData() {
  console.log("Menarik data terbaru dari Firestore...");
  const collections = ['destinations', 'cultures', 'culinaries', 'souvenirs', 'events', 'downloads', 'hotinfo'];
  const backupData: any = {
    timestamp: new Date().toISOString()
  };

  try {
    for (const colName of collections) {
      const snap = await getDocs(collection(db, colName));
      const items = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Map to backup format
      if (colName === 'destinations') backupData.destinations = items;
      if (colName === 'cultures') backupData.cultureItems = items;
      if (colName === 'culinaries') backupData.culinaryItems = items;
      if (colName === 'souvenirs') backupData.souvenirItems = items;
      if (colName === 'events') backupData.eventItems = items;
      if (colName === 'downloads') backupData.downloadItems = items;
      if (colName === 'hotinfo' || colName === 'hot_info') backupData.hotInfoItems = items;
      
      console.log(`✅ ${colName}: ${items.length} data`);
    }

    // App settings (singleton)
    const settingsSnap = await getDoc(doc(db, 'settings', 'hero'));
    if (settingsSnap.exists()) {
      backupData.appSettings = settingsSnap.data();
      console.log(`✅ app_settings (hero): Tersedia`);
    }

    const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
    fs.writeFileSync(backupPath, JSON.stringify(backupData, null, 2), 'utf-8');
    
    console.log(`🎉 Berhasil! Seluruh data terbaru telah disimpan ke ${backupPath}`);
    process.exit(0);
  } catch (err) {
    console.error("Gagal menarik data dari Firestore:", err);
    process.exit(1);
  }
}

pullFirestoreData();
