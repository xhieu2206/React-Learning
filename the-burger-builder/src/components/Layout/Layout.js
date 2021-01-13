import React from 'react';

// CSS
import classes from './Layout.css';

import Aux from '../../hoc/Auxiliary';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const layout = (props) => (
  <Aux>
    <div>
      <Toolbar />
    </div>
    <main className={classes.Content}>
      {props.children}
    </main>
  </Aux>
)

export default layout;
