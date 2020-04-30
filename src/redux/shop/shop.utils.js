
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
