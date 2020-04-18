import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHeaderDropdownHidden } from '../../redux/cart/cart.selectors';

const Header = ( { currentUser, cartDropdownHidden } ) => (
    <div className="header">
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
                         onClick={ () => auth.signOut() }>
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
);

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    cartDropdownHidden: selectCartHeaderDropdownHidden(state)
});

export default connect(mapStateToProps)(Header);