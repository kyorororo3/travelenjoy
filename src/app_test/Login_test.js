import React from 'react';

class Login extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.handleLogin({
      email: e.target.email.value,
      pwd: e.target.pwd.value
    })
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