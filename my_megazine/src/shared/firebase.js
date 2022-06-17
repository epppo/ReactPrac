import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBeo6CTPoWaP1WWDFj7hvIcxQjvZzmCB7A",
  authDomain: "authex-8c54e.firebaseapp.com",
  projectId: "authex-8c54e",
  storageBucket: "authex-8c54e.appspot.com",
  messagingSenderId: "136810918013",
  appId: "1:136810918013:web:88a1a96718aacd233a4114",
  measurementId: "G-WD286849R9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;