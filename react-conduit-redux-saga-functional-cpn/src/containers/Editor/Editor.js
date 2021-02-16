import React, { useState, useEffect } from 'react';

import authGuard from '../../hoc/AuthGuard/AuthGuard';
import Article from '../../models/Article';
import { errorTransform } from '../../utils/ErrorTransform';

import Input from '../../components/UI/Input/Input';
import Textarea from '../../components/UI/Textarea/Textarea';
import Button from '../../components/UI/Button/Button';
import ErrorMessages from '../../components/ErrorMessages/ErrorMessages';
import { connect } from 'react-redux';

const Editor = props => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagList, setTagList] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(async () => {
    if (props.match.path === '/articles/:slug/edit') {
      const article = new Article();
      const articleAwait = await article.getArticle(props.token, props.match.params.slug);
      if (articleAwait.error || (articleAwait.article.author.username !== props.username)) {
        props.historty.replace('/');
      } else {
        setTitle(articleAwait.article.title);
        setDescription(articleAwait.article.description);
        setBody(articleAwait.article.body);
        setTagList([...articleAwait.article.tagList]);
      }
    }
  }, []);

  const changedTagsHandler = e => {
    let value = e.target.value;
    while (value.search("  ") > -1) {
      value = value.replace("  ", ' ');
    }
    setTagList([...value.split(' ')]);
  }

  const submittedFormHandler = async (e) => {
    e.preventDefault();
    const article = new Article();
    if (props.location.pathname === '/new-article') { // create new article
      const articleAwait = await article.newArticle(props.token, title, description, body, tagList);
      if (articleAwait.errors) {
        setErrors([...errorTransform(articleAwait.errors)]);
      } else if (articleAwait.article) {
        props.history.replace({
          pathname: `/articles/${articleAwait.article.slug}`
        });
      }
    } else { // update a article
      const slug = props.match.params.slug;
      const articleAwait = await article.updateArticle(props.token, slug, title, description, body, tagList);
      if (articleAwait.errors) {
        setErrors([...errorTransform(articleAwait.errors)]);
      } else if (articleAwait.article) {
        props.history.replace({
          pathname: `/articles/${articleAwait.article.slug}`
        });
      }
    }
  }

  let errorsDisplay = null;
  if (errors.length > 0) {
    errorsDisplay = <ErrorMessages errors={errors} />
  }

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errorsDisplay}

            <form onSubmit={submittedFormHandler}>
              <Input
                type="text"
                placeholder="Article Title"
                value={title}
                changed={(e) => { setTitle(e.target.value) }}
              />
              <Input
                type="text"
                placeholder="What's this article about?"
                value={description}
                changed={(e) => { setDescription(e.target.value) }}
              />
              <Textarea
                placeholder="Write your article"
                value={body}
                changed={(e) => { setBody(e.target.value) }}
              />
              <Input
                type="text"
                placeholder="Enter tags"
                value={tagList.join(' ')}
                changed={changedTagsHandler}
              />
              <Button
                clicked={submittedFormHandler}
                type="primary"
                outline={false}
                position="right"
              >Publish Article</Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn,
    token: state.auth.token,
    username: state.auth.user.username
  }
}

export default connect(mapStateToProps)(authGuard(Editor, true));
