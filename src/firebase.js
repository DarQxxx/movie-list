import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

//Tworzenie configu dla firebase
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABSE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
}
//inicjalizacja firebase
const app = firebase.initializeApp(firebaseConfig)




//export const storage = firebase.storage()
export const db = app.firestore()
export const auth = getAuth(app)

export const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('email');
    firebase.auth().useDeviceLanguage();
    firebase.auth().signInWithPopup(provider).then((result) => {
    const user = result.user;

    
    //const credential = FacebookAuthProvider.credentialFromResult(result);
    //const accessToken = credential.accessToken;
    //console.log(credential)
    //eyJhbGciOiJSUzI1NiIsImtpZCI6IjQwMTU0NmJkMWRhMzA0ZDc2NGNmZWUzYTJhZTVjZDBlNGY2ZjgyN2IiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiTm9yYmVydCBKdXN0IiwicGljdHVyZSI6Imh0dHBzOi8vZ3JhcGguZmFjZWJvb2suY29tLzQ5NDcyOTI4NjUzMTAyNDQvcGljdHVyZSIsImlzcyI6Imh0dHBzOi8vc2VjdXJldG9rZW4uZ29vZ2xlLmNvbS9tb3ZpZS1saXN0LWFkN2Y3IiwiYXVkIjoibW92aWUtbGlzdC1hZDdmNyIsImF1dGhfdGltZSI6MTY0MjQzOTUxNiwidXNlcl9pZCI6Ik40Y3JPQWtRZlhQaHYwUE05am5zZ0RtYTNrMDIiLCJzdWIiOiJONGNyT0FrUWZYUGh2MFBNOWpuc2dEbWEzazAyIiwiaWF0IjoxNjQyNDM5NTE2LCJleHAiOjE2NDI0NDMxMTYsImVtYWlsIjoibm9yYmVydGp1QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJmYWNlYm9vay5jb20iOlsiNDk0NzI5Mjg2NTMxMDI0NCJdLCJlbWFpbCI6WyJub3JiZXJ0anVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoiZmFjZWJvb2suY29tIn19.sqggmSl-Eo71qjcSGa4XeQzSO0nNGGqecDoTBXYsskHwxRUkQQGq86A3EHM0RAzx1EhjxO5UpA1UYgBMGPQ0UHPrjXadgHRAGchF5HMYlEmVehMapYK9uvNmaXkXuJCLLXpSh9eTwUzoWgGexVg9QLS9ORc7zKArd_CJdflwbFiTwwj0TttxY2bRxpHC0kaEDycDPIBF8kAXRXmuW-7e7VfKiSS1h98nFdsFVExKgjWLs7thl-sBzZ-Rfau7JjeL8YzjeRLnePcahDmPJdPDQfcOcGK6peMkVS-3iXGO0DDMwlfJtKmA9AbtYotSihMU8a5Lswg95ms5Y91WuQ14OQ
    console.log(user)
    
    
}) .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);

  });
}

export const getAnything = col => {
  return firebase.firestore().collection(col)
}
//Tworzenie timestampu, którym sygnujemy wiadomości
export const time = () => {
  return firebase.firestore.FieldValue.serverTimestamp()
}