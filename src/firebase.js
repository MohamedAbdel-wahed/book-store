import firebase from 'firebase/app'
import 'firebase/firestore'


// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCm8PC53tHWQPKREqiCTFZtUmCH2Sga34M",
  authDomain: "simple-book-store-39bfe.firebaseapp.com",
  projectId: "simple-book-store-39bfe",
  storageBucket: "simple-book-store-39bfe.appspot.com",
  messagingSenderId: "306295867784",
  appId: "1:306295867784:web:eacbdac34467734bf4123d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const timestamp= firebase.firestore.FieldValue.serverTimestamp

export const firestore= firebase.firestore()

