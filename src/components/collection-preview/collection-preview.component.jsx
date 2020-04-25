import React from 'react';
import './collection-preview.styles.scss';
import CollectionItem from '../collection-item/collection-item.component';
import { Link } from 'react-router-dom';

const CollectionPreview = ({ title, items, routeName }) => (
 <div className="collection-preview">
    <h1 className="title">
        <Link to={`shop/${routeName}`}>
            {title.toUpperCase()}
        </Link>
    </h1>
    <div className="previews">
        {
            items.filter( (_, idx) => idx < 4 )
                .map( item =>
                <CollectionItem key={item.id} item={item}/> )
        }
    </div>
 </div>
);

export default CollectionPreview;