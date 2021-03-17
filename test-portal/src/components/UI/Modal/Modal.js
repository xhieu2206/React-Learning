import React from 'react';
import classes from './Modal.module.css';

const Modal = props => {
  return (
    <div className={classes.Modal}>
      <div className={classes.ModalContent}>
        {props.messages.map((message, index) => <p key={index}>{message}</p>)}
      </div>
    </div>
  )
}

export default Modal;
