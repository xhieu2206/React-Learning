import React from 'react';

const button = props => {
  const classesArr = ['btn', 'btn-lg'];
  const btnType = props.outline ? `btn-outline-${props.type}` : `btn-${props.type}`;
  const btnPosition = `pull-xs-${props.position}`;
  classesArr.push(...[btnType, btnPosition]);

  return (
    <button
      className={classesArr.join(' ')}
      onClick={(e) => props.clicked(e)}
    >
      {props.children}
    </button>
  )
}

export default button;
