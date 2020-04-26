import React from 'react';
import './stripe-checkout-button.styles.scss'
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    alert('Payment Successful');
}

const StripeCheckoutButton = ({ price }) => {
    const priceInCents =  price * 100;
    const stripePublishablkey = 'pk_test_1zuA92hpdJl6iYUrOeNkKckB005z3T4ZvH';

    return <div className="stipe-checkout-button">
        <div className="use-test-card-warning">
            please use the following test credit card number for payment:
            <br />
            4242 4242 4242 4242
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
                token={onToken}
                stripeKey={stripePublishablkey}
                />
    </div>;
};

export default StripeCheckoutButton;