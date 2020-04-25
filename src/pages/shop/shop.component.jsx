import React from 'react';
import './shop.styles.scss';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import { Route } from 'react-router-dom';

const ShopPage = ({ match }) => (
    <div className="shop-page">
        <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route exact path={`${match.path}/hats`} component={ () => (<h1>HATS PAGE</h1>)} />
        <Route exact path={`${match.path}/jackets`} component={ () => (<h1>JACKETS PAGE</h1>)} />
        <Route exact path={`${match.path}/sneakers`} component={ () => (<h1>SNEAKERS PAGE</h1>)} />
        <Route exact path={`${match.path}/womens`} component={ () => (<h1>WOMENS PAGE</h1>)} />
        <Route exact path={`${match.path}/mens`} component={ () => (<h1>MENS PAGE</h1>)} />
    </div>
);

export default ShopPage;