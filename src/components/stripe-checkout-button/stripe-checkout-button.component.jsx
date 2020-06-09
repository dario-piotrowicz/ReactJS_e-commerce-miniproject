import React from 'react';
import './stripe-checkout-button.styles.scss'
import StripeCheckout from 'react-stripe-checkout';
import { clearAllItems } from '../../redux/cart/cart.actions';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

const stripePaymentUrl = process.env.NODE_ENV === 'production' ?
                            'https://ecomm-miniproject-backend.herokuapp.com/stripe-payment'
                            : '/stripe-payment';
const stripeCurrency = 'USD';

const StripeCheckoutButton = ({ price }) => {

    const dispatch = useDispatch();

    const priceInCents =  price * 100;
    const stripePublishablkey = 'pk_test_1zuA92hpdJl6iYUrOeNkKckB005z3T4ZvH';

    const onTokenHandler = async token => {
        try {
            await axios({
                url: stripePaymentUrl,
                method: 'post',
                data: {
                    amount: priceInCents,
                    currency: stripeCurrency,
                    token
                }
            });

            alert('Payment Successful!');
            dispatch(clearAllItems());
        } catch( error ){
            const errorResponse = error && error.response ? error.response : {};
            if(errorResponse.status === 404 ){
                toast.error("Error: Backend not found");
            } else {
                const stripeErrorData = errorResponse.data;
                const stripeErrorCode = stripeErrorData ? stripeErrorData.code : null;
                switch(stripeErrorCode){
                    case 'card_declined':
                        toast.error('Error: Wrong card provided, please use the test card provided');
                        break;
                    default:
                        toast.error("Error: Payment aborted");
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
                (Expiration can be any future date and CVV can be any 3/4 digit number)
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
            disabled={ price === 0 } />
    </div>;
};

export default StripeCheckoutButton;