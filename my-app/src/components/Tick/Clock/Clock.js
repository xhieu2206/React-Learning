import React from 'react';

const clock = (props) => {
  return <h2>It's {props.date.toLocaleTimeString()}</h2>
}

export default clock;
