import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';
import CollectionPage from '../collection/collection.component';
import { firestore } from '../../firebase/firebase.utils';
import { convertBasicShopDataArrayToShopDataMap } from '../../redux/shop/shop.utils';
import { connect } from 'react-redux';
import { setShopData } from '../../redux/shop/shop.actions';

class ShopPage extends React.Component {
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
                console.log({shopDataRef, shopDataSnap, shopDataArray, processedShopData});
            }
        );
    }

    componentWillUnmount(){
        if(this.unsubscribeFromShopDataRefOnSnap)
            this.unsubscribeFromShopDataRefOnSnap();
    }

    render(){
     const { match } = this.props;
     return <div className="shop-page">
                <Route exact
                       path={`${match.path}`}
                       component={CollectionsOverview} />
                <Route exact
                       path={`${match.path}/:collectionTitle`}
                       component={CollectionPage} />
            </div>;
    }

}

const mapDispatchToProps = dispatch => ({
    setShopData: shopData => dispatch(setShopData(shopData))
});

export default connect(null,mapDispatchToProps)(ShopPage);