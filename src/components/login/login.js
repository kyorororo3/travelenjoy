import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import  '../../resources/users/css/login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {users: []}
  }

  // componentDidMount() {
  //   fetch('http://localhost:3002/users/getUser',{
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if(data.email !== undefined)
  //         this.setState({users : data})
  //       }
  //     );
  // }


  // 로그인하는 login메서드에 인자값을 넣어주는 곳
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.email.value, event.target.pwd.value);
     this.login({
         email: event.target.email.value,
         pwd: event.target.pwd.value
     })
  }

  // 서버로 로그인 요청
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
        this.props.getLogin(false);
      }else{
        this.setState({ users : data });   
        this.props.getLogin(true);
      }
      
    })
  }

  render() {
    if(this.state.users.email !== undefined) {
      return <Redirect to='/' />
    } 
    
    return(
      <div className='container'>
        <div className='login-wrapper'>
         <p className='login-logo'><Link to='/'>Travel <span>&</span>joy</Link></p>
          <div className='login-form'>
            <form onSubmit={this.handleSubmit}>
              <p><input type='text' className='input_email' name='email' placeholder='이메일을 입력해주세요.' autoComplete='true'/></p>
              <p><input type='password' className='input_pwd' name='pwd' placeholder='비밀번호를 입력해주세요.' autoComplete='true' /></p>
              <p><input type='submit' className='loginBtn' value='LOGIN'/></p>
            </form>           
          </div>
          <div className='account-text'>아직 Travel&Joy회원이 아니신가요?<Link className='accountLink' to='/account'>회원가입</Link></div>
          <div className='loginStragtegyBtns'>
            <a className='facebookLogin' href='http://localhost:3002/users/login/facebook'>
              <div className='facebook-icon'><i className="fab fa-facebook" /></div>&nbsp;&nbsp;페이스북 로그인
            </a>

            <a className='kakaoLogin' href='http://localhost:3002/users/login/kakao'>
              <img className='kakao-icon' src={require('../../resources/users/css/images/kakao.png')} />&nbsp;&nbsp;카카오 로그인
            </a>

            <a className='naverLogin' href='http://localhost:3002/users/login/naver'>
              <img className='naver-icon' src={require('../../resources/users/css/images/naver.png')} />&nbsp;&nbsp;네이버 로그인
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;