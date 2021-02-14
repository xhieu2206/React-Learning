import React, { useState } from 'react';
import { connect } from 'react-redux';

// CSS
import classes from './Layout.css';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

const layout = props => {
  const [sideDrawIsVisible, setSideDrawIsVisible] = useState(false);

  const sideDrawClosedHandler = () => {
    setSideDrawIsVisible(false);
  }

  const sideDrawerToggledHandler = () => {
    setSideDrawIsVisible(!sideDrawIsVisible)
  }

  return (
    <Aux>
      <div>
        <Toolbar
          isAuth={props.isAuthenticated}
          drawerToggleClicked={sideDrawerToggledHandler}
        />
        <SideDraw
          isAuth={props.isAuthenticated}
          open={sideDrawIsVisible}
          closed={sideDrawClosedHandler}
        />
      </div>
      <main className={classes.Content}>
        {props.children}
      </main>
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(layout);
