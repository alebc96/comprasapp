"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Import the functions you need from the SDKs you need
const app_1 = require("firebase/app");
const analytics_1 = require("firebase/analytics");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBJlegZ277tqeTY_LTFuO8ti855TZO5uA4",
    authDomain: "comprasapp-f1f60.firebaseapp.com",
    projectId: "comprasapp-f1f60",
    storageBucket: "comprasapp-f1f60.appspot.com",
    messagingSenderId: "450707364853",
    appId: "1:450707364853:web:8feed50974a1f9a73c9ebc",
    measurementId: "G-LGQRQRFPW7"
};
// Initialize Firebase
const app = (0, app_1.initializeApp)(firebaseConfig);
const analytics = (0, analytics_1.getAnalytics)(app);
