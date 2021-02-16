import React from 'react';

import Tag from './Tag/Tag';

const tags = props => {
  return (
    <div className="col-md-3">
      <div className="sidebar">
        <div className="tag-list">
          {props.tags.map(tag => <Tag
            key={tag}
            tagName={tag}
            clicked={() => props.clicked(tag)}
          />)}
        </div>
      </div>
    </div>
  )
}

export default tags;
