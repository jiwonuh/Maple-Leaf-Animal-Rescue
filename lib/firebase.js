import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'; 


const firebaseConfig = {
  apiKey: "AIzaSyCrKiHRIHV2H4kBkg9fWetoS55lr7rBBdE",
  authDomain: "maple-leaf-animal-rescue.firebaseapp.com",
  projectId: "maple-leaf-animal-rescue",
  storageBucket: "maple-leaf-animal-rescue.firebasestorage.app",
  messagingSenderId: "643249538687",
  appId: "1:643249538687:web:3b2372fe2278d9ccd7e14a",
  measurementId: "G-1VNMXZDGNF"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


if (typeof window !== "undefined") {
  getAnalytics(app);
}


export { auth };
export const firestore = getFirestore(app)