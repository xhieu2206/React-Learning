import React from 'react';

import FeedAuthor from './FeedAuthor/FeedAuthor';
import LoveArticleButton from './LoveArticleButton/LoveArticleButton';
import ArticlePreviewDetail from './ArticlePreviewDetail/ArticlePreviewDetail';

const articlePreview = props => {
  return (
    <div className="article-preview">
      <div className="article-meta">
        <FeedAuthor
          image={props.image}
          author={props.author}
          createdAt={props.createdAt}
        />
        <LoveArticleButton
          favorited={props.favorited}
          favoritesCount={props.favoritesCount}
          clickedLoveButton={() => props.clickedLoveButton(props.favorited, props.slug)}
        />
      </div>
      <ArticlePreviewDetail
        title={props.title}
        description={props.description}
        tags={props.tags}
        slug={props.slug}
      />
    </div>
  )
}

export default articlePreview;
