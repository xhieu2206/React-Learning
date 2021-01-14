import React, { Component } from "react";
import axios from "axios";

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import "./Blog.css";

class Blog extends Component {
	state = {
		posts: [],
		selectedPostId: null,
		error: false
	}

	postSelectedHandler = id => {
		this.setState({
			selectedPostId: id
		});
	}

  async componentDidMount() {
		// https://jsonplaceholder.typicode.com/posts
		try {
			const { data } = await axios.get('/posts'); // throw error in here
			const posts = data.slice(0, 4);
			const updatedPosts = posts.map(post => {
				return {
					...post,
					author: 'Xuân Hiếu' // tạm thời hardcode giá trị của author
				}
			});
			this.setState({
				posts: updatedPosts,
				error: false
			});
		} catch(e) {
			this.setState({
				error: true
			});
		}
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
						key={post.id}
						clicked={() => this.postSelectedHandler(post.id)}
					/>
				);
			});
		};

    return (
      <div>
        <section className="Posts">
          {posts}
        </section>
        <section>
          <FullPost
						id={this.state.selectedPostId}
					/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
