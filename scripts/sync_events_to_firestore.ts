import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { EVENTS_SCHEDULE } from '../src/data/content';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncAllEvents() {
  console.log(`🚀 Mengupdate ${EVENTS_SCHEDULE.length} event ke Firestore Cloud...`);

  for (const item of EVENTS_SCHEDULE) {
    await setDoc(doc(db, 'events', item.id), item, { merge: true });
    console.log(`  ✓ [${item.id}] ${item.title} -> ${item.schedule}`);
  }

  // Update firestore_backup.json as well
  const backupPath = path.join(process.cwd(), 'src', 'data', 'firestore_backup.json');
  if (fs.existsSync(backupPath)) {
    const raw = JSON.parse(fs.readFileSync(backupPath, 'utf-8'));
    raw.eventItems = EVENTS_SCHEDULE;
    fs.writeFileSync(backupPath, JSON.stringify(raw, null, 2), 'utf-8');
    console.log("  ✓ firestore_backup.json updated!");
  }

  console.log("\n🎉 Sukses! Seluruh data event di Firestore dan backup telah sinkron 100%!");
  process.exit(0);
}

syncAllEvents().catch(e => {
  console.error("Error syncing events:", e);
  process.exit(1);
});
