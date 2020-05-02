import shopActionTypes from './shop.types';

const initialState = {
    collections: null
};

const shopReducer = ( state = initialState, action ) => {
    switch(action.type){
        case shopActionTypes.SET_SHOP_DATA:
            return {
                collections: action.payload
            };
        default:
            return state;
    }
};

export default shopReducer;
