import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import  '../../resources/users/css/login.css';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: [],
      capsLock : false,
      userEmail : '',
      userPwd : ''
    }
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

  handleCapsLock = (event) => {
    event.preventDefault();
    let caps_lock = event.getModifierState('CapsLock');
   // console.log(caps_lock);
    if(caps_lock){
      this.setState({capsLock:true})
    }else{
      this.setState({capsLock:false})
    }
  }


  // 로그인하는 login메서드에 인자값을 넣어주는 곳
  handleSubmit = (event) => {
    event.preventDefault();
  //  console.log(event.target.email.value, event.target.pwd.value);
    let emailCheck = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
    if(event.target.email.value.trim() === ''){
      alert('이메일을 입력해 주세요!')
      document.getElementsByName('email')[0].focus();
    }else if(event.target.pwd.value.trim() === ''){
      alert('비밀번호를 입력해 주세요!')
      document.getElementsByName('pwd')[0].focus();
    }
    // else if(!emailCheck.test(event.target.email.value.trim())){      
    //     alert('이메일 형식을 지켜주세요');
    //     document.getElementsByName('email')[0].focus();
    // }
    else{
      this.login({
        email: event.target.email.value.trim(),
        pwd: event.target.pwd.value.trim()
      })
    }
  }

  // 서버로 로그인 요청
  login = (login_info) => {
   // console.log('App.js login() ' + JSON.stringify(login_info))
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
        alert('정확한 이메일과 비밀번호를 입력해주세요.');
        this.props.getLogin(false);
        document.getElementsByName('pwd')[0].value = '';
      }else{
        this.setState({ users : data });   
        this.props.getLogin(true);
      }
    })
  }



  render() {
    
    if(this.state.users.email !== undefined) {
      if(this.state.users.auth === 1){
        return <Redirect to='/guide' />
      }else{
        return <Redirect to='/' />
      }
    } 

    let CheckCapsLock = null;
    if(this.state.capsLock){
      CheckCapsLock = <div className='caps-lock-warning'>Caps Lock이 켜져있습니다.</div>
    }
    
    return(
      <div className='container'>
        <div className='login-wrapper'>
         <p className='login-logo'><Link to='/'>Travel <span>&</span>joy</Link></p>
          <div className='login-form'>
            <form onSubmit={this.handleSubmit}>
              <input type='text' className='login email' name='email' placeholder='이메일을 입력해주세요.' autoComplete='true'/>
              <input type='password' className='login pwd' name='pwd' placeholder='비밀번호를 입력해주세요.' autoComplete='true'
                  onKeyUp={this.handleCapsLock} />
              {CheckCapsLock}
              <input type='submit' className='login loginBtn' value='LOGIN'/>
            </form>           
          </div>
          <div className='account-text'>아직 Travel&Joy회원이 아니신가요?<Link className='accountLink' to='/account'>회원가입</Link></div>
          <div className='loginStragtegyBtns'>
            <a className='social-login facebook' href='http://localhost:3002/users/login/facebook'>
              <div className='facebook-icon'><i className="fab fa-facebook" /></div>&nbsp;&nbsp;페이스북 로그인
            </a>

            <a className='social-login kakao' href='http://localhost:3002/users/login/kakao'>
              <img className='kakao-icon' src={require('../../resources/users/images/kakao.png')} />&nbsp;&nbsp;카카오 로그인
            </a>

            <a className='social-login naver' href='http://localhost:3002/users/login/naver'>
              <img className='naver-icon' src={require('../../resources/users/images/naver.png')} />&nbsp;&nbsp;네이버 로그인
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;