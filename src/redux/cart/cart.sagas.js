import { take, call, put, all, select } from 'redux-saga/effects';
import { firestoreUtils } from '../../firebase/firebase.utils';
import { addItemLocally, removeItemLocally, clearItemLocally, clearAllItemsLocally } from './cart.actions';
import cartActionTypes from './cart.types';
import { selectCurrentUser } from '../user/user.selectors';
import { toast } from 'react-toastify';

function* handleDbAction(firestoreUtiliFunction, itemId, errorMessage, actionToEmitOnSuccess){
  const currentUser = yield select(selectCurrentUser);

  try {
    yield firestoreUtiliFunction(currentUser.id, itemId);
  }catch(error){
    toast.error(errorMessage);
    return;
  }

  yield put(actionToEmitOnSuccess);
}

export function* addItem(){
  while( true ){
    const { payload: item } = yield take(cartActionTypes.ADD_ITEM);
    yield handleDbAction(
      firestoreUtils.addItemToDbCart,
      item.id,
      'A network error has occurred and your item cannot be added to the cart at this moment. Please try again later',
      addItemLocally(item)
    );
  }
}

export function* removeItem(){
  while( true ){
   const { payload: item } = yield take(cartActionTypes.REMOVE_ITEM);
   yield handleDbAction(
      firestoreUtils.removeItemFromDbCart,
      item.id,
      'An error has occurred and your item cannot be removed from the cart at this moment. Please try again later',
      removeItemLocally(item)
    );
  }
}

export function* clearItem(){
  while( true ){
    const { payload: item } = yield take(cartActionTypes.CLEAR_ITEM);
    yield handleDbAction(
      firestoreUtils.clearItemFromDbCart,
      item.id,
      'An error has occurred and your item cannot be removed from the cart at this moment. Please try again later',
      clearItemLocally(item)
    );
  }
}

export function* clearAllItems(){
  while( true ){
    yield take(cartActionTypes.CLEAR_ALL_ITEMS);
    yield handleDbAction(
      firestoreUtils.clearAllItemsFromDbCart,
      -1,
      'An error has occurred and your cart could not be cleared at this moment. Please try again later',
      clearAllItemsLocally()
    );
  }
}

export default function* cartSagas(){
  yield all([
      call(addItem),
      call(removeItem),
      call(clearItem),
      call(clearAllItems)
  ]);
}