import React from 'react';

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();

    this.handleLogin({
      email: e.target.email.value,
      pwd: e.target.pwd.value
    })
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

          this.props.history.push('/'); // 홈으로 이동시켜준다!

        }else {
          alert("잘못된 이메일 또는 비밀번호입니다.");
        }
      });
  }

  render() {
    return(
      <div className="login-form-wrapper">
        <h3>Login</h3>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tbody>
              <tr>
                <th>이메일</th>
                <td><input type='text' name='email' /></td>
              </tr>
              <tr>
                <th>비밀번호</th>
                <td><input type='password' name='pwd' /></td>
              </tr>
              <tr>
                <td colSpan='2'><input type='submit'/></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default Login;