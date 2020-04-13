import React from 'react';
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';

const CartIcon = () => (
    <div className="cart-icon">
        <ShoppingBagIcon className="shopping-bag-icon"/>
        <span className="items-count">0</span>
    </div>
);

export default CartIcon;