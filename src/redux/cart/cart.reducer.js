import cartActionTypes from './cart.types';
import { addItemToCartItems } from './cart.utils';

const initialState = {
    headerDropdownHidden: true,
    items: []
};

const cartReducer = (state = initialState, action ) => {
    switch(action.type){
        case cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN:
            return {
                ...state,
                headerDropdownHidden: !state.headerDropdownHidden
            };
        case cartActionTypes.ADD_ITEM:
            const items = addItemToCartItems(state.items, action.payload);
            return { ...state, items };
        default:
            return state;
    }
}

export default cartReducer;