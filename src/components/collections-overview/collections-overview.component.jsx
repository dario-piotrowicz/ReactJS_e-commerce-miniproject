import React from 'react';
import './collections-overview.styles.scss';
import CollectionPreview from '../../components/collection-preview/collection-preview.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCollectionsAsArray } from '../../redux/shop/shop.selectors';

const CollectionsOverview = ({collections}) => (
    <div className="shop-page">
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
);

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsAsArray
});

export default connect(mapStateToProps)(CollectionsOverview);