import { take, takeEvery, call, put, all, select } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { auth, firestoreUtils, signInWithGoogle } from '../../firebase/firebase.utils';
import userActionTypes from './user.types';
import { setCurrentUser } from './user.actions';
import { toast } from 'react-toastify';
import { setItemsLocally, clearAllItemsLocally } from '../cart/cart.actions';
import { selectAreCollectionsInitialized, selectCollectionsAsArray } from '../shop/shop.selectors';
import { requestShopDataUpdatesFromFirestore } from '../shop/shop.actions';
import { getItemFromCollectionsBasedOnId } from '../shop/shop.utils';

const showToastError = errorCode => {
    switch(errorCode){
        case 'passwords-dont-match':
            toast.error("Error: The provided passwords don't match");
            break;
            case 'auth/email-already-in-use':
                toast.error("Error: The email is already in use by an existing user");
                break;
                case 'auth/weak-password' :
                    toast.error("Error: The password should contain at least 6 characters");
                    break;
                    case 'auth/user-not-found':
            toast.error("Error: The provided user is not valid");
            break;
            case 'auth/wrong-password':
                toast.error("Error: The provided password is not valid");
            break;
            case "auth/too-many-requests":
            toast.error("Error: too many unsuccessful login attempts. Please try again later");
            break;
            default:
            toast.error('An error has occurred and the request has failed. Please try again later');
            break;
        }
}

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
        showToastError('passwords-dont-match');
        return;
    }

    try {
        const userCreationResponse = yield auth.createUserWithEmailAndPassword(email,password);
        const userAuth = userCreationResponse.user;
        yield firestoreUtils.createUserDoc(userAuth, {displayName});
    } catch(error) {
        console.error(error);
        showToastError(error.code);
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
            showToastError(error.code);
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

function* handleSetCurrentUserAction({payload: currentUser}){
    if(currentUser){
        const userItemsDataFromDb = yield firestoreUtils.retrieveUserItemsFromDbCart(currentUser.id);
        let areCollectionsInitilized = yield select(selectAreCollectionsInitialized);
        if(!areCollectionsInitilized) yield put(requestShopDataUpdatesFromFirestore());
        const sleep = (millis) => new Promise(_ => setTimeout(_, millis));
        while(!areCollectionsInitilized){
            yield sleep(500);
            areCollectionsInitilized = yield select(selectAreCollectionsInitialized);
        }
        const collections = yield select(selectCollectionsAsArray);
        const userItems = userItemsDataFromDb.map(
            dataItem => ({
                ...getItemFromCollectionsBasedOnId(collections,dataItem.itemId),
                quantity: dataItem.quantity
            })
        ).filter(
            item => !!item || item.quantity < 0
        );
        yield put(setItemsLocally(userItems));
    } else {
        yield put(clearAllItemsLocally());
    }
}

export function* signIn(){
    yield takeEvery(userActionTypes.SIGN_IN, handleSignInAction);
}

export function* signOut(){
    yield take(userActionTypes.SIGN_OUT);
    if(unsubscribeFromUserRefOnSnap) yield unsubscribeFromUserRefOnSnap();
    yield auth.signOut();
}

export function* setCurrentUserSaga() {
    yield takeEvery(userActionTypes.SET_CURRENT_USER, handleSetCurrentUserAction);
}


export default function* userSagas(){
    yield all([
        call(requestUserFromFirebase),
        call(signUp),
        call(signIn),
        call(signOut),
        call(setCurrentUserSaga)
    ]);
}