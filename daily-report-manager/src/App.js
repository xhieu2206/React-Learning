import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';

const App = props => {
  return (
    <div className="App">
      <Layout>
        <Route path="/auth/signin" render={(props) => <h1>Login</h1>} />
        <Route path="/auth/signup" render={(props) => <h1>Register</h1>} />
      </Layout>
    </div>
  );
}

export default App;
