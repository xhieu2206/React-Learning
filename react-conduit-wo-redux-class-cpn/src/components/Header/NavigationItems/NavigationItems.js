import React from 'react';

import AuthContext from '../../../context/authContext';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends React.Component {
  static contextType = AuthContext;

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

    if (this.context.isLoggedIn) {
      items = [
        {
          name: 'Home',
          url: '/'
        },
        {
          name: 'New Article',
          url: 'articles/new'
        },
        {
          name: 'Settings',
          url: '/settings'
        },
        {
          name: this.context.username,
          url: 'users/current',
          image: this.context.image
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
