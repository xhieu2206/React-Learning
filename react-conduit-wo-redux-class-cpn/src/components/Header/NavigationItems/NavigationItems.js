import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends React.Component {
  state = {
    items: [
      {
        name: 'Home',
        url: '/'
      },
      {
        name: 'Sign In',
        url: '/signin'
      },
      {
        name: 'Sign Up',
        url: '/signup'
      }
    ]
  }

  componentDidUpdate() {
    console.log(this.props.isLoggedIn);
  }

  render() {
    return (
      <ul className="nav navbar-nav pull-xs-right">
        {this.state.items.map(item => (
          <NavigationItem key={item.name} url={item.url} name={item.name} />
        ))}
      </ul>
    )
  }
}

export default NavigationItems;
