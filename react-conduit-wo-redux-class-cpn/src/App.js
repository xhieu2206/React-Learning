import React from 'react';
import { Route, Switch } from 'react-router-dom';

/* Auth Context */
import AuthContext from './context/authContext';

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

  loginHandler = (user) => {
    const loggedInUser = {...user.user};
    delete loggedInUser["token"];
    this.setState({
      isLoggedIn: true,
      token: user.user.token,
      loggedInUser: {...loggedInUser}
    });
  }

  render() {
    return (
      <div>
        <AuthContext.Provider
          value={
            {
              isLoggedIn: this.state.isLoggedIn,
              token: this.state.token,
              username: this.state.loggedInUser.username,
              email: this.state.loggedInUser.email,
              image: this.state.loggedInUser.image,
              bio: this.state.loggedInUser.bio,
              id: this.state.loggedInUser.id,
              login: this.loginHandler
            }
          }
        >
          <Layout>
            <Switch>
              <Route path="/signin" render={(props) => (<SignIn {...props} />)} />
              <Route path="/signup" render={(props) =>(<SignUp {...props} />)} />
              <Route path="/users/:slug" render={() => <h1>User Detail Page</h1>} />
              <Route path="/articles/:slug" render={() => <h1>Article Detail Page</h1>} />
              <Route path="/" render={(props) => (<Home {...props} />)} />
            </Switch>
          </Layout>
        </AuthContext.Provider>
      </div>
    );
  }
}

export default App;
