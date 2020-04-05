import React from 'react';
import './shop.styles.scss';
import SHOP_DATA from './shop.data.json'; // Note: importing json files works by default with webpack >= v2.0.0
import CollectionPreview from '../../components/collection-preview/collection-preview.component';

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            collections: SHOP_DATA
        };
    }

    render(){
        return <div>
            {
                this.state.collections.map(
                    ( {id, ...restOfCollectionProps} ) => (
                        <CollectionPreview key={id} {...restOfCollectionProps}/>
                    )
                )
            }
        </div>;
    }
};

export default ShopPage;