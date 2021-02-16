import React from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary';

const authGuard = (WrappedComponent, loggedInRequired) => {
  return class extends React.Component {

    componentDidMount() {
      if (!this.props.isLoggedIn && loggedInRequired) {
        this.props.history.push({
          pathname: '/signin'
        });
      } else if (this.props.isLoggedIn && !loggedInRequired) {
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
