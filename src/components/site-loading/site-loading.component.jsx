import React from 'react';
import './site-loading.styles.scss';
import { useSelector } from 'react-redux';
import { selectLoading } from '../../redux/loading/loading.selectors';

const SiteLoading = () => {
  const loading = useSelector(selectLoading);
 return <>
 {
   !loading ? null :
      <div id="site-loading">
        <h1 className="loading-icon">
        </h1>
      </div>
 }
 </>;
}

export default SiteLoading;