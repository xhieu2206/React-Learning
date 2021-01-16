import React from "react";

import "./Post.css";

const post = (props) => {
  return (
    <article className="Post" onClick={props.clicked}>
      <h1>{props.title}</h1>
      <div className="Info">
        <div className="Author">{props.userId}</div>
      </div>
    </article>
  )
};

export default post;
