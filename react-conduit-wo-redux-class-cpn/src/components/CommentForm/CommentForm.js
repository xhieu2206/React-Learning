import React from 'react';

import { DEFAULTAVATAR } from '../../constants/URL';
import Button from '../UI/Button/Button';

const commentForm = props => {
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          row="3"
          value={props.value}
          onChange={(e) => props.changed(e)}
        ></textarea>
      </div>
      <div className="card-footer">
        <img className="comment-author-img" src={props.image ? props.image : DEFAULTAVATAR} alt={DEFAULTAVATAR} />
        <Button
          type="primary"
          clicked={props.clicked}
          outline={false}
        >Post Comment</Button>
      </div>
    </form>
  )
}

export default commentForm;
