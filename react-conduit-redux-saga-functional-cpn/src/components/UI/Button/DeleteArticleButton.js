import React from 'react';

const deleteArticleButton = props => {
  return (
    <button
      className="btn btn-outline-danger btn-sm"
      onClick={props.clicked}
    ><i className="ion-trash-a"></i>&nbsp;Delete Article
    </button>
  )
}

export default deleteArticleButton;
