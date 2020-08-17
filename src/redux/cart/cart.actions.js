import cartActionTypes from './cart.types';

export const toggleHeaderDropdownHidden = () => ({
    type: cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});

export const addItemLocally = item => ({
    type: cartActionTypes.ADD_ITEM_LOCALLY,
    payload: item
});

export const removeItem = item => ({
    type: cartActionTypes.REMOVE_ITEM,
    payload: item
});

export const removeItemLocally = item => ({
    type: cartActionTypes.REMOVE_ITEM_LOCALLY,
    payload: item
});

export const clearItem = item => ({
    type: cartActionTypes.CLEAR_ITEM,
    payload: item
});

export const clearItemLocally = item => ({
    type: cartActionTypes.CLEAR_ITEM_LOCALLY,
    payload: item
});

export const clearAllItems = () => ({
    type: cartActionTypes.CLEAR_ALL_ITEMS
});

export const setItemsLocally = itemsArray => ({
    type: cartActionTypes.SET_ITEMS_LOCALLY,
    payload: itemsArray
})

export const clearAllItemsLocally = () => ({
    type: cartActionTypes.CLEAR_ALL_ITEMS_LOCALLY
});