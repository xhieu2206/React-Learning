import React, { useContext } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary/Auxiliary';
import Comment from './Comment/Comment';

const CommentsSection = props => {
  return (
    <Aux>
      {props.comments.map(cmt => (
        <Comment
          key={cmt.id}
          username={cmt.author.username}
          body={cmt.body}
          createdAt={cmt.createdAt}
          id={cmt.id}
          showDeleteButton={cmt.author.username === props.username}
          image={cmt.author.image}
          clicked={props.clicked}
        />
      ))}
    </Aux>
  )
}

const mapStateToProps = state => {
  return {
    username: state.auth.user.username
  }
}

export default connect(mapStateToProps, null)(CommentsSection);
