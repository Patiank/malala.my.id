import { initializeApp } from 'firebase/app';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: "malala-web",
  appId: "1:521100250267:web:f98c67ac47b4d1a0300a3e",
  apiKey: "AIzaSyC6cfbqR8MAwiBFZt6GrWFSfIHYXC_pM0c",
  authDomain: "malala-web.firebaseapp.com",
  storageBucket: "malala-web.firebasestorage.app",
  messagingSenderId: "521100250267",
};

export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});
export const auth = getAuth(app);
export const storage = getStorage(app);
