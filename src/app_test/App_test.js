import React from 'react';
import Header from './Header_test';
import Contents from './Contents_test';
import Footer from './Footer_test';

class AppTest extends React.Component {
  render() {
    return(
      <div className="app-wrapper">
        <Header></Header>
        <Contents></Contents>
        <Footer></Footer>
      </div>
    )
  }
}

export default AppTest;