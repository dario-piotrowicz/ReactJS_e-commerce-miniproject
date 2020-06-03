import React from 'react';
import './collections-overview.styles.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { useSelector } from 'react-redux';
import { selectCollectionsAsArray } from '../../redux/shop/shop.selectors';

const CollectionsOverview = () => {
    const collections = useSelector(selectCollectionsAsArray);

    return <div className="shop-page">
        {
            collections.map(
                ({id, ...restOfCollectionProps}) => (
                    <CollectionPreview
                        key={id}
                        {...restOfCollectionProps} />
                )
            )
        }
    </div>
};



export default CollectionsOverview;