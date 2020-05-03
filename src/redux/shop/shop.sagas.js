import { take, takeEvery, call, put, all } from 'redux-saga/effects';
import { eventChannel} from 'redux-saga';
import { firestore } from '../../firebase/firebase.utils';
import { convertBasicShopDataArrayToShopDataMap } from './shop.utils';
import { setShopData } from './shop.actions';
import shopActionTypes from './shop.types';

const getShopDataEventChannel = () => {
    const shopDataRef = firestore.collection('shopData');

    const shopDataEventChannel = eventChannel(emit => {
        const unsubscribe = shopDataRef.onSnapshot(
            function data(shopDataSnap){
                const shopDataArray = shopDataSnap.docs.map( doc =>
                    ( { ...doc.data(), id: doc.id } )
                );
                const processedShopData = convertBasicShopDataArrayToShopDataMap(shopDataArray);
                const actionToEmit = setShopData(processedShopData);
                emit(actionToEmit);
        });
        return unsubscribe;
    });

    return shopDataEventChannel;
};


export function* requestShopDataUpdatesFromFirestore(){
    yield take(shopActionTypes.REQUEST_SHOP_DATA_UPDATES_FROM_FIRESTORE);
    const shopDataEventChannel = yield call(getShopDataEventChannel);
    yield takeEvery(shopDataEventChannel, function* (action){
        yield put(action);
    });
}

export default function* shopSagas() {
    yield all([call(requestShopDataUpdatesFromFirestore)]);
}