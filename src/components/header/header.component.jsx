import React from 'react';
import './header.styles.scss';
import { ReactComponent as Logo } from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase/firebase.utils';

const Header = ( { currentUser } ) => (
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
        </div>
    </div>
);

export default Header;