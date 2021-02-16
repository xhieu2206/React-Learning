import React from 'react';

const loveArticleButton = props => {
  const classesArr = ['btn', `${props.favorited ? 'btn-primary' : 'btn-outline-primary'}`, 'btn-sm', 'pull-xs-right'];
  return (
    <button
      className={classesArr.join(' ')}
      onClick={props.clickedLoveButton}
    >
      <i className="ion-heart"></i> {props.favoritesCount}
    </button>
  )
}

export default loveArticleButton;
