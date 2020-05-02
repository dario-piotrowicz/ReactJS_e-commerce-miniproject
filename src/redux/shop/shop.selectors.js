import { createSelector } from 'reselect';
import { convertCollectionsToArray } from './shop.utils';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

export const selectCollectionsAsArray = createSelector(
    [selectCollections],
    collections => convertCollectionsToArray(collections)
)

export const selectCollection = collectionTitle => createSelector(
        [selectCollections],
        collections => collections ? collections[collectionTitle] : null
);

export const selectAreCollectionsInitialized = createSelector(
    [selectCollections],
    collections => !!collections
);