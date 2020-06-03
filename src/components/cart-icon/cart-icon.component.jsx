import React from 'react';
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { connect, useSelector } from 'react-redux';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = ( { toggleHeaderDropdownHidden } ) => {
    const itemsCount = useSelector(selectCartItemsCount);

    return <div className="cart-icon" onClick={toggleHeaderDropdownHidden}>
        <ShoppingBagIcon className="shopping-bag-icon"/>
        <span className="items-count">{
            itemsCount < 100 ? itemsCount : '99+'
        }</span>
    </div>
};

const mapDispatchToProps = dispatch => ({
    toggleHeaderDropdownHidden: () => dispatch(toggleHeaderDropdownHidden())
});

export default connect(null, mapDispatchToProps)(CartIcon);