import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

import NavigationItems from '../NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDraw/DrawerToggle/DrawerToggle';

const toolbar = props => {
  return (
    <header className={classes.Toolbar}>
      <div className={classes.Logo}>
        <Logo />
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
