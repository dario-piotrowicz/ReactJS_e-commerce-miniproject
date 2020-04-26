import cartActionTypes from './cart.types';

export const toggleHeaderDropdownHidden = () => ({
    type: cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});

export const removeItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
});

export const clearItem = item => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item
});

export const clearAllItems = () => ({
    type: cartActionTypes.CLEAR_ALL_ITEMS
});