import React from 'react';

const withCLass = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props} />
    </div>
  )
}

export default withCLass;
