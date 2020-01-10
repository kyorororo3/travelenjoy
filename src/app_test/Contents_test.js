import React from 'react';
import Login from './Login_test';
import Account from './Account_test';

class Contents extends React.Component {

  // 회원가입 정보를 node서버로 전달하는 메소드
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

  // 로그인 정보를 node서버로 전달하는 메소드
  handleLogin = (login_info) => {
    fetch('http://localhost:3002/api/login', {
      method: 'post',
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(login_info)
    })
      .then(res => res.json())
      .then(obj => {
        // console.log(obj);
        if(obj.NAME !== undefined) {
          alert("환영합니다! " + obj.NAME + "님!");

          // 세션에 저장해야되는데 세션을 아직 할줄 모름...ㅎ

          this.props.handleController('main');
        }else {
          alert("잘못된 이메일 또는 비밀번호입니다.");
        }
      });
  }

  render() {
    var index = this.props.controller;
    var component = null;

    if(index === 'main') component = null
    else if(index === 'login') component = <Login handleLogin={this.handleLogin}/>
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