import React, { useContext } from 'react';

import AuthContext from '../../context/authContext';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Comment from './Comment/Comment';

const CommentsSection = props => {
  const authContext = useContext(AuthContext);
  // console.log(props.comments)
  return (
    <Aux>
      {props.comments.map(cmt => (
        <Comment
          key={cmt.id}
          username={cmt.author.username}
          body={cmt.body}
          createdAt={cmt.createdAt}
          id={cmt.id}
          showDeleteButton={cmt.author.username === authContext.username}
          image={cmt.author.image}
          clicked={props.clicked}
        />
      ))}
    </Aux>
  )
}

export default CommentsSection;
