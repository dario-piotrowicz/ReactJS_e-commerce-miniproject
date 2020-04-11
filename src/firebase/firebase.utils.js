import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyxq55WZV47MS_2HM5rrzMgDdmj36dc3s",
    authDomain: "reactjsecommerceminiproj-e9323.firebaseapp.com",
    databaseURL: "https://reactjsecommerceminiproj-e9323.firebaseio.com",
    projectId: "reactjsecommerceminiproj-e9323",
    storageBucket: "reactjsecommerceminiproj-e9323.appspot.com",
    messagingSenderId: "178143516990",
    appId: "1:178143516990:web:fcb5e3a5d6dd52df06346f",
    measurementId: "G-TSY06J19PH"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters( { prompt: 'select_account' } );

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;