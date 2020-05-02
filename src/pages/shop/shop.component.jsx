import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { requestShopDataFromFirestore } from '../../redux/shop/shop.actions';
import withLoading from '../../higher-order-components/with-loading/with-loading.component';
import { createStructuredSelector } from 'reselect';
import { selectAreCollectionsInitialized } from '../../redux/shop/shop.selectors';

const CollectionsOverviewWithLoading = withLoading(CollectionsOverview);
const CollectionPageWithLoading = withLoading(CollectionPage);

const ShopPage = ({match, requestShopDataFromFirestore, collectionsAreInitialized}) => {
    requestShopDataFromFirestore();

    return <div className="shop-page">
                <Route exact
                       path={`${match.path}`}
                       render={ (props) =>
                                    <CollectionsOverviewWithLoading
                                    isLoading={!collectionsAreInitialized} {...props}/>} />
                <Route exact
                       path={`${match.path}/:collectionTitle`}
                       render={ (props) =>
                                    <CollectionPageWithLoading
                                    isLoading={!collectionsAreInitialized} {...props}/>} />
    </div>;
};

const mapStateToProps = createStructuredSelector({
    collectionsAreInitialized: selectAreCollectionsInitialized
});

const mapDispatchToProps = dispatch => ({
    requestShopDataFromFirestore: () => dispatch(requestShopDataFromFirestore())
});

export default connect(mapStateToProps,mapDispatchToProps)(ShopPage);