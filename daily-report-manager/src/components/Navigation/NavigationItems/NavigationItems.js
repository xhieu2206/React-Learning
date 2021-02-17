import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/" exact >Project Daily Manager</NavigationItem>
      {props.isAuthenticated ? <NavigationItem link="/projects">Projects</NavigationItem> : null}
      {!props.isAuthenticated ? <NavigationItem link="/auth/signin">Sign In</NavigationItem>
        : null}
      {!props.isAuthenticated ? <NavigationItem link="/auth/signup">Sign Up</NavigationItem>
        : <NavigationItem link="/logout">Logout</NavigationItem>}
    </ul>
  )
}

export default navigationItems;
