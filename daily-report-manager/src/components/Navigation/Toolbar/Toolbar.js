import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleIcon from './ToggleIcon/ToggleIcon';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Logo + ' ' + classes.DesktopOnly}>
        <Logo />
      </div>
      <div className={classes.Logo + ' ' + classes.MobileOnly}>
        <ToggleIcon clicked={() => {props.clickedToggle()}} />
      </div>
      <nav className={classes.DesktopOnly}>
        <NavigationItems
          isAuthenticated={false}
        />
      </nav>
    </header>
  )
}

export default toolbar;
