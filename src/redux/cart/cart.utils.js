
export const addItemToCartItems = (currentItems, newItem) => {
    const existingItem = currentItems.find( item => item.id === newItem.id );

    if( existingItem ) {
        return currentItems.map( item => {
            if( item.id === existingItem.id ){
                const quantity = item.quantity + 1;
                return { ...item, quantity }
            } else {
                return item;
            }
        });
    }

    return [ ...currentItems, { ...newItem, quantity: 1 } ];
};
