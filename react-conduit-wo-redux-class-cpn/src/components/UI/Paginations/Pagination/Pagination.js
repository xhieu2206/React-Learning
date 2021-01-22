import React from 'react';
import { Link } from 'react-router-dom';

const pagination = props => {
  const classesArr = ['page-item', 'ng-scope'];
  if (props.active) classesArr.push('active');
  return (
    <li
      className={classesArr.join(' ')}
      onClick={props.clicked}
    >
      <Link className="page-link" to="">{props.pageNumber}</Link>
    </li>
  )
}

export default pagination;
