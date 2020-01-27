import React from 'react';
import {Redirect} from 'react-router-dom';
import  '../../resources/users/css/account.css';

class Member_Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file : '',
      previewURL : '',
      signUpStatus : false,
      checkEmailFormat : '',
      checkEmailDuplicate : '',
      checkNicknameFormat : '',
      checkNicknameDuplicate : ''
    }
  }

  // 이메일 형식을 지켰는지 검사해주는 메서드
  handleCheckEmail = (event) => {
    event.preventDefault();
    // 이메일 형식 검사 정규식
    let emailCheck = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
   // console.log(event.target.value);
    if(emailCheck.test(event.target.value)){
      this.isDuplicate({email : event.target.value});
      this.setState({checkEmailFormat : true});
    }else{
      this.setState({checkEmailFormat : false});
    }

    if(event.target.value === ''){
      this.setState({checkEmailFormat : ''});
    }
  }

  // 이메일, 닉네임 중복확인
  isDuplicate = (input_data) => {
    fetch('http://localhost:3002/users/sign-up/duplicationCheck', {
      method:'post',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: JSON.stringify(input_data)
    })
    .then(res => res.json())
    .then(data => {
      if(data.emailCheck !== undefined){
        if(data.emailCheck === 'ok'){this.setState({checkEmailDuplicate : false});}
        else if(data.emailCheck === 'no'){this.setState({checkEmailDuplicate : true});}
      }else if(data.nicknameCheck !== undefined){
        if(data.nicknameCheck === 'ok'){this.setState({checkNicknameDuplicate : false});}
        else if(data.nicknameCheck === 'no'){this.setState({checkNicknameDuplicate : true});}
      }
    })
  }

  // 비밀번호 형식확인
  handleCheckPassword = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    
  }

  // 닉네임 형식확인
  handleCheckNickname = (event) => {
    event.preventDefault();
    let specialChars = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if(specialChars.test(event.target.value)){
      this.setState({checkNicknameFormat : false});
    }else{
      this.setState({checkNicknameFormat : true});
      this.isDuplicate({nickname : event.target.value});
    }

    if(event.target.value === ''){
      this.setState({checkNicknameFormat : ''});
    }
  }



  // 이미지 업로드 후 미리보기용 URL획득
  handleFileOnChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];   
    reader.onloadend = () => {
      this.setState({
        file : file,
        previewURL : reader.result
      })
    }
    reader.readAsDataURL(file);
  }

  // 회원가입 버튼 클릭 시 form에 입력받은 값들을 formData로 만들어주는 부분
  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('email',event.target.email.value);
    formData.append('pwd', event.target.pwd.value);
    formData.append('profile_img', event.target.profile_img.files[0]);
    formData.append('name', event.target.name.value);
    formData.append('nickname', event.target.nickname.value);
    formData.append('phone', event.target.phone.value);
    this.register(formData)
  }

  // 회원가입 내용 서버로 전송
  register = (regiInfo) => {
    fetch('http://localhost:3002/users/sign-up/member', {
      method:'post',
      body: regiInfo
    })
    .then(res => res.json())
    .then(data => {
      if(data.msg === 'success'){
        this.setState({signUpStatus : true});
        alert('회원가입 완료')    
      }     
    })
  }

  render() {
    let emailChecking = null;
    if(this.state.checkEmailDuplicate){  // 이메일 중복인 경우
      emailChecking = <div className='email-already'><i className="fas fa-exclamation-circle" />&nbsp;이미 사용 중인 이메일입니다.</div>
    }else if(this.state.checkEmailFormat && !this.state.checkEmailDuplicate){ // 이메일 형식을 지켰으며 중복이 아닌 경우
      emailChecking = <div className='email-succ'><i className="fas fa-check-circle" />&nbsp;사용 가능한 이메일입니다.</div>
    }else if(this.state.checkEmailFormat !== '' && !this.state.checkEmailFormat){ // 이메일 형식을 지키지 않은 경우
      emailChecking = <div className='email-fail'><i className="fas fa-exclamation-circle" />&nbsp;정확한 이메일을 입력해주세요.</div>
    }

    let nicknameChecking = null;
    let nicknameStyle = null;
    if(this.state.checkNicknameFormat && !this.state.checkNicknameDuplicate){
      nicknameStyle = {backgroundColor : '#e9f7f8'}
      nicknameChecking = <span className='nickname-succ'><i className="far fa-check-circle"></i></span>
    }else if(this.state.checkNicknameFormat !== '' && !this.state.checkNicknameFormat || this.state.checkNicknameDuplicate){
      nicknameStyle = {backgroundColor : '#ffe8e8'}
      nicknameChecking = <span className='nickname-fail'><i className="far fa-times-circle"></i></span>
    }

    // 회원가입이 완료되면 로그인 화면으로 redirect
    if(this.state.signUpStatus){
      return <Redirect to='/login' />
    }

    // 프로필 이미지 업로드 미리보기
    let profile_preview = null;
    if(this.state.file !== ''){
      profile_preview = <img className='profile_preview' src={this.state.previewURL}></img>
    }

    return(
      <div className="account-wrapper">
        <h1>SIGN UP</h1>
        <div className="account-form">
          <form name='accountFrm' onSubmit={this.handleSubmit} encType='multipart/form-data'>
            <p className='row-name'>이메일*</p>
            <p><input type='text' className='input_normal' name='email' placeholder='이메일을 입력해주세요.'
                onChange={this.handleCheckEmail} /></p>
            {emailChecking}

            <p className='row-name'>비밀번호*</p>
            <p><input type='password' className='input_password' name='pwd' placeholder='영어, 숫자 조합 6~20자' /></p>

            <p className='row-name'>비밀번호 확인*</p>
            <p><input type='password' className='input_password' name='pwdcheck' placeholder='위와 동일한 비밀번호 입력' /></p>

            <p className='row-name'>이름*</p>
            <p><input type='text' className='input_normal' name='name' placeholder='이름을 입력해주세요.' /></p>
            
            {nicknameChecking}
            <p className='row-name'>닉네임</p>
            <p><input type='text' className='input_normal' name='nickname' placeholder='닉네임을 입력해주세요.(특수문자 사용 불가)' 
                onChange={this.handleCheckNickname} style={nicknameStyle} maxLength='10'/></p>
            
            <p className='row-name'>휴대폰 번호</p>
            <p><input type='text' className='input_normal' name='phone' placeholder='-를 생략하여 입력해주세요.' /></p>

            <p className='row-name'>프로필 사진</p>
            <p><input type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img' onChange={this.handleFileOnChange} /></p>
            {profile_preview}
            <p><input type='submit' className='accountBtn' value='회원가입'></input></p>
          </form>

        </div>

      </div>
    )
  }
}

export default Member_Account;