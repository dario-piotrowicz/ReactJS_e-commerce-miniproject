import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import mainMenuReducer from './main-menu/main-menu.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    mainMenu: mainMenuReducer
});

export default rootReducer;