import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FeedItem from './FeedItem/FeedItem';

const FeedItems = props => {
  let items = [];
  if (props.location.pathname === '/' && props.isLoggedIn) {
    items.push(...['Your Feed', 'Global Feed']);
  } else if (props.location.pathname === '/' && !props.isLoggedIn) {
    items.push('Global Feed')
  } else if (props.match.path === '/users/:slug') {
    items = ['My Articles', 'Favorited Articles'];
  }
  if (props.tag) items.push(`#${props.tag}`);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {items.map((item, index) => <FeedItem
          key={item} name={item}
          active={props.activeIndex === index}
          clicked={() => props.clicked(item, index)}
        />)}
      </ul>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(FeedItems));
