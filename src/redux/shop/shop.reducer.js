import shopActionTypes from './shop.types';

const constState = {
    collections: null
};

const shopReducer = ( state = constState, action ) => {
    switch(action.type){
        case shopActionTypes.SET_SHOP_DATA:
            return {
                collections: action.payload
            }
        default:
            return state;
    }
};

export default shopReducer;
