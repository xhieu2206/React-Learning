import React from 'react';
import classes from './FancyBorder.module.css';

const fancyBorder = (props) => {
  const classArr = [classes.FancyBorder, classes['FancyBorder-' + props.color]];

  return (
    <div className={classArr.join(' ')}>
      {props.children}
    </div>
  );
}

export default fancyBorder;
