import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';

const CartDropdown = () => (
    <div className="cart-dropdown">
        <div className="items-container">
            { 
                [1,2,3,4,5,6,7,8,9].map( (idx) =>
                 <h1>Product {idx}</h1>
                )
            }
        </div>
        <CustomButton>
            Go To Checkout
        </CustomButton>
    </div>
);

export default CartDropdown;