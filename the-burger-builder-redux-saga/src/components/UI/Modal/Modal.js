import React from 'react';

import classes from './Modal.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../Backdrop/Backdrop';

const modal = props => {
  return(
    <Aux>
      <Backdrop show={props.show} clicked={props.modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          display: props.show ? 'block' : 'none',
          transforrm: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }
      }>
        {props.children}
      </div>
    </Aux>
  )
}

export default React.memo(modal, (prevProps, nextProps) => nextProps.show === prevProps.show && nextProps.children === prevProps.children); // chỉ re-render nếu như có sự thay đổi, còn không thì giữ nguyên (return true thì memo lại, false thì re-render)
