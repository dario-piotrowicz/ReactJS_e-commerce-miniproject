import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartDropdownItem from '../cart-dropdown-item/cart-dropdown-item.component';
import { connect } from 'react-redux';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { createStructuredSelector } from 'reselect';

const CartDropdown = ({ cartItems }) => (
    <div className="cart-dropdown">
        <div className="items-container">
            { 
                cartItems.map( (item) =>
                    <CartDropdownItem key={item.id} item={item} />
                )
            }
        </div>
        <CustomButton>
            Go To Checkout
        </CustomButton>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems
});

export default connect(mapStateToProps)(CartDropdown);