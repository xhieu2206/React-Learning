import React, { useState } from 'react';

import classes from './Sidedraw.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const Sidedraw = props => {
  const classArr = [classes.MobileOnly, classes.Sidedraw];
  const closeSideDraw = () => {
    props.closeSideDraw()
  }

  return (
    <React.Fragment>
      <Backdrop show={props.isShow} clicked={() => closeSideDraw()}/>
      { props.isShow ?
      <nav className={classArr.join(' ')} >
        <NavigationItems isAuthenticated={true} />
      </nav> : null }
    </React.Fragment>
  );
}

export default Sidedraw;
