import React from 'react';

const feedItem = props => {
  const clickHandler = e => {
    e.preventDefault();
    props.clicked()
  }

  const classesArr = ['nav-link'];
  if (props.active) classesArr.push('active');
  return (
    <li className="nav-item">
      <p
        className={classesArr.join(' ')}
        onClick={(e) => clickHandler(e)}>
          {props.name}
      </p>
    </li>
  )
}

export default feedItem;
