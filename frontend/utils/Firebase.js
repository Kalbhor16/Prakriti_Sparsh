import{getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginprakritisparsh-39102.firebaseapp.com",
  projectId: "loginprakritisparsh-39102",
  storageBucket: "loginprakritisparsh-39102.firebasestorage.app",
  messagingSenderId: "475010585423",
  appId: "1:475010585423:web:ee7ea4ba6708a52f7aab3a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider=new GoogleAuthProvider()

export{auth,provider}
