import React from 'react';
import './collection.styles.scss';
import { useSelector } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';
import { useRouteMatch } from 'react-router-dom';

const CollectionPage = () => {
    const match = useRouteMatch();
    const { collection } = useSelector( state => {
        const collectionTitle = match.params.collectionTitle;
        const selectSpecificCollection = selectCollection(collectionTitle);
        return {
            collection: selectSpecificCollection(state)
        };
    });

    let title = '', items = [];
    if ( collection ){
        title = collection.title;
        items = collection.items;
    }
    return <div className="collection-page">
        <h1 className="title">{title.toUpperCase()}</h1>
        {
            <div className="items">
            {
                items.map( item =>
                        <CollectionItem key={item.id} item={item}/> )
            }
            </div>
        }
    </div>
};

export default CollectionPage;