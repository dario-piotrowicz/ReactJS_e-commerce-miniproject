import React from 'react';
import './with-loading.styles.scss';

const withLoading = Component => ({ isLoading, ...componentProps }) => {
    if( !isLoading ) return <Component {...componentProps}/>

    return <div className="with-loading">
            <div className="loading-icon"/>
    </div>;
};

export default withLoading;