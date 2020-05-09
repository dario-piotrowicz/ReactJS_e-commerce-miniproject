import React from 'react';
import './stripe-checkout-button.styles.scss'
import StripeCheckout from 'react-stripe-checkout';
import { clearAllItems } from '../../redux/cart/cart.actions';
import { connect } from 'react-redux';
import axios from 'axios';

const stripeCurrency = 'USD';

const StripeCheckoutButton = ({ price, clearCartItems }) => {
    const priceInCents =  price * 100;
    const stripePublishablkey = 'pk_test_1zuA92hpdJl6iYUrOeNkKckB005z3T4ZvH';

    const onTokenHandler = async token => {
        try {
            await axios({
                url: 'stripe-payment',
                method: 'post',
                data: {
                    amount: priceInCents,
                    currency: stripeCurrency,
                    token
                }
            });

            alert('Payment Successful!');
            clearCartItems();
        } catch( error ){
            if(error.response.status === 404 ){
                alert('Error: Backend not found');
            } else {
                const stripeErrorData = error.response.data;
                const stripeErrorCode = stripeErrorData ? stripeErrorData.code : null;
                switch(stripeErrorCode){
                    case 'card_declined':
                        alert('Error: Wrong card provided, please use the test card provided');
                        break;
                    default:
                        alert('Error: Payment aborted');
                        break;
                }
            }
        }
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
                currency={stripeCurrency}
                disabled={ price === 0 }
                />
    </div>;
};

const mapDispatchToProps = dispatch => ({
    clearCartItems: () => dispatch(clearAllItems())
});

export default connect(null,mapDispatchToProps)(StripeCheckoutButton);