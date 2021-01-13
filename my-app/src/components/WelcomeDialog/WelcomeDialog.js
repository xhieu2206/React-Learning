import React from 'react';
import style from './WelcomeDialog.module.css';

import FancyBorder from '../Containers/FancyBorder';

const welcomeDialog = props => {
  return <FancyBorder color={props.color}>
    <h1 className={style.DialogTitle}>
      Welcome
    </h1>
    <p className={style.DialogMessage}>
      Thank you for visiting our spacecraft!
    </p>
  </FancyBorder>
}

export default welcomeDialog;
