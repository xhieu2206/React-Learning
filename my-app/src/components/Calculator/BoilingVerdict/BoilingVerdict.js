import React from 'react';

const boilingVerdict = props => {
  if (props.celsius >= 100) {
    return <p>The water would boil</p>;
  }
  return <p>The water would not boil</p>;
}

export default boilingVerdict;
