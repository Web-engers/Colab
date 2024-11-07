// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
    apiKey: "AIzaSyDLai-AJcWxboiLDzuruYdfI1jXPJTv2jo",
    authDomain: "colab-571e9.firebaseapp.com",
    projectId: "colab-571e9",
    storageBucket: "colab-571e9.appspot.com",
    messagingSenderId: "851716723789",
    appId: "1:851716723789:web:2187aeebe893e0182af804",
    measurementId: "G-SZN9KSTYKQ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
const realtimedb = getDatabase(app);


