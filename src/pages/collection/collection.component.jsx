import React from 'react';
import './collection.styles.scss';
import { connect } from 'react-redux';
import { selectCollection } from '../../redux/shop/shop.selectors';

const CollectionPage = ({ collection }) => {
    const upperTitle = collection.title.toUpperCase();
    return <h1>{upperTitle} PAGE</h1>;
};

const mapStateToProps = (state, ownProps) => {
    const collectionTitle = ownProps.match.params.collectionTitle;
    const selectSpecificCollection = selectCollection(collectionTitle);
    return {
        collection: selectSpecificCollection(state)
    };
};

export default connect(mapStateToProps)(CollectionPage);