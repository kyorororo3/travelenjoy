import React from 'react';
import {Link} from 'react-router-dom';
import  '../../resources/users/css/login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {users: []}
  }

  componentDidMount() {
    fetch('http://localhost:3002/users/getUser',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.email !== undefined)
          this.setState({users : data})
        }
      );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value, event.target.pwd.value);
     this.login({
         email: event.target.email.value,
         pwd: event.target.pwd.value
     })
  }

  handleFacebookLogin = (event) => {
    event.preventDefault();
    console.log('handleFacebookLogin실행');
    this.loginWithFacebook();
  }

  login = (login_info) => {
    console.log('App.js login() ' + JSON.stringify(login_info))
    fetch('http://localhost:3002/users/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      credentials: 'include',
      body: JSON.stringify(login_info)
    })
    .then(res => res.json())
    .then(data => {
      console.log('App.js login .then ' , data);
      if(data.email === undefined){
        alert('login fail!');
      }
      this.setState({ users : data })    
    })
  }

  render() {
    return(
      <div className='container'>
        <div className='login-wrapper'>
          <h1>LOGIN</h1>
          <div className='login-form'>
          <div>{JSON.stringify(this.state.users)}</div>
            <form onSubmit={this.handleSubmit}>
              <p><input type='text' className='input_email' name='email' placeholder='EMAIL' autoComplete='true'/></p>
              <p><input type='password' className='input_pwd' name='pwd' placeholder='PASSWORD' autoComplete='true' /></p>
              <p><input type='submit' className='loginBtn' value='LOGIN'/></p>
            </form>
            <Link  to='/account'>회원가입</Link>
          </div>
          <div className='loginStragtegyBtns'>
            <a className='facebookLogin' href='http://localhost:3002/users/login/facebook'>페이스북 로그인</a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;