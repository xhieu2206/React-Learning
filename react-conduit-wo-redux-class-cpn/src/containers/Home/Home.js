import React from 'react';

import Banner from '../../components/Banner/Banner';

class Home extends React.Component {
  state = {}

  render() {
    return (
      <div className="home-page">
        {!this.props.isLoggedIn ? <Banner /> : null}
      </div>
    )
  }
}

export default Home;
