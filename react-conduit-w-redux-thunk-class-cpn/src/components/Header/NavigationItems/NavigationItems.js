import React from 'react';
import { connect } from 'react-redux';

import NavigationItem from './NavigationItem/NavigationItem';

class NavigationItems extends React.Component {
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

    if (this.props.isLoggedIn) {
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
          name: this.props.username,
          url: '/users/' + this.props.username,
          image: this.props.image
        }
      ]
    }

    return (
      <ul className="nav navbar-nav pull-xs-right">
        {items.map((item, index) => (
          <NavigationItem
            key={index}
            url={item.url}
            name={item.name}
            image={item.image} />
        ))}
      </ul>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    username: state.auth.user.username,
    image: state.auth.user.image
  }
}

export default connect(mapStateToProps, null)(NavigationItems);
