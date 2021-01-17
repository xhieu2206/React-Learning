import React from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom'

import './Posts.css'; // chúng ta không dùng CSS module trong app này

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

class Posts extends React.Component {
	state = {
		posts: []
  }

	async componentDidMount() {
		// https://jsonplaceholder.typicode.com/posts
		try {
			const { data } = await axios.get('/posts');
			const posts = data.slice(0, 4);
			const updatedPosts = posts.map(post => {
				return {
					...post,
					author: 'Xuân Hiếu' // tạm thời hardcode giá trị của author
				}
      });
      this.setState({
        posts: updatedPosts
      });
		} catch(e) {
			console.log(e);
		}
	}

  postSelectedHandler = id => {
		this.props.history.push({
			pathname: '/posts/' + id
		});
	}

  render() {
    let posts;
		if (this.state.error) {
			posts = <p>Something went wrong!!!</p>
		} else {
			posts = this.state.posts.map(post => {
				return (
					<Post
						title={post.title}
						userId={post.author}
						clicked={() => this.postSelectedHandler(post.id)}
						key={post.id}
					/>
				);
			});
		};

    return(
			<div>
				<section className="Posts">
					{posts}
				</section>
				<Route path={this.props.match.url + '/:id'} exact component={FullPost} />
			</div>
    )
  }
}

export default Posts;
