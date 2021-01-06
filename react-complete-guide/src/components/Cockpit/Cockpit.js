import React, { useEffect } from 'react';

import classesStyles from './Cockpit.css';

const cockpit = props => {
  /*
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // HTTP request ...
    setTimeout(() => {
      alert('Saved data to cloud');
    }, 1000);
  }, [props.persons]); // chỉ được executed khi mà props.persons thay đổi. Giả sử khi chúng ta changed input hay delete một item ...
  */

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');

    // HTTP request ...
    setTimeout(() => {
      alert('Saved data to cloud in the first time rendered'); // fake
    }, 1000);

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
        className={btnClass}
        onClick={props.clicked}
      >
        Toggle
      </button>
    </div>
  )
}

export default React.memo(cockpit);
