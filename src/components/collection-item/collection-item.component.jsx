import React from 'react';
import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';

const CollectionItem = ({ item }) => {
    const { name, price, imageUrl } = item;

    const dispatch = useDispatch();

    return <div className="collection-item">
        <div className="image"
             style={{ backgroundImage: `url(${imageUrl})`}}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">${price}</span>
        </div>
        <CustomButton onClick={() => dispatch(addItem(item))} invertedColors>
            Add To Cart
        </CustomButton>
    </div>
};

export default CollectionItem;