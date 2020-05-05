import { take, takeEvery, call, put, all } from 'redux-saga/effects';
import { eventChannel} from 'redux-saga';
import { auth, firestoreUtils, signInWithGoogle } from '../../firebase/firebase.utils';
import userActionTypes from './user.types';
import { setCurrentUser } from './user.actions';

let unsubscribeFromOnAuthStateChanged = null;
let unsubscribeFromUserRefOnSnap = null;

const createUserAndSubscripeToSnapshot = async (userAuth, emit) => {
    const userRef = await firestoreUtils.createUserDoc(userAuth);
    if(!userRef){
        emit(setCurrentUser(null));
    } else {
        if(unsubscribeFromUserRefOnSnap) unsubscribeFromUserRefOnSnap();
        unsubscribeFromUserRefOnSnap = userRef.onSnapshot( userSnap => {
            emit( setCurrentUser({
                id: userSnap.id,
                ...userSnap.data()
            }));
        });
    }
}

const getUserEventChannel = () => (
    eventChannel( emit => {
        unsubscribeFromOnAuthStateChanged = auth.onAuthStateChanged(
            async userAuth => {
                if(!userAuth){
                    emit(setCurrentUser(null));
                } else {
                    createUserAndSubscripeToSnapshot(userAuth, emit);
                }
            }
        );

        return () => {
            if(unsubscribeFromOnAuthStateChanged) unsubscribeFromOnAuthStateChanged();
            if(unsubscribeFromUserRefOnSnap) unsubscribeFromUserRefOnSnap();
        };
    })
)

export function* requestUserFromFirebase(){
    yield take(userActionTypes.REQUEST_USER_UPDATES_FROM_FIREBASE);
    const userEventChannel = yield call(getUserEventChannel);
    yield takeEvery(userEventChannel, function* (action){
        yield put(action);
    });
}

function* handleSignUpAction({ payload }){
    const { displayName, email, password, confirmPassword } = payload;

    if( password !== confirmPassword ){
        alert("Passwords Don't match");
        return;
    }

    try {
        const userCreationResponse = yield auth.createUserWithEmailAndPassword(email,password);
        const userAuth = userCreationResponse.user;
        yield firestoreUtils.createUserDoc(userAuth, {displayName});
    } catch(error) {
        console.error(error);
    }
}

export function* signUp(){
    yield takeEvery(userActionTypes.SIGN_UP, handleSignUpAction);
}

function* handleSignInAction({ payload: options }){
    if( options.withEmailAndPassword ){
        const { email, password } = options.withEmailAndPassword;
        try {
            yield auth.signInWithEmailAndPassword(email, password);
        } catch(error) {
            console.error(error);
            if(error.code === 'auth/user-not-found') alert('Error, invalid user');
            if(error.code === 'auth/wrong-password') alert('Error, invalid password');
        }
        return;
    }

    if( options.withGoogle ){
        try{
            yield signInWithGoogle();
        } catch(error){}
        return;
    }
}

export function* signIn(){
    yield takeEvery(userActionTypes.SIGN_IN, handleSignInAction);
}

export function* signOut(){
    yield take(userActionTypes.SIGN_OUT);
    yield auth.signOut();
}

export default function* userSagas(){
    yield all([
        call(requestUserFromFirebase),
        call(signUp),
        call(signIn),
        call(signOut)
    ]);
}