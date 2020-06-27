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


export const addCollectionWithDocumentsToFirestore = async (collectionName, docs) => {
    const collectionRef = firestore.collection(collectionName);

    const batch = firestore.batch();
    docs.forEach( doc => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, doc);
    });

    return await batch.commit();
}

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
            console.error('error in creating user', error.message);
            return null;
        }
    },
    addMessageToDb : async (userId, title, message) => {
        const docId = `${ (new Date()).toISOString()}_${userId}`;

        const docRef = firestore.doc(`messages/${docId}`);
        const docSnap = await docRef.get();
        if(docSnap.exists) throw new Error('message document already exists');

        userId = userId.trim();
        title = title.trim();
        message = message.trim();

        if(!userId) throw new Error('userId not provided');
        if(!title) throw new Error('title not provided');
        if(!message) throw new Error('message not provided');

        await docRef.set({
                        userId,
                        title,
                        message
        });
    }
};

export default firebase;