import React from 'react';

import authGuard from '../../hoc/AuthGuard/AuthGuard';
import AuthContext from '../../context/authContext';
import Article from '../../models/Article';
import { errorTransform } from '../../utils/ErrorTransform';

import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import Button from '../../components/UI/Button/Button';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';

class Editor extends React.Component {
  state = {
    title: '',
    description: '',
    body: '',
    tagList: [],
    errors: []
  }

  static contextType = AuthContext;

  componentDidMount() {
    if (this.props.location.pathname === '/articles/:slug/edit') {
      console.log('Editting article page')
    }
  }

  changedTagsHandler = e => {
    let value = e.target.value;
    while (value.search("  ") > -1) {
      value = value.replace("  ", ' ');
    }
    this.setState({
      tagList: [...value.split(' ')]
    });
  }

  submittedFormHandler = async (e) => {
    e.preventDefault();
    if (this.props.location.pathname === '/new-article') { // create new article
      const article = new Article();
      const articleAwait = await article.newArticle(this.context.token, this.state.title, this.state.description, this.state.body, this.state.tagList);
      if (articleAwait.errors) {
        this.setState({
          errors: [...errorTransform(articleAwait.errors)]
        });
      } else if (articleAwait.article) {
        this.props.history.replace({
          pathname: `/articles/${articleAwait.article.slug}`
        });
      }
    } else { // update a article

    }
  }

  render() {
    let errors = null;
    if (this.state.errors.length > 0) {
      errors = <ErrorMessages errors={this.state.errors} />
    }

    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {errors}

              <form onSubmit={this.submittedFormHandler}>
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
                  changed={(e) => { this.setState({ body: e.target.value }) }}
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

export default authGuard(Editor, true);
