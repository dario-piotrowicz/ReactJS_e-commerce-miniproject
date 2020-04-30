import React from 'react';
import './collection.styles.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';
import CollectionItem from '../../components/collection-item/collection-item.component';

const CollectionPage = ({ collection }) => {
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

const mapStateToProps = (state, ownProps) => {
    const collectionTitle = ownProps.match.params.collectionTitle;
    const selectSpecificCollection = selectCollection(collectionTitle);
    return {
        collection: selectSpecificCollection(state)
    };
};

export default connect(mapStateToProps)(CollectionPage);