import React from 'react';
import withLoading from '../with-loading/with-loading.component';
import { useSelector } from 'react-redux';
import { selectAreCollectionsInitialized } from '../../redux/shop/shop.selectors';

const shopDataDependent = Component => ({ ...componentProps }) => {
    const collectionsAreInitialized = useSelector(selectAreCollectionsInitialized);
    const ComponentWithLoading = withLoading(Component);

    return <ComponentWithLoading isLoading={!collectionsAreInitialized} {...componentProps} />;
};

export default Component => shopDataDependent(Component);