import React from 'react';
import  '../../resources/users/css/account.css';

class Guide_Account extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : '',
            previewURL : ''
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
                <p><input type='text' className='input_normal' name='email' placeholder='이메일을 입력해주세요.'></input></p>
    
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