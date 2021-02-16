import React from 'react';

const pagination = props => {
  const classesArr = ['page-item'];
  if (props.active) classesArr.push('active');
  return (
    <li
      className={classesArr.join(' ')}
      onClick={props.clicked}
    >
      <button className="page-link">{props.pageNumber}</button>
    </li>
  )
}

export default pagination;
