import React from 'react';
import { NavLink } from 'react-router-dom';

const navigationItem = props => {
  const classesArray = ['nav-link'];
  return (
	  <li className="nav-item">
	    <NavLink
        activeClassName='active'
        className={classesArray.join('')}
        exact
        to={{
          pathname: props.url
        }}
      >
        {props.image ? <img className="user-pic" src={props.image} alt={props.image} /> : null}
        {props.name}
      </NavLink>
    </li>
  )
}

export default navigationItem;
