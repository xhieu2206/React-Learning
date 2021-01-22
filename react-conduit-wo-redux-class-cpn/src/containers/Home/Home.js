import React from 'react';
import AuthContext from '../../context/authContext';

import Article from '../../models/Arcticle';

import Banner from '../../components/Banner/Banner';
import FeedItems from '../../components/FeedItems/FeedItems';
import ArticlePreview from '../../components/ArticlePreview/ArticlePreview';
import Tags from '../../components/Tags/Tags';
import Tag from '../../models/Tag';
import Paginations from '../../components/UI/Paginations/Paginations';
import Spinner from '../../components/UI/Spinner/Spinner';

class Home extends React.Component {
  state = {
    loading: true,
    feedIndex: 0,
    currentTag: '',
    tags: [],
    articles: [],
    currentPage: 1,
    totalPage: 0
  }

  static contextType = AuthContext;

  clickedFeedItemHandler = async (feedName, index) => {
    const article = new Article();
    let articlesAwait;
    this.setState({
      loading: true
    });
    if (feedName === 'Global Feed') {
      articlesAwait = await article.getArticles(this.context.token, '', '', '', 1);
    } else if (feedName === 'Your Feed') {
      articlesAwait = await article.getFeedArticles(this.context.token, 1);
    }
    this.setState({
      loading: false,
      feedIndex: index,
      currentTag: '',
      currentPage: 1,
      totalPage: Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length),
      articles: [...articlesAwait.articles]
    });
  }

  async componentDidMount() {
    const article = new Article();
    const tag = new Tag();
    let articlesAwait, tagsAwait;

    tagsAwait = await tag.getTags();
    if (this.context.isLoggedIn) {
      articlesAwait = await article.getFeedArticles(this.context.token, this.state.currentPage);
    } else {
      articlesAwait = await article.getArticles(this.context.token, '', '', '', this.state.currentPage);
    }
    this.setState({
      articles: [...articlesAwait.articles],
      totalPage: Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length),
      tags: [...tagsAwait.tags],
      loading: false
    });
  }

  clickedPageHandler = async (page) => {
    const article = new Article();
    let articlesAwait;
    this.setState({
      loading: true,
      currentPage: page,
    });
    if (this.state.feedIndex === 0 && this.context.isLoggedIn) { // Your Feed
      articlesAwait = await article.getFeedArticles(this.context.token, this.state.currentPage);
    } else {
      articlesAwait = await article.getArticles(this.context.token, this.state.currentTag, '', '', this.state.currentPage)
    }
    this.setState({
      loading: false,
      articles: [...articlesAwait.articles]
    });
  }

  clickedTagHandler = async (tag) => {
    const article = new Article();
    this.setState({
      loading: true,
      currentTag: tag,
      currentPage: 1,
    });
    const articlesAwait = await article.getArticles(this.context.token, tag, '', '', this.state.currentPage);
    this.setState({
      loading: false,
      feedIndex: 2,
      articles: [...articlesAwait.articles],
      totalPage: Math.ceil(articlesAwait.articlesCount / articlesAwait.articles.length)
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

  render() {
    return (
      <div className="home-page">
        <AuthContext.Consumer>
          {(context) => !context.isLoggedIn ? <Banner /> : null}
        </AuthContext.Consumer>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <FeedItems
                activeIndex={this.state.feedIndex}
                username={this.context.username}
                clicked={this.clickedFeedItemHandler}
                tag={this.state.currentTag}
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
            </div>

            <Tags
              tags={this.state.tags}
              clicked={this.clickedTagHandler}
            />

            {this.state.totalPage > 1 && !this.state.loading ? <Paginations
              totalPage={this.state.totalPage}
              currentPage={this.state.currentPage}
              clicked={this.clickedPageHandler}
            /> : null}
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
