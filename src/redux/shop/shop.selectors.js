import { createSelector } from 'reselect';

const shopSelector = state => state.shop;

export const collectionsSelector = createSelector(
    [shopSelector],
    shop => shop.collections
);

export const selectCollection = collectionTitle => createSelector(
        [collectionsSelector],
        collections => collections[collectionTitle]
);
