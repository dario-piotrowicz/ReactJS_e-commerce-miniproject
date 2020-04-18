import React from 'react';
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';

const CartIcon = ( { toggleHeaderDropdownHidden } ) => (
    <div className="cart-icon" onClick={toggleHeaderDropdownHidden}>
        <ShoppingBagIcon className="shopping-bag-icon"/>
        <span className="items-count">0</span>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleHeaderDropdownHidden: () => dispatch(toggleHeaderDropdownHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);