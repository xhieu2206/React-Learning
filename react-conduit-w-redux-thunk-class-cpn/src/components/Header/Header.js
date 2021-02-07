import React from 'react';

import NavigationItems from './NavigationItems/NavigationItems';
import Brand from './Brand/Brand'

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <Brand />
          <NavigationItems isLoggedIn={this.props.isLoggedIn} />
        </div>
      </nav>
    )
  }
}

export default Header;
