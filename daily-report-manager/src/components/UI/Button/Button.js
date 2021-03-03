import React from 'react';

import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      disabled={props.isDisabled}
      onClick={(e) => {
        e.preventDefault();
        props.clicked()
      }}
      className={classes[props.type] + ' ' + classes.Button}>
        {props.children}
    </button>
  )
}

export default Button;
