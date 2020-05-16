import React from 'react';
import './cart-dropdown-item.styles.scss';

const CartDropdownItem = ({ item: { imageUrl , price, name, quantity } }) => (
    <div className="cart-dropdown-item">
        <img src={imageUrl} alt={name}/>
        <div className="item-details">
            <span className="name">{name}</span>
            <span className="price">{quantity} X ${price}</span>
        </div>
    </div>
);

export default React.memo(CartDropdownItem);