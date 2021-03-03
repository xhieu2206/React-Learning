import React, { useState } from 'react';

import classes from './Layout.module.css';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedraw from '../../components/Navigation/Sidedraw/Sidedraw';

const Layout = props => {
  const [showSideDraw, setShowSideDraw] = useState(false);
  const clickToggleHandler = () => {
    setShowSideDraw(!showSideDraw);
  }

  return (
    <Aux>
      <Toolbar clickedToggle={() => { clickToggleHandler() }} />
      <Sidedraw isShow={showSideDraw} closeSideDraw={() => clickToggleHandler()}/>

      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

export default Layout;
