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
const db = getFirestore(app, "ai-studio-malaladiscoverwe-562e18f6-b088-4083-a613-a873b9667b3f");

async function checkFirestore() {
  const colNames = ['destinations', 'cultures', 'culinaries', 'events', 'downloads', 'hot_info', 'app_settings'];
  for (const name of colNames) {
    try {
      const snap = await getDocs(collection(db, name));
      console.log(`Collection ${name}: ${snap.docs.length} docs`);
      if (snap.docs.length > 0 && name === 'destinations') {
        snap.docs.slice(0, 5).forEach(d => {
          const item = d.data();
          console.log(`  - [${d.id}] ${item.title}: ${item.imageUrl}`);
        });
      }
    } catch (e) {
      console.error(`Error ${name}:`, e);
    }
  }
}

checkFirestore();
