import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyC6lkZhkZY2WwqydQhpc_axdmS-RqTXpcw",
  authDomain: "ticktocktask-50507.firebaseapp.com",
  projectId: "ticktocktask-50507",
  storageBucket: "ticktocktask-50507.appspot.com",
  messagingSenderId: "319922092277",
  appId: "1:319922092277:web:7779e782bff0332e97adbc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;