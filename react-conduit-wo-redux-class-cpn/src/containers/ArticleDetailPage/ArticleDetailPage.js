import React from 'react';
import { Link } from 'react-router-dom';

import { errorTransform } from '../../utils/ErrorTransform';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import AuthContext from '../../context/authContext';
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

  static contextType = AuthContext;

  async componentDidMount() {
    console.log(this.props);
    const article = new Article();
    const comment = new Comment();
    const slug = this.props.match.params.slug;
    const articleAwait = await article.getArticle(this.context.token, slug);
    const commentsAwait = await comment.getComments(this.context.token, slug);
    console.log(articleAwait, commentsAwait)
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
    const commentAwait = await comment.addComment(this.context.token, this.state.slug, this.state.commentForm.body);

    console.log(commentAwait)
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

  deleteCommentHandler = async (commentId) => {
    console.log(commentId);
  }

  render() {
    let buttons = (
      <Aux>
        <FollowToggleButton
          following={this.state.author.following}
          username={this.state.author.username}
          clicked={() => {}}/>
        &nbsp;&nbsp;
        <FavoritedToggleButton
          favorited={this.state.favorited}
          favoritesCount={this.state.favoritesCount}
          clicked={() => {}} />
      </Aux>
    );
    if (this.context.username === this.state.author.username) {
      buttons = (
        <Aux>
          <EditArticleButton
            slug={this.state.slug}
          />&nbsp;&nbsp;
          <DeleteArticleButton
            clicked={() => {}}
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
    if (this.context.isLoggedIn) {
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

export default ArticleDetailPage;
