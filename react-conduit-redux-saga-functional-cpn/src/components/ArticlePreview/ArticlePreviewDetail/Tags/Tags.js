import React from 'react';

const tags = props => {
  return (
    <ul className="tag-list">
      {props.tags.map(tag => <li key={tag} className="tag-default tag-pill tag-outline">
        {tag}
      </li>)}
    </ul>
  )
}
export default tags;
