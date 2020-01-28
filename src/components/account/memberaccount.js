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
      checkPwdFormat: '',
      input_pwd : '',
      checkPwdSame : '',
      checkNicknameFormat : '',
      checkNicknameDuplicate : '',
      input_phone : ''
    }
  }

  // 이메일 형식을 지켰는지 검사해주는 메서드
  handleCheckEmail = (event) => {
    event.preventDefault();
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
    //console.log(event.target.value.length);
    let pwdCheck = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,20}$/;
    if(pwdCheck.test(event.target.value)){
      this.setState({checkPwdFormat : true, input_pwd : event.target.value})
    }else if(!pwdCheck.test(event.target.value)){
      this.setState({checkPwdFormat : false})
    }
    if(event.target.value === ''){
      this.setState({checkPwdFormat : '', input_pwd : ''})
    }
  }

  // 비밀번호 일치하는지 
  handleCheckPwdSame = (event) => {
    event.preventDefault();
    let pwd = this.state.input_pwd;
    //console.log('handleCheckPwdSame ', pwd)
    if(event.target.value === pwd){
      this.setState({checkPwdSame : true})
    }else{
      this.setState({checkPwdSame : false})
    }
    if(event.target.value === ''){
      this.setState({checkPwdSame : ''});
    }
  }

  // 닉네임 형식확인
  handleCheckNickname = (event) => {
    event.preventDefault();
    let specialChars = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if(specialChars.test(event.target.value)){  // 특수문자가 포함된 경우
      this.setState({checkNicknameFormat : false});
    }else{
      this.setState({checkNicknameFormat : true});
      this.isDuplicate({nickname : event.target.value});
    }
    if(event.target.value === ''){
      this.setState({checkNicknameFormat : ''});
    }
  }

  // 휴대폰 번호 하이픈 제거
  handleCheckPhone = (event) => {
    event.preventDefault();
    let str = event.target.value;
    str = str.replace(/\-/g,'');
    this.setState({input_phone : str})
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

    // 필수입력 항목 입력 확인
    if(event.target.email.value === ''){
      alert('이메일을 입력해주세요!');
      document.getElementsByName('email')[0].focus();
    }else if(event.target.pwd.value === ''){
      alert('비밀번호를 입력해주세요!');
      document.getElementsByName('pwd')[0].focus();
    }else if(event.target.pwdcheck.value === ''){
      alert('비밀번호 재입력을 해주세요!');
      document.getElementsByName('pwdcheck')[0].focus();
    }else if(event.target.name.value === ''){
      alert('이름을 입력해주세요!');
      document.getElementsByName('name')[0].focus();
    }

    let necessary_field = false;
    if(this.state.checkEmailFormat && !this.state.checkNicknameDuplicate 
        && this.state.checkPwdFormat && this.state.checkPwdSame){     
      necessary_field = true;
    }else{
      necessary_field = false;
    }

    let unnecessary_field = false;
    if(event.target.nickname.value === '' || (event.target.nickname.value !== '' && !this.state.checkNicknameDuplicate && this.state.checkNicknameFormat)){
      console.log('unnecessary_field true');
      unnecessary_field = true;
    }else{
      unnecessary_field = false;
    }

    if(necessary_field && unnecessary_field){ // 입력 항목을 모두 형식에 맞게 입력한 경우
      console.log(this);
      const formData = new FormData();
      console.log('회원가입 가능 상태');
      formData.append('email',event.target.email.value);
      formData.append('pwd', event.target.pwd.value);
      formData.append('profile_img', event.target.profile_img.files[0]);
      formData.append('name', event.target.name.value);
      formData.append('nickname', event.target.nickname.value);
      formData.append('phone', event.target.phone.value);
      this.register(formData)
    }else{
      console.log(this);
      console.log('회원가입 불가');
    }
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
    // 이메일 형식, 중복 검사 화면 반영
    let emailChecking = null;
    if(this.state.checkEmailDuplicate){  // 이메일 중복인 경우
      emailChecking = <div className='emailCheck already'><i className="far fa-times-circle" />&nbsp;이미 사용 중인 이메일입니다.</div>
    }else if(this.state.checkEmailFormat && !this.state.checkEmailDuplicate){ // 이메일 형식을 지켰으며 중복이 아닌 경우
      emailChecking = <div className='emailCheck succ'><i className="far fa-check-circle" />&nbsp;사용 가능한 이메일입니다.</div>
    }else if(this.state.checkEmailFormat !== '' && !this.state.checkEmailFormat){ // 이메일 형식을 지키지 않은 경우
      emailChecking = <div className='emailCheck fail'><i className="far fa-times-circle" />&nbsp;정확한 이메일을 입력해주세요.</div>
    }

    // 비밀번호 형식
    let pwdChecking = null;
    let pwdStyle = null;
    if(this.state.checkPwdFormat){
      pwdStyle = {backgroundColor : '#e9f7f8'}
      pwdChecking = <span className='format-succ'><i className="far fa-check-circle" /></span>
    }else if(this.state.checkPwdFormat !== '' && !this.state.checkPwdFormat){
      pwdStyle = {backgroundColor : '#ffe8e8'}
      pwdChecking = <span className='format-fail'><i className="far fa-times-circle" /></span>
    }

    // 동일한 비밀번호 재입력 했는지
    let pwdSameChecking = null;
    let pwdSameStyle = null;
    if(this.state.checkPwdSame){
      pwdSameStyle = {backgroundColor : '#e9f7f8'}
      pwdSameChecking = <span className='format-succ'><i className="far fa-check-circle" /></span>
    }else if(this.state.checkPwdSame !== '' && !this.state.checkPwdSame){
      pwdSameStyle = {backgroundColor : '#ffe8e8'}
      pwdSameChecking = <span className='format-fail'><i className="far fa-times-circle" /></span>
    }

    // 닉네임 형식, 중복 검사 화면 반영
    let nicknameChecking = null;
    let nicknameStyle = null;
    if(this.state.checkNicknameFormat && !this.state.checkNicknameDuplicate){ // 닉네임 형식을 지켰으며 중복이 아닌 경우
      nicknameStyle = {backgroundColor : '#e9f7f8'}
      nicknameChecking = <span className='format-succ'><i className="far fa-check-circle" /></span>
    }else if(this.state.checkNicknameFormat !== '' && !this.state.checkNicknameFormat 
                          || this.state.checkNicknameDuplicate){  // 닉네임 형식을 지키지 않았거나 닉네임이 중복인 경우     
      nicknameStyle = {backgroundColor : '#ffe8e8'}
      nicknameChecking = <span className='format-fail'><i className="far fa-times-circle" /></span>
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
            {emailChecking}
            <p><input type='text' className='input_normal' name='email' placeholder='이메일을 입력해주세요.'
                onChange={this.handleCheckEmail} /></p>
            

            {pwdChecking}
            <p className='row-name'>비밀번호*</p>
            <p><input type='password' className='input_password' name='pwd' placeholder='영어, 숫자 조합 6~20자'
                onChange={this.handleCheckPassword} style={pwdStyle} /></p>

            {pwdSameChecking}
            <p className='row-name'>비밀번호 확인*</p>
            <p><input type='password' className='input_password' name='pwdcheck' placeholder='위와 동일한 비밀번호 입력'
                onChange={this.handleCheckPwdSame} style={pwdSameStyle} /></p>

            <p className='row-name'>이름*</p>
            <p><input type='text' className='input_normal' name='name' placeholder='이름을 입력해주세요.' maxLength='20'/></p>
            
            {nicknameChecking}
            <p className='row-name'>닉네임</p>
            <p><input type='text' className='input_normal' name='nickname' placeholder='닉네임을 입력해주세요.(특수문자 사용 불가)' 
                onChange={this.handleCheckNickname} style={nicknameStyle} maxLength='20'/></p>
            
            <p className='row-name'>휴대폰 번호</p>
            <p><input type='text' className='input_normal' name='phone' placeholder='-를 생략하여 입력해주세요.'
                value={this.state.input_phone} onChange={this.handleCheckPhone} maxLength='11'/></p>

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