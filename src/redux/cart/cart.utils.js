
export const addItemToCartItems = (currentItems, itemToAdd) => {
    const existingItem = currentItems.find( item => item.id === itemToAdd.id );

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

    return [ ...currentItems, { ...itemToAdd, quantity: 1 } ];
};

export const removeItemFromCartItems = (currentItems, itemToRemove) => {
    const targetItem = currentItems.find( item => item.id === itemToRemove.id );
    if(!targetItem) return currentItems;
    if(targetItem.quantity===1) return clearItemFromCartItems(currentItems, itemToRemove);
    return currentItems.map( item => {
        if(item.id === targetItem.id){
            const quantity = item.quantity - 1;
            return { ...item , quantity };
        } else {
            return item;
        }
    });
}

export const clearItemFromCartItems = (currentItems, itemToClear) => {
    return currentItems.filter( item => item.id !== itemToClear.id );
}