import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "malala-my-id",
  appId: "1:150503186564:web:64af24b2edc852fb23a2d1",
  apiKey: "AIzaSyBAizWQnaNb-EX-BcjoZt9BSRctFGyMEnE",
  authDomain: "malala-my-id.firebaseapp.com",
  storageBucket: "malala-my-id.firebasestorage.app",
  messagingSenderId: "150503186564",
};

const app = initializeApp(firebaseConfig);

async function testBoth() {
  console.log("--- Testing (default) database ---");
  const defaultDb = getFirestore(app);
  try {
    const snap = await getDocs(collection(defaultDb, 'destinations'));
    console.log(`(default) destinations count: ${snap.docs.length}`);
    snap.docs.forEach(d => {
      console.log(`  [${d.id}] ${d.data().title} -> ${d.data().imageUrl}`);
    });
  } catch (e: any) {
    console.log(`(default) error: ${e.message}`);
  }
}

testBoth();
