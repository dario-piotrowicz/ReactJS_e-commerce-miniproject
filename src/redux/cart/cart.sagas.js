import { take, takeEvery, call, put, all, select } from 'redux-saga/effects';
import { firestoreUtils } from '../../firebase/firebase.utils';
import { addItemLocally, removeItemLocally, clearItemLocally, clearAllItemsLocally } from './cart.actions';
import cartActionTypes from './cart.types';
import { selectCurrentUser } from '../user/user.selectors';
import { toast } from 'react-toastify';


function* handleAddItemAction(item){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.addItemToDbCart(currentUser.id, item.id);
  }catch(error){
    toast.error('A network error has occurred and your item cannot be added to the cart at this moment. Please try again later');
    return;
  }
  
  yield put((addItemLocally(item)));
}


function* handleRemoveItemAction(item){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.removeItemFromDbCart(currentUser.id, item.id);
  }catch(error){
    toast.error('An error has occurred and your item cannot be removed from the cart at this moment. Please try again later');
    return;
  }

  yield put((removeItemLocally(item)));
}


function* handleClearItemAction({ payload: item }){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.clearItemFromDbCart(currentUser.id, item.id);
  }catch(error){
    toast.error('An error has occurred and your item cannot be removed from the cart at this moment. Please try again later');
    return;
  }

  yield put((clearItemLocally(item)));
}

function* handleClearAllItemsAction(){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtils.clearAllItemsFromDbCart(currentUser.id);
  }catch(error){
    toast.error('An error has occurred and your cart could not be cleared at this moment. Please try again later');
    return;
  }

  yield put((clearAllItemsLocally()));
}

export function* addItem(){
  while( true ){
    const { payload } = yield take(cartActionTypes.ADD_ITEM);
    yield handleAddItemAction(payload);
  }
}

export function* removeItem(){
  while( true ){
   const { payload } = yield take(cartActionTypes.REMOVE_ITEM);
   yield handleRemoveItemAction(payload);
  }
}

export function* clearItem(){
  yield takeEvery(cartActionTypes.CLEAR_ITEM, handleClearItemAction);
}

export function* clearAllItems(){
  yield takeEvery(cartActionTypes.CLEAR_ALL_ITEMS, handleClearAllItemsAction);
}

export default function* cartSagas(){
  yield all([
      call(addItem),
      call(removeItem),
      call(clearItem),
      call(clearAllItems)
  ]);
}