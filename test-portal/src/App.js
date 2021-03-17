import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import * as authActions from './store/actions/auth';

import Layout from './hoc/Layout/Layout';
import ListPost from './screens/ListPost/ListPost';
import Editor from './screens/Editor/Editor';
import Auth from './screens/Auth/Auth';

const App = props => {
  const { onTryLogin } = props;

  React.useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('email')) {
      onTryLogin(localStorage.getItem('token'), localStorage.getItem('email'));
    }
  }, [onTryLogin]);

  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/auth/signup" component={Auth} />
          <Route path="/auth/login" component={Auth} />
          <Route path="/posts/new" component={Editor} />
          <Route path="/posts/:postId/edit" component={Editor} />
          <Route path="/posts" exact component={ListPost} />
          <Redirect to="/posts" />
        </Switch>
      </Layout>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onTryLogin: (token, email) => dispatch(authActions.tryLogin(token, email))
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
