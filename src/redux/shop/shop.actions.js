import shopActionTypes from './shop.types';

export const setShopData = shopData => ({
    type: shopActionTypes.SET_SHOP_DATA,
    payload: shopData
});

export const requestShopDataUpdatesFromFirestore = () => ({
    type: shopActionTypes.REQUEST_SHOP_DATA_UPDATES_FROM_FIRESTORE
});