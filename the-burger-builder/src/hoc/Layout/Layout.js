import React from 'react';

// CSS
import classes from './Layout.css';

import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDraw from '../../components/Navigation/SideDraw/SideDraw';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  }

  sideDrawClosedHandler = () => {
    this.setState({
      showSideDrawer: false
    });
  }

  sideDrawerToggledHandler = () => {
    this.setState((prevState, props) => {
      return {
        showSideDrawer: !prevState.showSideDrawer
      }
    });
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar drawerToggleClicked={this.sideDrawerToggledHandler}/>
          <SideDraw
            open={this.state.showSideDrawer}
            closed={this.sideDrawClosedHandler}
          />
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

export default Layout;
