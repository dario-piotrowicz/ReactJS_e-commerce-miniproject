import { all, call } from 'redux-saga/effects';
import { requestShopDataUpdatesFromFirestore } from '../redux/shop/shop.sagas';

export default function* rootSaga(){
    yield all([
        call(requestShopDataUpdatesFromFirestore)
    ])
};