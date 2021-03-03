import React from 'react';

import classes from './ToggleIcon.module.css';

const ToggleIcon = props => {
  return (
    <div className={classes.ToggleIcon} onClick={props.clicked}>
      <div className={classes.Blue}></div>
      <div className={classes.Orange}></div>
      <div className={classes.Green}></div>
    </div>
  )
}

export default ToggleIcon;
