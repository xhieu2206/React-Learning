import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends React.Component {
  state = {
    isLoggedIn: false,
    username: 'Xuan Hieu',
    image: null
  }

  render() {
    let items = [
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
    ];

    if (this.state.isLoggedIn) {
      items = [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'New Article',
          url: '/new-article'
        },
        {
          name: 'Settings',
          url: '/settings'
        },
        {
          name: this.state.username,
          url: '/users/' + this.state.username,
          image: this.state.image
        }
      ]
    }

    return (
      <ul className="nav navbar-nav pull-xs-right">
        {items.map(item => (
          <NavigationItem
            key={item.name}
            url={item.url}
            name={item.name}
            image={item.image} />
        ))}
      </ul>
    )
  }
}

export default NavigationItems;
