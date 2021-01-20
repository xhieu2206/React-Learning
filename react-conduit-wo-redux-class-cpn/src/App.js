import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import Home from './containers/Home/Home';
import SignIn from './containers/Signin/SignIn';
import SignUp from './containers/SignUp/SignUp';

class App extends React.Component {
  state = {
    isLoggedIn: false,
    token: '',
    loggedInUser: {
      bio: '',
      username: '',
      email: '',
      id: '',
      image: '',
      createdAt: '',
      updatedAt: ''
    }
  }

  loggedInHandler = (user) => {
    const loggedInUser = {...user.user};
    delete loggedInUser["token"];
    this.setState({
      isLoggedIn: true,
      token: loggedInUser.token,
      loggedInUser: {...loggedInUser}
    });
  }

  render() {
    return (
      <div>
        <Layout isLoggedIn={this.state.isLoggedIn}>
          <Switch>
            <Route path="/signin" render={(props) => (<SignIn {...props} loggedIn={this.loggedInHandler} />)} />
            <Route path="/signup" render={(props) =>(<SignUp {...props} loggedIn={this.loggedInHandler}  />)} />
            <Route path="/users/:slug" render={() => <h1>User Detail Page</h1>} />
            <Route path="/articles/:slug" render={() => <h1>Article Detail Page</h1>} />
            <Route path="/" render={() => (<Home {...this.state} />)} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
