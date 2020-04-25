
export const convertCollectionsToArray = collectionsObj => {
    if(!collectionsObj) return [];

    const keys = Object.keys(collectionsObj);
    return keys.map( key => collectionsObj[key] );
};
