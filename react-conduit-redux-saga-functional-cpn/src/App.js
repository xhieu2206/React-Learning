import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions/index';

import Layout from './hoc/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import Home from './containers/Home/Home';
import Editor from './containers/Editor/Editor';
import ProfilePage from './containers/ProfilePage/ProfilePage';
import ArticleDetailPage from './containers/ArticleDetailPage/ArticleDetailPage';
import Settings from './containers/Settings/Settings';

class App extends Component {
  async componentDidMount() {
    await this.props.onTryToLogin();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/new-article" render={(props) => <Editor {...props} />} />
            <Route path="/articles/:slug/edit" render={(props) => (<Editor {...props} />)} />
            <Route path="/settings" component={Settings} />
            <Route path="/users/:slug" render={(props) => (<ProfilePage {...props} />)} />
            <Route path="/articles/:slug" component={ArticleDetailPage} />
            <Route path="/" exact component={Home} />
            <Redirect to="/" />
          </Switch>
        </Layout>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryToLogin: () => dispatch(actions.tryToLogin())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
