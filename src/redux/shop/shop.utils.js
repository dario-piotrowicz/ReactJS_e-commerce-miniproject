
export const convertCollectionsToArray = collectionsObj => {
    if(!collectionsObj) return [];

    const keys = Object.keys(collectionsObj);
    return keys.map( key => collectionsObj[key] );
};

const convertArrayToCollections = collectionsArray => {
    if(!collectionsArray) return [];

    return collectionsArray.reduce(
        (acc, collection) => ({
            ...acc,
            [collection.title.toLowerCase()]: collection
        }), {}
    );
};

export const convertBasicShopDataArrayToShopDataMap = shopDataArray => {
    if(!shopDataArray) return {};

    const newShopDataArray = shopDataArray.map( data => ({
        routeName: encodeURI(data.title.toLowerCase()),
        ...data
    }));

    return convertArrayToCollections(newShopDataArray);
};

export const getItemFromCollectionsBasedOnId = (collectionsArray, itemId) => {
    for(let collectionIdx = 0; collectionIdx < collectionsArray.length; collectionIdx++){
        const collection = collectionsArray[collectionIdx];
        const collectionItems = collection && collection.items ? collection.items : [];
        for(let itemIdx = 0; itemIdx < collectionItems.length ; itemIdx++){
            const collectionItem = collectionItems[itemIdx];
            if(collectionItem && collectionItem.id === itemId){
                return collectionItem;
            }
        }
    }
    return null;
};