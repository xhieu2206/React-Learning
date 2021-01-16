import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';

import Blog from './containers/Blog/Blog';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        {/* bây giờ chúng ta có thể sử dụng routing features ở bất cứ đâu bên trong BrowserRouter này. Các sub-components cũng vậy */}
        <div className="App">
          <Blog />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
