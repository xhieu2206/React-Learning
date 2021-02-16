import React from 'react';
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

class ArticleDetailPage extends React.Component {
  state = {
    author: {},
    body: '',
    createdAt: '',
    description: '',
    favorited: false,
    favoritesCount: 0,
    slug: '',
    tagList: [],
    title: '',
    updatedAt: '',
    comments: [],
    commentForm: {
      body: '',
      errors: []
    }
  }

  async componentDidMount() {
    const article = new Article();
    const comment = new Comment();
    const slug = this.props.match.params.slug;
    const articleAwait = await article.getArticle(this.props.token, slug);
    const commentsAwait = await comment.getComments(this.props.token, slug);
    if (articleAwait.error === 'Not Found') {
      this.props.history.replace("/");
    } else {
      this.setState({
        author: {...articleAwait.article.author},
        body: articleAwait.article.body,
        createdAt: articleAwait.article.createdAt,
        description: articleAwait.article.description,
        favorited: articleAwait.article.favorited,
        favoritesCount: articleAwait.article.favoritesCount,
        slug: articleAwait.article.slug,
        tagList: [...articleAwait.article.tagList],
        title: articleAwait.article.title,
        updatedAt: articleAwait.article.updatedAt,
        comments: [...commentsAwait.comments]
      });
    }
  }

  addCommentHandler = async e => {
    e.preventDefault();
    const comment = new Comment();
    const commentAwait = await comment.addComment(this.props.token, this.state.slug, this.state.commentForm.body);

    if (commentAwait.errors) {
      const commentForm = {
        body: '',
        errors: [...errorTransform(commentAwait.errors)]
      }
      this.setState({
        commentForm: {...commentForm}
      });
    } else {
      const commentForm = {
        body: '',
        errors: []
      };
      let comments = [...this.state.comments];
      comments.unshift(commentAwait.comment);
      this.setState({
        commentForm: commentForm,
        comments: comments
      });
    }
  }

  deleteCommentHandler = async commentId => {
    const comment = new Comment();
    await comment.deleteComment(this.props.token, this.state.slug, commentId);
    const comments = [...this.state.comments];
    const deletedCommentIndex = comments.findIndex(cmt => cmt.id === commentId);
    comments.splice(deletedCommentIndex, 1);
    this.setState({
      comments: [...comments]
    });
  }

  followButtonClickedHandler = async _ => {
    if (!this.props.isLoggedIn) {
      this.props.history.push('/signin');
    } else {
      const type = this.state.author.following ? 'unfollow' : 'follow';
      const user = new User();
      const userAwait = await user.toggleFollowUser(this.props.token, type, this.state.author.username);
      const author = {...userAwait};
      this.setState({
        author: {...author}
      });
    }
  }

  favoritedButtonClickedHandler = async _ => {
    const article = new Article();
    const type = this.state.favorited ? "dislike" : "like";
    const articleAwait = await article.toggleFavoritedArticle(this.props.token, this.state.slug, type);
    this.setState({
      favoritesCount: articleAwait.favoritesCount,
      favorited: articleAwait.favorited
    });
  }

  deleteArticleButtonClcikedHandler = async _ => {
    const article = new Article();
    const deletedArticleAwait = await article.deleteArticle(this.props.token, this.state.slug);
    if (!deletedArticleAwait) {
      this.props.history.replace("/");
    }
  }

  render() {
    let buttons = (
      <Aux>
        <FollowToggleButton
          following={this.state.author.following}
          username={this.state.author.username}
          clicked={this.followButtonClickedHandler}/>
        &nbsp;&nbsp;
        <FavoritedToggleButton
          favorited={this.state.favorited}
          favoritesCount={this.state.favoritesCount}
          clicked={this.favoritedButtonClickedHandler} />
      </Aux>
    );
    if (this.props.username === this.state.author.username) {
      buttons = (
        <Aux>
          <EditArticleButton
            slug={this.state.slug}
          />&nbsp;&nbsp;
          <DeleteArticleButton
            clicked={this.deleteArticleButtonClcikedHandler}
          />
        </Aux>
      )
    }

    let commentForm = <p style={{ display: 'inherit' }}>
      <Link to="/signin">Sign in</Link> or <Link to="/signup">sign up</Link> to add comments on this article
    </p>
    let commentErrors = null;
    if (this.state.commentForm.errors.length > 0) {
      commentErrors = <ErrorMessages errors={this.state.commentForm.errors} />
    }
    if (this.props.isLoggedIn) {
      commentForm = (
        <Aux>
          {commentErrors}

          <CommentForm
            value={this.state.commentForm.body}
            changed={(e) => {
              let commentForm = {...this.state.commentForm};
              commentForm.body = e.target.value;
              this.setState({
                commentForm: {...commentForm}
              });
            }}
            clicked={this.addCommentHandler}
          />
        </Aux>
      )
    }

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{this.state.title}</h1>
            <div className="article-meta">
              <FeedAuthor
                image={this.state.author.image}
                author={this.state.author.username}
                createdAt={this.state.createdAt}
              />
              {buttons}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{this.state.body}</p>
              <Tags tags={this.state.tagList} />
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <FeedAuthor
                image={this.state.author.image}
                author={this.state.author.username}
                createdAt={this.state.createdAt}
              />
              {buttons}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {commentForm}

              <CommentsSection
                clicked={this.deleteCommentHandler}
                comments={this.state.comments}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    username: state.auth.user.username
  }
}

export default withRouter(connect(mapStateToProps, null)(ArticleDetailPage));
