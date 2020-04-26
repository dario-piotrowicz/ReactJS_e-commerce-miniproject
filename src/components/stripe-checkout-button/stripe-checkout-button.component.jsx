import React from 'react';
import './stripe-checkout-button.styles.scss'
import StripeCheckout from 'react-stripe-checkout';
import { clearAllItems } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';

const StripeCheckoutButton = ({ price, clearCartItems }) => {
    const priceInCents =  price * 100;
    const stripePublishablkey = 'pk_test_1zuA92hpdJl6iYUrOeNkKckB005z3T4ZvH';

    const onTokenHandler = token => {
        alert('Payment Successful');
        clearCartItems();
    }

    return <div className="stipe-checkout-button">
        <div className={`use-test-card-warning ${ price === 0 ? 'hidden' : '' }`}>
            <p>
                Please use the following test credit card number for payment:
            </p>
            <p>
                4242 4242 4242 4242
            </p>
            <p className="expiration-and-cvv">
                (Expiration can be any future date and CVV can be any 3 digit number)
            </p>
        </div>
        <StripeCheckout 
                label='Pay Now'
                name='E-Commerce Miniproject'
                billingAddress
                shippingAddress
                image='https://svgshare.com/i/CUz.svg'
                description={`Your total is $${price}`}
                amount={priceInCents}
                panelLabel='Pay Now'
                token={onTokenHandler}
                stripeKey={stripePublishablkey}
                disabled={ price === 0 }
                />
    </div>;
};

const mapDispatchToProps = dispatch => ({
    clearCartItems: () => dispatch(clearAllItems())
});

export default connect(null,mapDispatchToProps)(StripeCheckoutButton);