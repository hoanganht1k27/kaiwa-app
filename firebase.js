// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDBx54Yb_p__f0KZZu2qv31KxLTpiFoTpA',
  authDomain: 'kaiwa-app-133b5.firebaseapp.com',
  projectId: 'kaiwa-app-133b5',
  storageBucket: 'kaiwa-app-133b5.appspot.com',
  messagingSenderId: '626867127319',
  appId: '1:626867127319:web:c21059d7780a8379848852',
  measurementId: 'G-1NPW76GCK1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
