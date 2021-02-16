import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { DEFAULTAVATAR } from '../../constants/URL';

import User from '../../models/User';
import Article from '../../models/Article';
import FollowToggleButton from '../../components/UI/Button/FollowToggleButton';
import SettingsProfileButton from '../../components/UI/Button/SettingsProfileButton';
import FeedItems from '../../components/FeedItems/FeedItems';
import Spinner from '../../components/UI/Spinner/Spinner';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import Paginations from '../../components/UI/Paginations/Paginations';

const ProfilePage = props => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [feedIndex, setFeedIndex] = useState(0);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const loadData = async _ => {
    const username = props.match.params.slug;
    const user = new User();
    const article = new Article();
    const userAwait = await user.getUser(props.token, username);
    if (userAwait.error && userAwait.error === 'Not Found') {
      props.history.replace('/');
    } else {
      const articlesAwait = await article.getArticles(props.token, '', userAwait.profile.username, '', currentPage);
      setLoading(false);
      setProfile({...userAwait.profile});
      setArticles([...articlesAwait.articles]);
      setTotalPage(Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length))
    }
  }

  useEffect(async () => {
    await loadData();
  }, [props.match.params.slug]);

  const followButtonClickedHandler = async () => {
    if (!props.isLoggedIn) {
      props.history.push('/signin');
    } else {
      const type = profile.following ? 'unfollow' : 'follow';
      const user = new User();
      const userAwait = await user.toggleFollowUser(props.token, type, profile.username);
      const updatedProfile = {...userAwait};
      setProfile({...updatedProfile});
    }
  }

  const editProfileButtonClickedHandler = _ => {
    props.history.push({
      pathname: '/settings'
    });
  }

  const clickedFeedItemHandler = async (feedName, index) => {
    const article = new Article();
    let articlesAwait;
    setLoading(true);
    if (feedName === 'My Articles') {
      articlesAwait = await article.getArticles(props.token, '', profile.username, '', 1);
    } else if (feedName === 'Favorited Articles') {
      articlesAwait = await article.getArticles(props.token, '', '', profile.username, 1);
    }
    setLoading(false);
    setFeedIndex(index);
    setArticles([...articlesAwait.articles]);
    setCurrentPage(1);
    setTotalPage(Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length));
  }

  const clickLoveArticleButtonHandler = async (favorited, slug) => {
    const type = favorited ? 'dislike' : 'like';
    if (!props.isLoggedIn) {
      props.history.push({
        pathname: '/signin'
      });
    } else {
      const article = new Article();
      const updatedArticles = [...articles];
      const articleIndex = articles.findIndex(article => article.slug === slug);
      updatedArticles[articleIndex].favorited = !updatedArticles[articleIndex].favorited;
      if (type === 'dislike') {
        updatedArticles[articleIndex].favoritesCount += -1;
      } else {
        updatedArticles[articleIndex].favoritesCount += 1;
      }
      await article.toggleFavoritedArticle(props.token, slug, type);
      setArticles(updatedArticles);
    };
  }

  const clickedPageItemHandler = async (page) => {
    const article = new Article();
    let articlesAwait;
    setLoading(true);
    setCurrentPage(page);
    if (feedIndex === 0) { // My Articles
      articlesAwait = await article.getArticles(props.token, '', profile.username, '', page);
    } else {
      articlesAwait = await article.getArticles(props.token, '', '', profile.username, page);
    }
    setLoading(false);
    setArticles([...articlesAwait.articles]);
  }

  let button = <FollowToggleButton
    following={profile.following}
    username={profile.username}
    clicked={followButtonClickedHandler}
  />
  if (profile.username === props.username) {
    button = <SettingsProfileButton clicked={editProfileButtonClickedHandler} />
  }

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <img src={profile.image ? profile.image : DEFAULTAVATAR} className="user-img" alt={DEFAULTAVATAR} />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              {button}
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <FeedItems
              activeIndex={feedIndex}
              username={props.username}
              clicked={clickedFeedItemHandler}
            />

            {loading ? <Spinner /> : null}

            {articles.length > 0 && !loading ? articles.map(article => {
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
                  clickedLoveButton={clickLoveArticleButtonHandler}
                />
              )
            }) : !loading ?
              <div className="article-preview"><p>No articles are here ... yet</p></div> :
              null
            }

            {totalPage > 1 && !loading ? <Paginations
              totalPage={totalPage}
              currentPage={currentPage}
              clicked={clickedPageItemHandler}
            /> : null}
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

export default connect(mapStateToProps)(ProfilePage);
