import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import { firestoreUtils } from '../../firebase/firebase.utils';
import { addItemLocally } from './cart.actions';
import cartActionTypes from './cart.types';
import { selectCurrentUser } from '../user/user.selectors';
import { toast } from 'react-toastify';


function* handleAddItemAction({ payload: item }){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.addItemToDbCart(currentUser.id, item.id);
  }catch(error){
    toast.error('A network error has occurred and your item cannot be added to the cart at this moment. Please try again later');
    return;
  }
  
  yield put((addItemLocally(item)));
}


export function* addItem(){
  yield takeEvery(cartActionTypes.ADD_ITEM, handleAddItemAction);
}


export default function* cartSagas(){
  yield all([
      call(addItem)
  ]);
}