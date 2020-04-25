import SHOP_DATA from './shop.data.json'; // Note: importing json files works by default with webpack >= v2.0.0

const constState = {
    collections: SHOP_DATA
};

const shopReducer = ( state = constState, action ) => {
    switch(action.type){
        default:
            return state;
    }
};

export default shopReducer;
