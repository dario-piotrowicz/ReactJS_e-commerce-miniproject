import React from 'react';
import './with-loading.styles.scss';

const withLoading = Component => ({ isLoading, ...componentProps }) => {
    if( !isLoading ) return <Component {...componentProps}/>

    return <div className="with-loading">
            <h1>LOADING...</h1>
    </div>;
};

export default withLoading;