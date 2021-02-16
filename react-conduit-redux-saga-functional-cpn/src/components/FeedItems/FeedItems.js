import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import FeedItem from './FeedItem/FeedItem';

class FeedItems extends React.Component {
  render() {
    let items = [];
    if (this.props.location.pathname === '/' && this.props.isLoggedIn) {
      items.push(...['Your Feed', 'Global Feed']);
    } else if (this.props.location.pathname === '/' && !this.props.isLoggedIn) {
      items.push('Global Feed')
    } else if (this.props.match.path === '/users/:slug') {
      items = ['My Articles', 'Favorited Articles'];
    }
    if (this.props.tag) items.push(`#${this.props.tag}`);

    return (
      <div className="feed-toggle">
        <ul className="nav nav-pills outline-active">
          {items.map((item, index) => <FeedItem
            key={item} name={item}
            active={this.props.activeIndex === index}
            clicked={() => this.props.clicked(item, index)}
          />)}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(FeedItems));
