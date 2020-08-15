import React, { useState } from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { useHistory } from 'react-router-dom';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toast } from 'react-toastify';

const CartDropdown = () => {
    const history = useHistory();
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const currentUser = useSelector(selectCurrentUser);

    const [goToCheckoutButtonDisabled, setGoToCheckoutButtonDisabled] = useState(false);

    const goToCheckout = () => {
        if(!currentUser){
            toast.error('Sign in to view your checkout page');
            setGoToCheckoutButtonDisabled(true);
            setTimeout( () => {
                setGoToCheckoutButtonDisabled(false);
            },3000);
        } else {
            history.push('/checkout');
            dispatch(toggleHeaderDropdownHidden());
        }
    };

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
            <>
               <span className="empty-cart-message">Your cart is empty</span>
               {
                   currentUser ? null :
                   <span className="empty-cart-message">Sign in to add items to your cart</span>
               }
            </>
        }
        <CustomButton onClick={goToCheckout} disabled={ goToCheckoutButtonDisabled ? true : false}>
            Go To Checkout
        </CustomButton>
    </div>
};

export default CartDropdown;