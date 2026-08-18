import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Uses (default) database

async function seedDefaultDb() {
  console.log("🚀 Menghubungkan ke database Firestore (default)...");
  
  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  if (!fs.existsSync(backupPath)) {
    console.error("Backup file tidak ditemukan!");
    return;
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
  console.log(`📦 Membaca data backup:`);
  console.log(`   - Destinasi: ${backupData.destinations?.length || 0}`);
  console.log(`   - Budaya: ${backupData.cultureItems?.length || 0}`);
  console.log(`   - Kuliner: ${backupData.culinaryItems?.length || 0}`);
  console.log(`   - Event: ${backupData.eventItems?.length || 0}`);
  console.log(`   - Unduhan: ${backupData.downloadItems?.length || 0}`);
  console.log(`   - Hot Info: ${backupData.hotInfoItems?.length || 0}`);

  // Seed Destinations
  if (backupData.destinations) {
    for (const item of backupData.destinations) {
      await setDoc(doc(db, 'destinations', item.id), item);
      console.log(`  ✓ Destinasi: ${item.title}`);
    }
  }

  // Seed Cultures
  if (backupData.cultureItems) {
    for (const item of backupData.cultureItems) {
      await setDoc(doc(db, 'cultures', item.id), item);
      console.log(`  ✓ Budaya: ${item.title}`);
    }
  }

  // Seed Culinaries
  if (backupData.culinaryItems) {
    for (const item of backupData.culinaryItems) {
      await setDoc(doc(db, 'culinaries', item.id), item);
      console.log(`  ✓ Kuliner: ${item.title}`);
    }
  }

  // Seed Events
  if (backupData.eventItems) {
    for (const item of backupData.eventItems) {
      await setDoc(doc(db, 'events', item.id), item);
      console.log(`  ✓ Event: ${item.title}`);
    }
  }

  // Seed Downloads
  if (backupData.downloadItems) {
    for (const item of backupData.downloadItems) {
      await setDoc(doc(db, 'downloads', item.id), item);
      console.log(`  ✓ Unduhan: ${item.title}`);
    }
  }

  // Seed Hot Info
  if (backupData.hotInfoItems) {
    for (const item of backupData.hotInfoItems) {
      await setDoc(doc(db, 'hotinfo', item.id), item);
      console.log(`  ✓ Hot Info: ${item.title}`);
    }
  }

  // Seed Settings
  if (backupData.appSettings) {
    await setDoc(doc(db, 'settings', 'hero'), backupData.appSettings, { merge: true });
    console.log(`  ✓ Pengaturan Aplikasi tersimpan`);
  }

  console.log("\n🎉 SELESAI! Seluruh data berhasil diunggah ke Google Cloud Firestore (default)!");
  process.exit(0);
}

seedDefaultDb().catch(e => {
  console.error("Gagal seeding:", e);
  process.exit(1);
});
