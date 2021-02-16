import React, { useEffect } from 'react';

import Aux from '../Auxiliary/Auxiliary';

const authGuard = (WrappedComponent, loggedInRequired) => {
  return (props) => {
    useEffect(() => {
      if (!props.isLoggedIn && loggedInRequired) {
        props.history.push({
          pathname: '/signin'
        });
      } else if (props.isLoggedIn && !loggedInRequired) {
        props.history.push({
          pathname: '/'
        });
      }
    }, []);

    return (
      <Aux>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default authGuard;
