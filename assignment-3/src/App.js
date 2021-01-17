import React, { Component } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import './index.css';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
            <header>
            <nav>
              <ul>
                <li>
                  <NavLink activeClassName='active' to="/courses">Courses</NavLink>
                </li>
                <li>
                  <NavLink activeClassName='active' to="/users">Users</NavLink>
                </li>
              </ul>
            </nav>
          </header>
          <Switch>
            <Route
              path="/courses"
              component={Courses}
            />
            <Route
              path="/"
              exact
              component={Courses}
            />
            <Route
              path="/users"
              exact
              component={Users}
            />
            <Redirect from="/all-courses" to="/courses" />
            <Route render={() => <h1>Not Found Page</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
