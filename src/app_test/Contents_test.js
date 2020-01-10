import React from 'react';
import Login from './Login_test';
import Account from './Account_test';

class Contents extends React.Component {
  render() {
    var index = this.props.controller;
    var component = null;

    if(index === 'main') component = null
    else if(index === 'login') component = <Login />
    else if(index === 'account') component = <Account />

    return(
      <div className="contents-wrapper">
        <h1>Here is Contents</h1>
        {component}
      </div>
    )
  }
}

export default Contents;