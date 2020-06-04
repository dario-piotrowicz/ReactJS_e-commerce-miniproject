import React from 'react';
import './menu-item.styles.scss';
import { useHistory, useRouteMatch } from 'react-router-dom';

const MenuItem = ( { title, imageUrl, size, linkUrl } ) => {
    const history = useHistory();
    const { url } = useRouteMatch();

    const redirectToItem = () => history.push( `${url}${linkUrl}` );

    return <div className={`menu-item ${size}`} onClick={redirectToItem}>
        <div className="background-image" style={ { backgroundImage: `url(${imageUrl})` } }/>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
};

export default MenuItem;