import React from 'react';
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { connect } from 'react-redux';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartIcon = ( { toggleHeaderDropdownHidden, itemsCount } ) => (
    <div className="cart-icon" onClick={toggleHeaderDropdownHidden}>
        <ShoppingBagIcon className="shopping-bag-icon"/>
        <span className="items-count">{
            itemsCount < 100 ? itemsCount : '99+'
        }</span>
    </div>
);

const mapStateToProps = createStructuredSelector({
    itemsCount: selectCartItemsCount
});

const mapDispatchToProps = dispatch => ({
    toggleHeaderDropdownHidden: () => dispatch(toggleHeaderDropdownHidden())
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);