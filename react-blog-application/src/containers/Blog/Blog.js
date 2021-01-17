import React, { Component } from "react";
import { Route, NavLink, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import "./Blog.css";

class Blog extends Component {
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
					<Route
						path="/new-post" // tell react về path mà chúng ta muốn apply JSX ở render
						component={NewPost} // 1 reference đến function hoặc class mà chúng ta muốn render
					/>
					<Route
						path="/posts" // tell react về path mà chúng ta muốn apply JSX ở render
						component={Posts} // 1 reference đến function hoặc class mà chúng ta muốn render
					/>
				</Switch>
      </div>
    );
  }
}

export default Blog;
