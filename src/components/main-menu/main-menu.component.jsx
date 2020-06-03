import React from 'react';
import './main-menu.styles.scss';
import MenuItem from '../menu-item/menu-item.component';
import { useSelector } from 'react-redux';
import { selectSections } from '../../redux/main-menu/main-menu.selectors';

const MainMenu = () => {
  const sections = useSelector(selectSections);

  return <div className="main-menu-container">
    {
      sections.map( section => (
        <MenuItem key={section.id}
                  title={section.title}
                  imageUrl={section.imageUrl}
                  size={section.size}
                  linkUrl={section.linkUrl}/> ) )
    }
    </div>
};

export default MainMenu;