import React from 'react';
import './checkout-item.styles.scss';
import { connect } from 'react-redux';
import { addItem, removeItem, clearItem } from '../../redux/cart/cart.actions';

const CheckoutItem = ({ item, addItem, removeItem, clearItem }) => {
    const { name, imageUrl, quantity, price } = item;
    return <div className="checkout-item">
        <div className="image-container">
            <img src={imageUrl} alt={name} />
        </div>
        <span>{name}</span>
        <span className="quantity">
            <span className="arrow"
                  onClick={() => removeItem(item)}>&#10094;</span>
            <span className="value">{quantity}</span>
            <span className="arrow"
                  onClick={() => addItem(item)}>&#10095;</span>
        </span>
        <span className="price">${price}</span>
        <span className="remove-button">
            <label onClick={() => clearItem(item)}>&#10005;</label></span>
    </div>;
};

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)),
    clearItem: item => dispatch(clearItem(item))
});

export default connect(null,mapDispatchToProps)(CheckoutItem);