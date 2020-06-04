import React from 'react';
import './checkout-item.styles.scss';
import { useDispatch } from 'react-redux';
import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item }) => {
    const dispatch = useDispatch();

    const { name, imageUrl, quantity, price } = item;

    return <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt={name} />
        </div>
        <span>{name}</span>
        <span className="quantity">
            <span className="arrow"
                  onClick={() => dispatch(removeItem(item))}>&#10094;</span>
            <span className="value">{quantity}</span>
            <span className="arrow"
                  onClick={() => dispatch(addItem(item))}>&#10095;</span>
        </span>
        <span className="price">${price}</span>
        <span className="remove-button">
            <label onClick={() => dispatch(clearItem(item))}>&#10005;</label></span>
    </div>;
};

export default CheckoutItem;