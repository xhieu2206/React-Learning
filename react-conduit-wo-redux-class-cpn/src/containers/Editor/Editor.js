import React from 'react';

import AuthContext from '../../context/authContext';

import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import Button from '../../components/UI/Button/Button';

class Editor extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: []
  }

  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.props);
    if (!this.context.isLoggedIn) {
      this.props.history.push({
        pathname: '/signin'
      })
    } else {
      // TODO: load article detail and fill the form
    }
  }

  changedTagsHandler = e => {
    let value = e.target.value;
    while (value.search(/  /) > -1) {
      value = value.replace(/  /, ' ');
    }
    this.setState({
      tagList: [...value.split(' ')]
    });
  }

  submittedFormHandler = async (e) => {
    e.preventDefault();
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <form>
                <Input
                  type="text"
                  placeholder="Article Title"
                  value={this.state.title}
                  changed={(e) => { this.setState({ title: e.target.value }) }}
                />
                <Input
                  type="text"
                  placeholder="What's this article about?"
                  value={this.state.description}
                  changed={(e) => { this.setState({ description: e.target.value }) }}
                />
                <Textarea
                  placeholder="Write your article"
                  value={this.state.body}
                  changed={(e) => { this.setState({ body: e.target.body }) }}
                />
                <Input
                  type="text"
                  placeholder="Enter tags"
                  value={this.state.tagList.join(' ')}
                  changed={this.changedTagsHandler}
                />
                <Button
                  clicked={this.submittedFormHandler}
                  type="primary"
                  outline={false}
                  position="right"
                >Publish Article</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor;
