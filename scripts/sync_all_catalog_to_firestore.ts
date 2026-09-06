import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, writeBatch } from 'firebase/firestore';
import { DESTINATIONS, CULTURE_ITEMS, CULINARY_ITEMS, EVENTS_SCHEDULE, HOT_INFO_ITEMS } from '../src/data/content';

const firebaseConfig = {
  projectId: 'malala-my-id',
  appId: '1:150503186564:web:64af24b2edc852fb23a2d1',
  apiKey: 'AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE',
  authDomain: 'malala-my-id.firebaseapp.com',
  storageBucket: 'malala-my-id.firebasestorage.app',
  messagingSenderId: '150503186564',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function syncCatalog() {
  console.log('Memulai sinkronisasi seluruh katalog ke Cloud Firestore...');

  console.log('Sinkronisasi ' + DESTINATIONS.length + ' Destinasi...');
  for (const item of DESTINATIONS) {
    await setDoc(doc(db, 'destinations', item.id), item, { merge: true });
    process.stdout.write('.');
  }
  console.log('\nSelesai: ' + DESTINATIONS.length + ' destinasi tersinkron.');

  console.log('Sinkronisasi ' + CULTURE_ITEMS.length + ' Warisan Budaya...');
  for (const item of CULTURE_ITEMS) {
    await setDoc(doc(db, 'cultures', item.id), item, { merge: true });
    process.stdout.write('.');
  }
  console.log('\nSelesai: ' + CULTURE_ITEMS.length + ' budaya tersinkron.');

  console.log('Sinkronisasi ' + CULINARY_ITEMS.length + ' Kuliner Otentik...');
  for (const item of CULINARY_ITEMS) {
    await setDoc(doc(db, 'culinaries', item.id), item, { merge: true });
    process.stdout.write('.');
  }
  console.log('\nSelesai: ' + CULINARY_ITEMS.length + ' kuliner tersinkron.');

  console.log('Sinkronisasi ' + EVENTS_SCHEDULE.length + ' Event CoE / KEN...');
  for (const item of EVENTS_SCHEDULE) {
    await setDoc(doc(db, 'events', item.id), item, { merge: true });
    process.stdout.write('.');
  }
  console.log('\nSelesai: ' + EVENTS_SCHEDULE.length + ' event tersinkron.');

  console.log('Sinkronisasi ' + HOT_INFO_ITEMS.length + ' Hot Info & Berita Terbaru...');
  for (const item of HOT_INFO_ITEMS) {
    await setDoc(doc(db, 'hotinfo', item.id), item, { merge: true });
    process.stdout.write('.');
  }
  console.log('\nSelesai: ' + HOT_INFO_ITEMS.length + ' berita tersinkron.');

  console.log('\nSINKRONISASI SELESAI: Seluruh 148 item katalog & berita kini LIVE di Firestore!');
  process.exit(0);
}

syncCatalog().catch(err => {
  console.error('❌ Gagal sinkronisasi katalog:', err);
  process.exit(1);
});
