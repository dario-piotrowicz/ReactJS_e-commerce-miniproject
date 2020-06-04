import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { useHistory } from 'react-router-dom';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';

const CartDropdown = () => {
    const history = useHistory();
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    return <div className="cart-dropdown">
        {
            cartItems.length
            ?
                <div className="items-container">
                    {
                        cartItems.map( (item) =>
                            <CartDropdownItem key={item.id} item={item} />
                        )
                    }
                </div>
            :
               <span className="empty-cart-message">Your cart is empty</span>
        }
        <CustomButton onClick={ () => {
                                    history.push('/checkout');
                                    dispatch(toggleHeaderDropdownHidden());
                                } }>
            Go To Checkout
        </CustomButton>
    </div>
};

export default CartDropdown;