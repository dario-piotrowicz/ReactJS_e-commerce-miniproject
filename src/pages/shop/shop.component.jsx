import React from 'react';
import SHOP_DATA from './shop.data.json'; // Note: importing json files works by default with webpack >= v2.0.0

class ShopPage extends React.Component {
    constructor(props){
        super(props);

        this.state = { 
            collections: SHOP_DATA
        };
    }

    render(){
        return <h1>SHOP PAGE</h1>;
    }
};

export default ShopPage;