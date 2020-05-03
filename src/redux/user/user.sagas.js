import { take, takeEvery, call, put, all } from 'redux-saga/effects';
import { eventChannel} from 'redux-saga';
import { auth, firestoreUtils } from '../../firebase/firebase.utils';
import userActionTypes from './user.types';
import { setCurrentUser } from './user.actions';

let unsubscribeFromOnAuthStateChanged = null;
let unsubscribeFromUserRefOnSnap = null;

const getUserEventChannel = () => {
    const userDataEventChannel = eventChannel(emit => {
        unsubscribeFromOnAuthStateChanged = auth.onAuthStateChanged(
        async userAuth => {
            if(!userAuth){
                emit(setCurrentUser(null));
                return;
            }
            const userRef = await firestoreUtils.createUserDoc(userAuth);
            if(!userRef){
                emit(setCurrentUser(null));
                return;
            }
            unsubscribeFromUserRefOnSnap = userRef.onSnapshot( userSnap => {
                emit( setCurrentUser({
                    id: userSnap.id,
                    ...userSnap.data()
                }));
            });
        });

        const unsubscribe = () => {
            if(unsubscribeFromOnAuthStateChanged) unsubscribeFromOnAuthStateChanged();
            if(unsubscribeFromUserRefOnSnap) unsubscribeFromUserRefOnSnap();
        };
        return unsubscribe;
    });

    return userDataEventChannel;
}

export function* requestUserFromFirebase(){
    yield take(userActionTypes.REQUEST_USER_UPDATES_FROM_FIREBASE);
    const userEventChannel = yield call(getUserEventChannel);
    yield takeEvery(userEventChannel, function* (action){
        yield put(action);
    });
}

export default function* userSagas() {
    yield all([call(requestUserFromFirebase)]);
}