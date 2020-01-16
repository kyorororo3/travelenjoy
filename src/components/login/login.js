import React from 'react';
import  '../../resources/css/login.css';

class Login extends React.Component {
    // state 초기값 설정
  constructor(props){
    super(props);
    this.state = {users: []}
  }

  componentDidMount() {
    fetch('http://localhost:3002/users/getUser')
      .then(res => res.json())
      .then(data => {
        if(data.EMAIL !== undefined)
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

  login = (login_info) => {
    console.log("App.js login() " + JSON.stringify(login_info))
    fetch('http://localhost:3002/users/login', {
      method: "post",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      credentials: 'same-origin',
      mode: 'cors',
      body: JSON.stringify(login_info)
    })
    .then(res => res.json())
    .then(data => {
      console.log("App.js login .then " , data);
      if(data.EMAIL === undefined){
        alert('login fail!');
      }
      this.setState({ users : data })    
    })
  }

  render() {
    return(
      <div className="login-wrapper">
        <h3>Login</h3>
        <div className="login-form">
        <div>{JSON.stringify(this.state.users)}</div>
          <form onSubmit={this.handleSubmit}>
            <p><input type='text' name='email' placeholder='EMAIL' autoComplete='true'/></p>
            <p><input type='password' name='pwd' placeholder='PASSWORD' autoComplete='true' /></p>
            <p><input type='submit' value='LOGIN'/></p>
          </form>
        </div>
      </div>
    )
  }
}

export default Login;