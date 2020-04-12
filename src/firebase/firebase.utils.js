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

export const firestoreUtils = {
    createUserDoc : async (userAuth, additionalInfo) => {
        if(!userAuth) return;

        const docRef = firestore.doc(`users/${userAuth.uid}`);
        const docSnap = await docRef.get();
        if(docSnap.exists){
            docRef.get(); // I'm calling get() in order to trigger an onSnapshot for the docRef
            return docRef;
        }

        const { displayName, email } = userAuth;
        try {
            await docRef.set({
                            displayName,
                            email,
                            createdAt: new Date(),
                            ...additionalInfo
            });
            return docRef;
        } catch(error) {
            console.log('error in creating user', error.message);
            return null;
        }
    }
};

export default firebase;