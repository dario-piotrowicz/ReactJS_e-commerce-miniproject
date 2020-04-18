import React from 'react';
import './custom-button.styles.scss'

const CustomButton = ({ children, isGoogleSignIn, invertedColors , ...otherProps }) => {
    let className = 'custom-button';
    if ( isGoogleSignIn ) className += ' google-sign-in';
    if ( invertedColors ) className += ' inverted-colors';
    return <button className={className} {...otherProps}>
        {children}
    </button>
};

export default CustomButton;