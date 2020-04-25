import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';

const MenuItem = ( { title, imageUrl, size, linkUrl,
                     history: routerHistory, match: routerMatch } ) => {
    const redirectToItem = () => routerHistory.push( `${routerMatch.url}${linkUrl}` );
    return <div className={`menu-item ${size}`} onClick={redirectToItem}>
        <div className="background-image" style={ { backgroundImage: `url(${imageUrl})` } }/>
        <div className="content">
            <h1 className="title">{title.toUpperCase()}</h1>
            <span className="subtitle">SHOP NOW</span>
        </div>
    </div>
};

export default withRouter(MenuItem);