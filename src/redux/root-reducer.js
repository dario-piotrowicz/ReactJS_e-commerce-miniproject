import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import cartReducer from './cart/cart.reducer';
import mainMenuReducer from './main-menu/main-menu.reducer';
import shopReducer from './shop/shop.reducer';
import loadingReducer from './loading/loading.reducer';

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    mainMenu: mainMenuReducer,
    shop: shopReducer,
    loading: loadingReducer
});

export default rootReducer;