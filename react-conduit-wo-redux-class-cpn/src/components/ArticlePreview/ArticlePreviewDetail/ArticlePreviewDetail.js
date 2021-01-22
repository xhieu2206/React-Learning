import React from "react";

import Tags from './Tags/Tags'

const articlePreviewDetail = (props) => {
  return (
    <a href="/" className="preview-link">
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <span>Read more...</span>
      <Tags tags={props.tags} />
    </a>
  );
};

export default articlePreviewDetail;
