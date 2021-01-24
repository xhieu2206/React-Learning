import React from 'react';

import { DEFAULTAVATAR } from '../../constants/URL';

import AuthContext from '../../context/authContext';
import User from '../../models/User';
import Article from '../../models/Article';
import FollowToggleButton from '../../components/UI/Button/FollowToggleButton';
import SettingsProfileButton from '../../components/UI/Button/SettingsProfileButton';
import FeedItems from '../../components/FeedItems/FeedItems';
import Spinner from '../../components/UI/Spinner/Spinner';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import Paginations from '../../components/UI/Paginations/Paginations';

class ProfilePage extends React.Component {
  state = {
    profile: {},
    loading: true,
    feedIndex: 0,
    articles: [],
    currentPage: 1,
    totalPage: 0
  }

  static contextType = AuthContext;

  loadData = async _ => {
    const username = this.props.match.params.slug;
    const user = new User();
    const article = new Article();
    const userAwait = await user.getUser(this.context.token, username);
    if (userAwait.error && userAwait.error === 'Not Found') {
      this.props.history.replace('/');
    } else {
      const articlesAwait = await article.getArticles(this.context.token, '', userAwait.profile.username, '', this.state.currentPage);
      this.setState({
        loading: false,
        profile: {...userAwait.profile},
        articles: [...articlesAwait.articles],
        totalPage: Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length)
      });
    }
  }

  async componentDidMount() {
    this.loadData();
  }

  async componentDidUpdate() {
    if (this.props.match.params.slug !== this.state.profile.username) {
      this.loadData();
    }
  }

  followButtonClickedHandler = async _ => {
    if (!this.context.isLoggedIn) {
      this.props.history.push('/signin');
    } else {
      const type = this.state.profile.following ? 'unfollow' : 'follow';
      const user = new User();
      const userAwait = await user.toggleFollowUser(this.context.token, type, this.state.profile.username);
      const profile = {...userAwait};
      this.setState({
        profile: {...profile}
      });
    }
  }

  editProfileButtonClickedHandler = _ => {
    this.props.history.push({
      pathname: '/settings'
    });
  }

  clickedFeedItemHandler = async (feedName, index) => {
    const article = new Article();
    let articlesAwait;
    this.setState({
      loading: true
    });
    if (feedName === 'My Articles') {
      articlesAwait = await article.getArticles(this.context.token, '', this.state.profile.username, '', 1);
    } else if (feedName === 'Favorited Articles') {
      articlesAwait = await article.getArticles(this.context.token, '', '', this.state.profile.username, 1);
    }
    this.setState({
      loading: false,
      feedIndex: index,
      articles: [...articlesAwait.articles],
      currentPage: 1,
      totalPage: Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length),
    });
  }

  clickLoveArticleButtonHandler = async (favorited, slug) => {
    const type = favorited ? 'dislike' : 'like';
    if (!this.context.isLoggedIn) {
      this.props.history.push({
        pathname: '/signin'
      });
    } else {
      const article = new Article();
      const articles = [...this.state.articles];
      const articleIndex = articles.findIndex(article => article.slug === slug);
      articles[articleIndex].favorited = !articles[articleIndex].favorited;
      if (type === 'dislike') {
        articles[articleIndex].favoritesCount += -1;
      } else {
        articles[articleIndex].favoritesCount += 1;
      }
      await article.toggleFavoritedArticle(this.context.token, slug, type);
      this.setState({
        articles: [...articles]
      });
    };
  }

  clickedPageItemHandler = async (page) => {
    const article = new Article();
    let articlesAwait;
    this.setState({
      loading: true,
      currentPage: page,
    });
    if (this.state.feedIndex === 0) { // My Articles
      articlesAwait = await article.getArticles(this.context.token, '', this.state.profile.username, '', page);
    } else {
      articlesAwait = await article.getArticles(this.context.token, '', '', this.state.profile.username, page);
    }
    this.setState({
      loading: false,
      articles: [...articlesAwait.articles]
    });
  }

  render() {
    let button = <FollowToggleButton
      following={this.state.profile.following}
      username={this.state.profile.username}
      clicked={this.followButtonClickedHandler}
    />
    if (this.state.profile.username === this.context.username) {
      button = <SettingsProfileButton clicked={this.editProfileButtonClickedHandler} />
    }

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={this.state.profile.image} className="user-img" alt={DEFAULTAVATAR} />
                <h4>{this.state.profile.username}</h4>
                <p>{this.state.profile.bio}</p>
                {button}
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <FeedItems
                activeIndex={this.state.feedIndex}
                username={this.context.username}
                clicked={this.clickedFeedItemHandler}
              />

              {this.state.loading ? <Spinner /> : null}

              {this.state.articles.length > 0 && !this.state.loading ? this.state.articles.map(article => {
                return (
                  <ArticlePreview
                    key={article.slug}
                    slug={article.slug}
                    image={article.author.image}
                    author={article.author.username}
                    createdAt={article.createdAt}
                    favorited={article.favorited}
                    favoritesCount={article.favoritesCount}
                    title={article.title}
                    description={article.description}
                    tags={article.tagList}
                    clickedLoveButton={this.clickLoveArticleButtonHandler}
                  />
                )
              }) : !this.state.loading ?
                <div className="article-preview"><p>No articles are here ... yet</p></div> :
                null
              }

              {this.state.totalPage > 1 && !this.state.loading ? <Paginations
                totalPage={this.state.totalPage}
                currentPage={this.state.currentPage}
                clicked={this.clickedPageItemHandler}
              /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProfilePage;
