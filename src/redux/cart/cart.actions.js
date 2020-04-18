import cartActionTypes from './cart.types';

export const toggleHeaderDropdownHidden = () => ({
    type: cartActionTypes.TOGGLE_HEADER_DROPDOWN_HIDDEN
});

export const addItem = item => ({
    type: cartActionTypes.ADD_ITEM,
    payload: item
});