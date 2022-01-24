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

export const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log('Wylogowano poprawnie')
    })
    .catch(err => {
      console.log(err)
    })}

export const getCol = col => {
  return firebase.firestore().collection(col)
}
//Tworzenie timestampu, którym sygnujemy wiadomości
export const time = () => {
  return firebase.firestore.FieldValue.serverTimestamp()
}