import { createSelector } from 'reselect';

const selectCart = state => state.cart;

export const selectCartHeaderDropdownHidden = createSelector(
    [selectCart],
    cart => cart.headerDropdownHidden
);

export const selectCartItems = createSelector(
    [selectCart],
    cart => cart.items
);

export const selectCartItemsCount = createSelector(
    [selectCartItems],
    items => items.reduce( (acc,currItem)=> acc+currItem.quantity , 0 )
);

export const selectCartItemsTotalPrice = createSelector(
    [selectCartItems],
    items => items.reduce( (acc,currItem)=> acc+(currItem.price * currItem.quantity) , 0 )
);
