import React, { Component } from "react";

class Course extends Component {
	state = {
		title: null,
		id: null
	}

	componentDidMount() {
		this.loadData();
	}

	componentDidUpdate() {
		this.loadData();
	}

	loadData() {
		const courseId = parseInt(this.props.match.params.id, 10);
		if (this.state.id !== courseId) {
			this.setState({
				title: this.props.match.params.title,
				id: courseId
			});
		}
	}

  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {this.state.id}</p>
      </div>
    );
  }
}

export default Course;
