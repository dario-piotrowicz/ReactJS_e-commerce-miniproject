import React from 'react';
import withLoading from '../with-loading/with-loading.component';
import { connect } from 'react-redux';
import { selectAreCollectionsInitialized } from '../../redux/shop/shop.selectors';
import { createStructuredSelector } from 'reselect';

const shopDataDependent = Component => ({ collectionsAreInitialized, ...componentProps }) => {
    const ComponentWithLoading = withLoading(Component);
    return <ComponentWithLoading isLoading={!collectionsAreInitialized} {...componentProps} />;
};

const mapStateToProps = createStructuredSelector({
    collectionsAreInitialized: selectAreCollectionsInitialized
});

export default Component => connect(mapStateToProps)(shopDataDependent(Component));