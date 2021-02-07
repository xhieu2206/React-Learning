import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';

class App extends React.Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default withRouter(App);
