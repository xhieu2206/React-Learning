import React from 'react';

import classes from './Input.module.css';

const Input = props => {
  return (
    <input
      className={classes.InputElement}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      onChange={(e) => props.changed(e.target.value)}
    />
  )
}

export default Input;
