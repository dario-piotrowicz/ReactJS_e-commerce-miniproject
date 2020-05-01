import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore } from '../../firebase/firebase.utils';
import { convertBasicShopDataArrayToShopDataMap } from '../../redux/shop/shop.utils';
import { connect } from 'react-redux';
import { setShopData } from '../../redux/shop/shop.actions';
import withLoading from '../../higher-order-components/with-loading/with-loading.component';

const CollectionsOverviewWithLoading = withLoading(CollectionsOverview);
const CollectionPageWithLoading = withLoading(CollectionPage);

class ShopPage extends React.Component {
    state = { loading: true };

    unsubscribeFromShopDataRefOnSnap = null;

    componentDidMount(){
        const { setShopData } = this.props;

        const shopDataRef = firestore.collection('shopData');
        this.unsubscribeFromShopDataRefOnSnap = shopDataRef.onSnapshot(
            async shopDataSnap => {
                const shopDataArray = shopDataSnap.docs.map( doc =>
                    ( { ...doc.data(), id: doc.id } )
                );
                const processedShopData = convertBasicShopDataArrayToShopDataMap(shopDataArray);
                setShopData(processedShopData);
                this.setState({ loading: false });
            }
        );
    }

    componentWillUnmount(){
        if(this.unsubscribeFromShopDataRefOnSnap)
            this.unsubscribeFromShopDataRefOnSnap();
    }

    render(){
     const { match } = this.props;
     const { loading } = this.state;
     return <div className="shop-page">
                <Route exact
                       path={`${match.path}`}
                       render={ (props) =>
                                    <CollectionsOverviewWithLoading
                                    isLoading={loading} {...props}/>} />
                <Route exact
                       path={`${match.path}/:collectionTitle`}
                       render={ (props) =>
                                    <CollectionPageWithLoading
                                    isLoading={loading} {...props}/>} />
            </div>;
    }

}

const mapDispatchToProps = dispatch => ({
    setShopData: shopData => dispatch(setShopData(shopData))
});

export default connect(null,mapDispatchToProps)(ShopPage);