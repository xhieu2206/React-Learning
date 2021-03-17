import React, { useEffect } from 'react';

const authGuard = (WrappedComponent, loggedInRequired) => {
  return (props) => {
    const { history, isLoggedIn } = props;
    useEffect(() => {
      if (!isLoggedIn && loggedInRequired) {
        history.push({
          pathname: '/auth/signin'
        });
      } else if (isLoggedIn && !loggedInRequired) {
        history.push({
          pathname: '/posts'
        });
      }
    }, [isLoggedIn, history]);

    return (
      <>
        <WrappedComponent {...props} />
      </>
    );
  }
}

export default authGuard;
