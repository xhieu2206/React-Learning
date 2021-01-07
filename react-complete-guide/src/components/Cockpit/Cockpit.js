import React, { useEffect, useRef, useContext } from 'react';

import classesStyles from './Cockpit.css';
import AuthContext from '../../context/auth-context';

const cockpit = props => {
  const toggleBtnRef = useRef(null); // create a ref đến element
  const authContext = useContext(AuthContext); // React sẽ make connection behind the scenes

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    toggleBtnRef.current.click();

    return () => { // function này sẽ được run khi component bị removed, tương đương với hook componentWillUnmount của class-based component
      // clearTimeout(timer); // clear timeout để chỉ hiển thị alert khi render
      console.log('[Cockpit.js] cleanup work in useEffect');
    }
  }, []); // tricky để chỉ run khi render first time, vì không có item nào thay đổi giá trị.

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');

    return () => { // function này sẽ được run khi component bị removed, tương đương với hook componentWillUnmount của class-based component
      // clearTimeout(timer); // clear timeout để chỉ hiển thị alert khi render
      console.log('[Cockpit.js] 2nd cleanup work in useEffect');
    }
  });

  const classes = [];
  let btnClass = '';

  if (props.showPersons) {
    btnClass = classesStyles.Red;
  }

  if (props.personsLength <= 2) {
    classes.push(classesStyles.red); // red
  }
  if (props.personsLength <= 1) {
    classes.push(classesStyles.bold); // red & bold
  }

  return (
    <div className={classesStyles.Cockpit}>
      <h1>{props.title}</h1>
      <p className={classes.join(' ')}>It worked</p>
      <button
        ref={toggleBtnRef} // trỏ element đến ref item
        className={btnClass}
        onClick={props.clicked}
      >
        Toggle
      </button>

      <button onClick={authContext.login}>
        Login
      </button>
    </div>
  )
}

export default React.memo(cockpit);
