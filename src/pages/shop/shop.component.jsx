import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { connect } from 'react-redux';
import { requestShopDataUpdatesFromFirestore } from '../../redux/shop/shop.actions';
import shopDataDependent from '../../higher-order-components/shop-data-dependent/shop-data-dependent.componen';

const ShopDataDependentCollectionsOverview = shopDataDependent(CollectionsOverview);
const ShopDataDependentCollectionPage = shopDataDependent(CollectionPage);

class ShopPage extends React.Component {
    componentDidMount(){
       const { requestShopDataUpdatesFromFirestore } = this.props;
       requestShopDataUpdatesFromFirestore();
    }

    render(){
        const { match } = this.props;

        return <div className="shop-page">
                    <Route exact
                        path={`${match.path}`}
                        component={ShopDataDependentCollectionsOverview} />
                    <Route exact
                        path={`${match.path}/:collectionTitle`}
                        component={ShopDataDependentCollectionPage} />
        </div>;
    };
}

const mapDispatchToProps = dispatch => ({
    requestShopDataUpdatesFromFirestore: () => dispatch(requestShopDataUpdatesFromFirestore())
});

export default connect(null,mapDispatchToProps)(ShopPage);