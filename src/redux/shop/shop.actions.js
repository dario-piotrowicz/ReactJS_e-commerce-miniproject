import shopActionTypes from './shop.types';

export const setShopData = shopData => ({
    type: shopActionTypes.SET_SHOP_DATA,
    payload: shopData
});