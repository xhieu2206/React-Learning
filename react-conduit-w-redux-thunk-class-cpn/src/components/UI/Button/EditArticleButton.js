import React from 'react';
import { Link } from 'react-router-dom';

const editArticleButton = props => {
  return (
    <Link
      to={"/articles/" + props.slug + "/edit"}
      className="btn btn-outline-secondary btn-sm"
    ><i className="ion-edit"></i>&nbsp;Edit Article
    </Link>
  )
}

export default editArticleButton;
