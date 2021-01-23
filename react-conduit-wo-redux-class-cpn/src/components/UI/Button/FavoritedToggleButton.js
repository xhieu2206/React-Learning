import React from 'react';

const favoritedToggleButton = props => {
  const classesArr = ['btn', `${props.favorited ? 'btn-primary' : 'btn-outline-primary'}`, 'btn-sm'];
  return (
    <button
      className={classesArr.join(' ')}
      onClick={props.clicked}
    >
      <i className="ion-heart"></i> {props.favorited ? 'Unfavorite Article ' : 'Favorite Article '} ({props.favoritesCount})
    </button>
  )
}

export default favoritedToggleButton;
