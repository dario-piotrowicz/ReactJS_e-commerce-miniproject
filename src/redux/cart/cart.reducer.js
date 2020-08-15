import cartActionTypes from './cart.types';
import { addItemToCartItems,
         removeItemFromCartItems,
         clearItemFromCartItems } from './cart.utils';

const initialState = {
    headerDropdownHidden: true,
    items: []
};

const cartReducer = (state = initialState, action ) => {
    let items;
    switch(action.type){
        case cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN:
            return {
                ...state,
                headerDropdownHidden: !state.headerDropdownHidden
            };
        case cartActionTypes.ADD_ITEM:
            items = addItemToCartItems(state.items, action.payload);
            return { ...state, items };
        case cartActionTypes.REMOVE_ITEM:
            items = removeItemFromCartItems(state.items, action.payload);
            return { ...state, items };
        case cartActionTypes.CLEAR_ITEM:
            items = clearItemFromCartItems(state.items, action.payload);
            return { ...state, items };
        case cartActionTypes.CLEAR_ALL_ITEMS:
            return { ...state, items: [] };
        default:
            return state;
    }
}

export default cartReducer;