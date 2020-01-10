import React from 'react';
import Login from './Login_test';
import Account from './Account_test';

class Contents extends React.Component {

  handleAccount = (mem_info) => {
    // console.log(mem_info);
    fetch('http://localhost:3002/api/account', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(mem_info)
    })
      .then(res => res.json())
      .then(obj => {
        if(obj.result === 'succ') {
          alert("회원가입이 완료되었습니다.");
          this.props.handleController('main');
        }
      });
  }

  render() {
    var index = this.props.controller;
    var component = null;

    if(index === 'main') component = null
    else if(index === 'login') component = <Login />
    else if(index === 'account') component = <Account handleAccount={this.handleAccount}/>

    return(
      <div className="contents-wrapper">
        <h1>Here is Contents</h1>
        {component}
      </div>
    )
  }
}

export default Contents;