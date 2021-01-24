import React from 'react';
import { withRouter } from 'react-router-dom';

import AuthContext from '../../context/authContext';

import FeedItem from './FeedItem/FeedItem';

class FeedItems extends React.Component {
  static contextType = AuthContext;

  render() {
    let items = [];
    if (this.props.location.pathname === '/' && this.context.isLoggedIn) {
      items.push(...['Your Feed', 'Global Feed']);
    } else if (this.props.location.pathname === '/' && !this.context.isLoggedIn) {
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

export default withRouter(FeedItems);
