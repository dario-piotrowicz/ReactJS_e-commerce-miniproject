import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHeaderDropdownHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import { createStructuredSelector } from 'reselect';
import { signOut } from '../../redux/user/user.actions';

const Header = ( { currentUser, cartDropdownHidden, signOut } ) => (
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
                         onClick={signOut}>
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

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartDropdownHidden: selectCartHeaderDropdownHidden
});

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);