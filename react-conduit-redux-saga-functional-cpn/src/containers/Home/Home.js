import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Article from '../../models/Article';

import Banner from '../../components/Banner/Banner';
import FeedItems from '../../components/FeedItems/FeedItems';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import Tags from '../../components/Tags/Tags';
import Tag from '../../models/Tag';
import Paginations from '../../components/UI/Paginations/Paginations';
import Spinner from '../../components/UI/Spinner/Spinner';

const Home= props => {
  const [loading, setLoading] = useState(true);
  const [feedIndex, setFeedIndex] = useState(0);
  const [currentTag, setCurrentTag] = useState('');
  const [tags, setTags] = useState([]);
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(async () => {
    const article = new Article();
    const tag = new Tag();
    let articlesAwait, tagsAwait;

    tagsAwait = await tag.getTags();
    if (props.isLoggedIn) {
      articlesAwait = await article.getFeedArticles(props.token, currentPage);
    } else {
      articlesAwait = await article.getArticles(props.token, '', '', '', currentPage);
    }
    setArticles([...articlesAwait.articles]);
    setTotalPage(Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length));
    setTags([...tagsAwait.tags]);
    setLoading(false);
  }, []);

  const clickedFeedItemHandler = async (feedName, index) => {
    const article = new Article();
    let articlesAwait;
    setLoading(true);
    if (feedName === 'Global Feed') {
      articlesAwait = await article.getArticles(props.token, '', '', '', 1);
    } else if (feedName === 'Your Feed') {
      articlesAwait = await article.getFeedArticles(props.token, 1);
    }
    setLoading(false);
    setFeedIndex(index);
    setCurrentTag('');
    setCurrentPage(1);
    setTotalPage(Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length));
    setArticles([...articlesAwait.articles]);
  }

  const clickedPageHandler = async (page) => {
    const article = new Article();
    let articlesAwait;
    setLoading(true);
    setCurrentPage(page);
    if (feedIndex === 0 && props.isLoggedIn) { // Your Feed
      articlesAwait = await article.getFeedArticles(props.token, currentPage);
    } else {
      articlesAwait = await article.getArticles(props.token, currentTag, '', '', currentPage)
    }
    setLoading(false);
    setArticles([...articlesAwait.articles]);
  }

  const clickedTagHandler = async (tag) => {
    const article = new Article();
    setLoading(true);
    setCurrentTag(tag);
    setCurrentPage(1);
    const articlesAwait = await article.getArticles(props.token, tag, '', '', currentPage);
    setLoading(false);
    setFeedIndex(props.isLoggedIn ? 2 : 1);
    setArticles([...articlesAwait.articles]);
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
      const updateArticles = [...articles];
      const articleIndex = updateArticles.findIndex(article => article.slug === slug);
      updateArticles[articleIndex].favorited = !articles[articleIndex].favorited;
      if (type === 'dislike') {
        updateArticles[articleIndex].favoritesCount += -1;
      } else {
        updateArticles[articleIndex].favoritesCount += 1;
      }
      await article.toggleFavoritedArticle(props.token, slug, type);
      setArticles(updateArticles);
    };
  }

  return (
    <div className="home-page">
      {!props.isLoggedIn ? <Banner /> : null}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedItems
              activeIndex={feedIndex}
              username={props.username}
              clicked={clickedFeedItemHandler}
              tag={currentTag}
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
          </div>

          <Tags
            tags={tags}
            clicked={clickedTagHandler}
          />

          {totalPage > 1 && !loading ? <Paginations
            totalPage={totalPage}
            currentPage={currentPage}
            clicked={clickedPageHandler}
          /> : null}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    username: state.auth.user.username
  }
}

export default withRouter(connect(mapStateToProps, null)(Home));
