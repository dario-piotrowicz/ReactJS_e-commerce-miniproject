import React from 'react';
import './cart-icon.styles.scss'
import { ReactComponent as ShoppingBagIcon } from '../../assets/shopping-bag.svg';
import { useSelector, useDispatch } from 'react-redux';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

const CartIcon = () => {
    const itemsCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();

    return <div className="cart-icon" 
        onClick={ () => dispatch(toggleHeaderDropdownHidden()) }>
            <ShoppingBagIcon className="shopping-bag-icon"/>
            <span className="items-count">{
                itemsCount < 100 ? itemsCount : '99+'
            }</span>
    </div>
};

export default CartIcon;