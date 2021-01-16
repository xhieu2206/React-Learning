import React, { Component } from "react";
import { Route, NavLink } from 'react-router-dom';

import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

import "./Blog.css";

class Blog extends Component {
	render() {
		console.log(this.props)
		return (
      <div className="Blog">
				<header>
					<nav>
						<ul>
							<li>
								<NavLink
								to="/"
								activeClassName="my-active"
								activeStyle={{
									color: '#FA923F',
									textDecoration: 'underline'
								}}
								exact>
									Home
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
				<Route
					path="/" // tell react về path mà chúng ta muốn apply JSX ở render
					exact // xác nhận đây path phải exact với path attribute.
					component={Posts} // 1 reference đến function hoặc class mà chúng ta muốn render
				/>
				<Route
					path="/new-post" // tell react về path mà chúng ta muốn apply JSX ở render
					exact // xác nhận đây path phải exact với path attribute.
					component={NewPost} // 1 reference đến function hoặc class mà chúng ta muốn render
				/>
      </div>
    );
  }
}

export default Blog;
