import React from 'react';
import { Link } from 'react-router-dom';

import { DEFAULTAVATAR } from '../../../constants/URL';
import { formatISOdate } from '../../../utils/DateUtil';

const comment = props => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{props.body}</p>
      </div>
      <div className="card-footer">
        <Link
          className="comment-author"
          to={"/users/" + props.username}
        >
          <img
            className="comment-author-img"
            src={props.image}
            alt={DEFAULTAVATAR}
          />&nbsp;
        </Link>
        &nbsp;
        <Link
          to={"/users/" + props.username}
          className="comment-author">
          {props.username}
        </Link>
        <span className="date-posted">{formatISOdate(props.createdAt)}</span>

        {props.showDeleteButton ?
          <span className="mod-options">
            <i
              onClick={() => props.clicked(props.id)}
              className="ion-trash-a"></i>
          </span>
        : null}
      </div>
    </div>
  )
}

export default comment;
