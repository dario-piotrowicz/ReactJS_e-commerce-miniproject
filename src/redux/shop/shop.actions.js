import shopActionTypes from './shop.types';
import { firestore } from '../../firebase/firebase.utils';
import { convertBasicShopDataArrayToShopDataMap } from './shop.utils';

const setShopData = shopData => ({
    type: shopActionTypes.SET_SHOP_DATA,
    payload: shopData
});

let shopDataOnSnapFirestoreSubscription = null;

export const requestShopDataFromFirestore = () => dispatch => {
    if(shopDataOnSnapFirestoreSubscription) return;

    const shopDataRef = firestore.collection('shopData');
    shopDataOnSnapFirestoreSubscription = shopDataRef.onSnapshot(
        async shopDataSnap => {
            const shopDataArray = shopDataSnap.docs.map( doc =>
                ( { ...doc.data(), id: doc.id } )
            );
            const processedShopData = convertBasicShopDataArrayToShopDataMap(shopDataArray);
            dispatch(setShopData(processedShopData));
        }
    );
};