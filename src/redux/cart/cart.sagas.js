import { takeEvery, call, put, all, select } from 'redux-saga/effects';
import { firestoreUtils } from '../../firebase/firebase.utils';
import { addItemLocally, removeItemLocally } from './cart.actions';
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


function* handleRemoveItemAction({ payload: item }){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.removeItemFromDbCart(currentUser.id, item.id);
  }catch(error){
    toast.error('A network error has occurred and your item cannot be removed from the cart at this moment. Please try again later');
    return;
  }

  yield put((removeItemLocally(item)));
}


export function* addItem(){
  yield takeEvery(cartActionTypes.ADD_ITEM, handleAddItemAction);
}

export function* removeItem(){
  yield takeEvery(cartActionTypes.REMOVE_ITEM, handleRemoveItemAction);
}

export default function* cartSagas(){
  yield all([
      call(addItem),
      call(removeItem)
  ]);
}