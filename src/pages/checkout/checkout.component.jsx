import React from 'react';
import './checkout.styles.scss';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCartItems, selectCartItemsTotalPrice } from '../../redux/cart/cart.selectors';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import StripeCheckoutButton from '../../components/stripe-checkout-button/stripe-checkout-button.component';

const CheckoutPage = ({cartItems, totalPrice}) => (
    <div className="checkout-page">
        <div className="checkout-header">
            <span>Product</span>
            <span>Description</span>
            <span>Quantity</span>
            <span>Price</span>
            <span>Remove</span>
        </div>
        {
            cartItems.map( item =>
                <CheckoutItem key={item.id} item={item}/>
            )
        }
        <span className="total">Total: ${totalPrice}</span>
        <StripeCheckoutButton price={totalPrice}/>
    </div>
);

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    totalPrice: selectCartItemsTotalPrice
});

export default connect(mapStateToProps)(CheckoutPage);