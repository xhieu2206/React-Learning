import React from 'react';
import { Switch, Route} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import SignUp from './containers/SignUp/SignUp';

const App = props => {
  return (
    <div className="App">
      <Layout>
        <Route path="/auth/signin" render={(props) => <h1>Login</h1>} />
        <Route path="/auth/signup" render={(props) => <SignUp {...props} />} />
      </Layout>
    </div>
  );
}

export default App;
