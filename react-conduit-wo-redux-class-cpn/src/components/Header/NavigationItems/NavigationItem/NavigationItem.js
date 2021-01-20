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
        {props.name}
      </NavLink>
    </li>
  )
}

export default navigationItem;
