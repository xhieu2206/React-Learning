import React from "react";
import { Link } from 'react-router-dom';

import Tags from './Tags/Tags'

const articlePreviewDetail = props => {
  return (
    <Link
      to={"/articles/" + props.slug}
      className="preview-link"
    >
      <h1>{props.title}</h1>
      <p>{props.description}</p>
      <span>Read more...</span>
      <Tags tags={props.tags} />
    </Link>
  );
};

export default articlePreviewDetail;
