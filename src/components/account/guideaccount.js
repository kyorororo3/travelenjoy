import React from 'react';
import  '../../resources/users/css/account.css';

import EmailAuthentication from '../account/emailauthentication';

class Guide_Account extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          file : '',
          previewURL : '',
          checkEmailFormat : '',
          checkEmailDuplicate : '',
          checkEmailAuth : ''
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
      }
    })
  }

  // 이메일 인증 마쳤는지
  isClearAuth = (result) => {
    this.setState({checkEmailAuth : result});
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

  handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log('회원가입 가능 상태');
    formData.append('email',event.target.email.value);
    formData.append('pwd', event.target.pwd.value);
    formData.append('name', event.target.name.value);
    formData.append('companyname', event.target.companyname.value);
    formData.append('brn', event.target.brn.value);
    formData.append('phone', event.target.phone.value);
    formData.append('profile_img', event.target.profile_img.files[0]);
    this.register(formData);
  }

  // 회원가입 내용 서버로 전송
  register = (regiInfo) => {
    fetch('http://localhost:3002/users/sign-up/guide', {
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

      let profile_preview = null;
      if(this.state.file !== ''){
        profile_preview = <img className='profile_preview' src={this.state.previewURL}></img>
      }
  
      return(
        <div className="account-wrapper">
          <h1>파트너 가입</h1>
          <div className="account-form">
            <form name='accountFrm' onSubmit={this.handleSubmit} encType='multipart/form-data'>
              <p className='row-name'>이메일*</p>
              {emailChecking}
              <p><input type='text' className='input_normal' name='email' placeholder='이메일을 입력해주세요.'
                  onChange={this.handleCheckEmail}/></p>

              <p className='row-name'>이메일 인증*</p>
              <EmailAuthentication 
                isAble={!this.state.checkEmailDuplicate && this.state.checkEmailFormat ? true:false}
                emailAuth={this.isClearAuth} />

              <p className='row-name'>비밀번호*</p>
              <p><input type='password' className='input_password' name='pwd' placeholder='영어, 숫자 조합 6~20자'></input></p>
  
              <p className='row-name'>비밀번호 확인*</p>
              <p><input type='password' className='input_password' name='pwdcheck' placeholder='위와 동일한 비밀번호 입력'></input></p>
  
              <p className='row-name'>대표자 성명*</p>
              <p><input type='text' className='input_normal' name='name' placeholder='이름을 입력해주세요.'></input></p>

              <p className='row-name'>상호명*</p>
              <p><input type='text' className='input_normal' name='companyname' placeholder='업체명을 입력해주세요.(중복불가)'></input></p>

              <p className='row-name'>사업자등록번호*</p>
              <p><input type='text' className='input_normal' name='brn' placeholder='사업자등록번호를 입력해주세요.'></input></p>
  
              <p className='row-name'>연락처</p>
              <p><input type='text' className='input_normal' name='phone' placeholder='-를 생략하여 입력해주세요.'></input></p>
  
              <p className='row-name'>프로필 사진</p>
              <p><input type='file' accept='image/jpg,image/png,image/jpeg,image/gif' name='profile_img' onChange={this.handleFileOnChange}></input></p>
              {profile_preview}
              <p><input type='submit' className='accountBtn' value='회원가입'></input></p>
            </form>
  
          </div>
  
        </div>
      )
    }
}

export default Guide_Account;