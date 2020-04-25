import React from 'react';
import './main-menu.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSections } from '../../redux/main-menu/main-menu.selectors';

const MainMenu = ({ sections }) => (
  <div className="main-menu-container">
    {
      sections.map( section => (
        <MenuItem key={section.id}
                  title={section.title}
                  imageUrl={section.imageUrl}
                  size={section.size}
                  linkUrl={section.linkUrl}/> ) )
    }
    </div>
);

const mapStateToProps = createStructuredSelector({
  sections: selectSections
});

export default connect(mapStateToProps)(MainMenu);