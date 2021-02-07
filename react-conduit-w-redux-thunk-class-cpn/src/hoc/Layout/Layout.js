import React from 'react';
import Aux from '../Auxiliary/Auxiliary';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

class Layout extends React.Component {
  render() {
    return (
      <Aux>
        <Header />
        {this.props.children}
        <Footer />
      </Aux>
    )
  }
}

export default Layout;
