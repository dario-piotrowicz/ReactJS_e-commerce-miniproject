import { createSelector } from 'reselect';
import { collectionTitleToId } from './shop.utils';

const shopSelector = state => state.shop;

export const collectionsSelector = createSelector(
    [shopSelector],
    shop => shop.collections
);

export const selectCollection = collectionTitle => {
    const collectionId = collectionTitleToId(collectionTitle);
    return createSelector(
        [collectionsSelector],
        collections => collections.find( c => c.id === collectionId )
    );
};