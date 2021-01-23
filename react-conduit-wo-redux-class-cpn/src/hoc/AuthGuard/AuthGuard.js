import React from 'react';

import Aux from '../Auxiliary/Auxiliary';
import AuthContext from '../../context/authContext';

const authGuard = (WrappedComponent, loggedInRequired) => {
  return class extends React.Component {
    static contextType = AuthContext;

    componentDidMount() {
      if (!this.context.isLoggedIn && loggedInRequired) {
        this.props.history.push({
          pathname: '/signin'
        });
      } else if (this.context.isLoggedIn && !loggedInRequired) {
        this.props.history.push({
          pathname: '/'
        });
      }
    }

    render() {
      return (
        <Aux>
          <WrappedComponent {...this.props} />
        </Aux>
      )
    }
  }
}

export default authGuard;
