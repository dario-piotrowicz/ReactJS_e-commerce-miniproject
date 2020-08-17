import React, { useState } from 'react';
import './collection-item.styles.scss'
import CustomButton from '../custom-button/custom-button.component';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { toast } from 'react-toastify';

const CollectionItem = ({ item }) => {
    const { name, price, imageUrl } = item;

    const [addButtonDisabled, setAddButtonDisabled] = useState(false);

    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const addItemToCart = () => {
        if(!currentUser){
            toast.error('Sign in to add an item to your cart');
            setAddButtonDisabled(true);
            setTimeout( () => {
                setAddButtonDisabled(false);
            },3000);
        } else {
            dispatch(addItem(item));
        }
    };

    return <div className="collection-item">
        <div className="image"
             style={{ backgroundImage: `url(${imageUrl})`}}/>
        <div className="footer">
            <span className="name">{name}</span>
            <span className="price">${price}</span>
        </div>
        <CustomButton onClick={addItemToCart} invertedColors disabled={addButtonDisabled ? true : false}>
            Add To Cart
        </CustomButton>
    </div>
};

export default CollectionItem;