import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
import { connect, useSelector } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { useHistory } from 'react-router-dom';
import { toggleHeaderDropdownHidden } from '../../redux/cart/cart.actions';

const CartDropdown = ({ toggleHeaderDropdownHidden }) => {
    const history = useHistory();
    const cartItems = useSelector(selectCartItems);

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
                                    toggleHeaderDropdownHidden();
                                } }>
            Go To Checkout
        </CustomButton>
    </div>
};

const mapDispatchToProps = dispatch => ({
    toggleHeaderDropdownHidden: () => dispatch(toggleHeaderDropdownHidden())
});

export default connect(null,mapDispatchToProps)(CartDropdown);