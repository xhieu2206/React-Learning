import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { errorTransform } from '../../utils/ErrorTransform';
import Aux from '../../hoc/Auxiliary/Auxiliary';

import FeedAuthor from '../../components/ArticlePreview/FeedAuthor/FeedAuthor';
import DeleteArticleButton from '../../components/UI/Button/DeleteArticleButton';
import EditArticleButton from '../../components/UI/Button/EditArticleButton';
import FavoritedToggleButton from '../../components/UI/Button/FavoritedToggleButton';
import FollowToggleButton from '../../components/UI/Button/FollowToggleButton';
import Tags from '../../components/ArticlePreview/ArticlePreviewDetail/Tags/Tags';
import CommentForm from '../../components/CommentForm/CommentForm';
import CommentsSection from '../../components/CommentsSection/CommentsSection';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

import Article from '../../models/Article';
import Comment from '../../models/Comment';
import User from '../../models/User';

const ArticleDetailPage = props => {
  const [articleDetail, setArticleDetail] = useState({
    author: {},
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: ''
  });
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({
    body: '',
    errors: []
  });

  useEffect(async () => {
    const article = new Article();
    const comment = new Comment();
    const slug = props.match.params.slug;
    const articleAwait = await article.getArticle(props.token, slug);
    const commentsAwait = await comment.getComments(props.token, slug);
    if (articleAwait.error === 'Not Found') {
      props.history.replace("/");
    } else {
      setArticleDetail({
        author: {...articleAwait.article.author},
        body: articleAwait.article.body,
        createdAt: articleAwait.article.createdAt,
        description: articleAwait.article.description,
        favorited: articleAwait.article.favorited,
        favoritesCount: articleAwait.article.favoritesCount,
        slug: articleAwait.article.slug,
        tagList: [...articleAwait.article.tagList],
        title: articleAwait.article.title,
        updatedAt: articleAwait.article.updatedAt
      });
      setComments([...commentsAwait.comments]);
    }
  }, []);

  const addCommentHandler = async e => {
    e.preventDefault();
    const comment = new Comment();
    const commentAwait = await comment.addComment(props.token, articleDetail.slug, commentForm.body);

    if (commentAwait.errors) {
      setCommentForm({
        body: '',
        errors: [...errorTransform(commentAwait.errors)]
      });
    } else {
      setCommentForm({
        body: '',
        errors: []
      });
      let newComments = [...comments];
      newComments.unshift(commentAwait.comment);
      setComments(newComments);
    }
  }

  const deleteCommentHandler = async commentId => {
    const comment = new Comment();
    await comment.deleteComment(props.token, articleDetail.slug, commentId);
    const newComments = [...comments];
    const deletedCommentIndex = newComments.findIndex(cmt => cmt.id === commentId);
    newComments.splice(deletedCommentIndex, 1);
    setComments(newComments);
  }

  const followButtonClickedHandler = async _ => {
    if (!props.isLoggedIn) {
      props.history.push('/signin');
    } else {
      const type = articleDetail.author.following ? 'unfollow' : 'follow';
      const user = new User();
      const userAwait = await user.toggleFollowUser(props.token, type, articleDetail.author.username);
      const author = {...userAwait};
      setArticleDetail((prevArticleDetail) => {
        return {
          author: {...author},
          body: prevArticleDetail.body,
          createdAt: prevArticleDetail.createdAt,
          description: prevArticleDetail.description,
          favorited: prevArticleDetail.favorited,
          favoritesCount: prevArticleDetail.favoritesCount,
          slug: prevArticleDetail.slug,
          tagList: [...prevArticleDetail.tagList],
          title: prevArticleDetail.title,
          updatedAt: prevArticleDetail.updatedAt
        }
      });
    }
  }

  const favoritedButtonClickedHandler = async () => {
    const article = new Article();
    const type = articleDetail.favorited ? "dislike" : "like";
    const articleAwait = await article.toggleFavoritedArticle(props.token, articleDetail.slug, type);
    setArticleDetail((prevArticleDetail) => {
      return {
        ...prevArticleDetail,
        favoritesCount: articleAwait.favoritesCount,
        favorited: articleAwait.favorited,
      }
    });
  }

  const deleteArticleButtonClcikedHandler = async _ => {
    const article = new Article();
    const deletedArticleAwait = await article.deleteArticle(props.token, articleDetail.slug);
    if (!deletedArticleAwait) {
      props.history.replace("/");
    }
  }

  let buttons = (
    <Aux>
      <FollowToggleButton
        following={articleDetail.author.following}
        username={articleDetail.author.username}
        clicked={followButtonClickedHandler}/>
      &nbsp;&nbsp;
      <FavoritedToggleButton
        favorited={articleDetail.favorited}
        favoritesCount={articleDetail.favoritesCount}
        clicked={favoritedButtonClickedHandler} />
    </Aux>
  );
  if (props.username === articleDetail.author.username) {
    buttons = (
      <Aux>
        <EditArticleButton
          slug={articleDetail.slug}
        />&nbsp;&nbsp;
        <DeleteArticleButton
          clicked={deleteArticleButtonClcikedHandler}
        />
      </Aux>
    )
  }

  let form = <p style={{ display: 'inherit' }}>
    <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link> to add comments on this article
  </p>
  let commentErrors = null;
  if (commentForm.errors.length > 0) {
    commentErrors = <ErrorMessages errors={commentForm.errors} />
  }
  if (props.isLoggedIn) {
    form = (
      <Aux>
        {commentErrors}

        <CommentForm
          value={commentForm.body}
          changed={(e) => {
            const body = e.target.value;
            setCommentForm(prevCommentForm => {
              return {
                body: body,
                errors: [...prevCommentForm.errors]
              }
            });
          }}
          clicked={addCommentHandler}
        />
      </Aux>
    )
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{articleDetail.title}</h1>
          <div className="article-meta">
            <FeedAuthor
              image={articleDetail.author.image}
              author={articleDetail.author.username}
              createdAt={articleDetail.createdAt}
            />
            {buttons}
          </div>
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{articleDetail.body}</p>
            <Tags tags={articleDetail.tagList} />
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <FeedAuthor
              image={articleDetail.author.image}
              author={articleDetail.author.username}
              createdAt={articleDetail.createdAt}
            />
            {buttons}
          </div>
        </div>

        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            {form}

            <CommentsSection
              clicked={deleteCommentHandler}
              comments={comments}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    username: state.auth.user.username
  }
}

export default withRouter(connect(mapStateToProps, null)(ArticleDetailPage));
