import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHeaderDropdownHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { signOut } from '../../redux/user/user.actions';

const Header = () => {
    const currentUser = useSelector(selectCurrentUser);
    const cartDropdownHidden = useSelector(selectCartHeaderDropdownHidden);
    const dispatch = useDispatch();

    return <div className="header">
        <Link className="logo-container" to="/">
            <Logo />
        </Link>
        <div className="options-container">
            <Link className="option" to="/shop">
                SHOP
            </Link>
            <Link className="option" to="/contact">
                CONTACT
            </Link>
            {
                currentUser ?
                    <div className="option"
                         onClick={() => dispatch(signOut())}>
                        SIGN OUT
                    </div>
                    : <Link className="option" to="/signin">
                        SIGN IN
                      </Link>
            }
            <CartIcon />
        </div>
        {
            cartDropdownHidden ? null : <CartDropdown />
        }
    </div>
};


export default Header;