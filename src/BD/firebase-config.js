import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCPwc-PPOwnLyjFT84Eqx3vsXTIHLXA_Ks",
    authDomain: "sistema-23bd5.firebaseapp.com",
    projectId: "sistema-23bd5",
    storageBucket: "sistema-23bd5.firebasestorage.app",
    messagingSenderId: "748733050254",
    appId: "1:748733050254:web:cf553073d9825f8b8248df"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };