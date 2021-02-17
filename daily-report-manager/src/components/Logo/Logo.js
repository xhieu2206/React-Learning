import React from 'react';

import classes from './Logo.module.css';
import logoDisplay from '../../assets/images/2368px-FPT_Telecom_logo.svg.png';

const logo = props => (
  <div className={classes.Logo} style={{ height: '40px' }}>
    <img src={logoDisplay} alt="FPT"/>
  </div>
);

export default logo;
