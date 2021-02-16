import React from 'react';
import Aux from '../Auxiliary/Auxiliary';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Layout = props => {
  return (
    <Aux>
      <Header />
      {props.children}
      <Footer />
    </Aux>
  )
}

export default Layout;
