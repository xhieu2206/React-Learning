import React, { Component } from "react";
import axios from 'axios';

import "./FullPost.css";

class FullPost extends Component {
	state = {
		title: null,
		body: null,
		id: null
	}

	async componentDidMount() {
		const postId = this.props.match.params.id;
		// https://jsonplaceholder.typicode.com/posts/1
		if (postId) { // không cần check gì vì component được mount lại chứ không phải get updated
			const { data } = await axios.get(`/posts/${postId}`);
			this.setState({
				title: data.title,
				body: data.body,
				id: data.id
			});
		}
	}

	deletePostHandler = async () => {
		// DELETE https://jsonplaceholder.typicode.com/posts/${id}
		const {data} = await axios.delete(`/posts/${this.state.id}`);
		console.log(data);
	}

  render() {
    let post = <p style={{ textAlign: "center", color: 'red' }}>Please select a Post!</p>;
    if (this.props.match.params.id) {
			post = (
				<div className="FullPost">
					<h1>{this.state.title}</h1>
					<p>{this.state.body}</p>
					<div className="Edit">
						<button
							className="Delete"
							onClick={this.deletePostHandler}
						>
								Delete
						</button>
					</div>
				</div>
			);
		}
    return post;
  }
}

export default FullPost;
