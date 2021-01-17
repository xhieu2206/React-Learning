import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import Posts from './Posts/Posts';
import "./Blog.css";

// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
const AsyncNewPost = asyncComponent(() => {
	return import('./NewPost/NewPost');
});

class Blog extends Component {
	state = {
		auth: true
	}

	render() {
		return (
      <div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
								to="/posts"
								activeClassName="my-active"
								activeStyle={{
									color: '#FA923F',
									textDecoration: 'underline'
								}}
								exact>
									Posts
								</NavLink>
							</li>
							<li>
								<NavLink
								activeClassName="active"
								activeStyle={{
									textDecoration: 'underline'
								}}
								to={{
									pathname: '/new-post',
									hash: '#submit',
									search: '?quick-submit=true'
								}}>
									New Post
								</NavLink>
							</li>
						</ul>
					</nav>
				</header>
				<Switch>
					{this.state.auth ? <Route
						path="/new-post" // tell react về path mà chúng ta muốn apply JSX ở render
						component={AsyncNewPost} // async import component
					/> : null}
					<Route
						path="/posts" // tell react về path mà chúng ta muốn apply JSX ở render
						component={Posts} // 1 reference đến function hoặc class mà chúng ta muốn render
					/>
					{/* <Route render={() => <h1>Not Found Page</h1>} /> */}
					<Redirect from="/" to="/posts" />
				</Switch>
      </div>
    );
  }
}

export default Blog;
