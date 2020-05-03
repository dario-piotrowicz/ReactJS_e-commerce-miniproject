import { all, call } from 'redux-saga/effects';
import shopSagas from '../redux/shop/shop.sagas';

export default function* rootSaga(){
    yield all([
        call(shopSagas)
    ])
};