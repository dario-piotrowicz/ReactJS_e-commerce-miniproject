import React from 'react';
import './collection.styles.scss';

const CollectionPage = ({match}) => {
    const collectionName = match.params.collectionName.toUpperCase();
    return <h1>{collectionName} PAGE</h1>;
};

export default CollectionPage;