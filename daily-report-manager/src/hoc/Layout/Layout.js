import React from 'react';

import classes from './Layout.module.css';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

const Layout = props => {
  return (
    <Aux>
      <Toolbar />

      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout;
