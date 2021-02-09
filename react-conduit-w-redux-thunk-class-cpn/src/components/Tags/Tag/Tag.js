import React from 'react';
import { Link } from 'react-router-dom'

const tag = props => {
  return (
    <Link
      to=""
      className="tag-pill tag-default"
      onClick={props.clicked}>
        {props.tagName}
    </Link>
  )
}

export default tag;
