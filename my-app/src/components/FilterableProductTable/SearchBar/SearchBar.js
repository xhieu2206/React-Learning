import React from 'react';
import classes from './SearchBar.module.css';

const searchBar = props => {
  return (
    <div className={classes.Search}>
      <input
        type="text"
        name="term"
        placeholder="Search ..."
        value={props.term}
        onChange={props.changed}
      />
      <br />
      <input
        type="checkbox"
        name="isInStock"
        checked={props.isInStock}
        onChange={props.toggleCheckbox}
      />
      <label>Only show products in stock</label>
    </div>
  )
}

export default searchBar;
