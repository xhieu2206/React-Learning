import React, { Component } from "react";
import axios from 'axios';

import "./NewPost.css";

class NewPost extends Component {
  state = {
    title: "",
    content: "",
    author: "Xuân Hiếu"
  };

  postDataHandler = async () => {
		// POST https://jsonplaceholder.typicode.com/posts
		const post = {
			title: this.state.title,
			body: this.state.content,
			author: this.state.author
		}
    const {data} = await axios.post('/posts', post);
    // this.props.history.push('/posts');
    this.props.history.replace('/posts');
		console.log(data);
	};

  render() {
    return (
      <div className="NewPost">
        <h1>Add a Post</h1>
        <label>Title</label>
        <input
          type="text"
          value={this.state.title}
          onChange={(event) => this.setState({ title: event.target.value })}
        />
        <label>Content</label>
        <textarea
          rows="4"
          value={this.state.content}
          onChange={(event) => this.setState({ content: event.target.value })}
        />
        <label>Author</label>
        <select
          value={this.state.author}
          onChange={(event) => this.setState({ author: event.target.value })}
        >
          <option value="Xuân Hiếu">Xuân Hiếu</option>
          <option value="Max">Max</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;
