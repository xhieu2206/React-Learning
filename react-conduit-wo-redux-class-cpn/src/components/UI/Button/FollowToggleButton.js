import React from 'react';

const followToggleButton = props => {
  // btn-outline-secondary
  const classesArr = ['btn', 'btn-sm', 'action-btn'];
  let text = 'Follow';
  if (!props.following) {
    classesArr.push('btn-outline-secondary');
  } else {
    classesArr.push('btn-secondary');
    text = 'Unfollow';
  }

  return (
    <button
      onClick={props.clicked}
      className={classesArr.join(' ')}
    >
      <i className="ion-plus-round"></i>&nbsp;
      {text} {props.username}
    </button>
  )
}

export default followToggleButton;
