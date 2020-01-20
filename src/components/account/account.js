import React from 'react';
import  '../../resources/users/css/account.css';

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file : '',
      previewURL : ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(event.target.profile_img.files[0]);
    // console.log(event.target.length)
    // console.log(event.target[0].value)
    const formData = new FormData();
    formData.append('email',event.target.email.value);
    formData.append('pwd', event.target.pwd.value);
    formData.append('profile_img', event.target.profile_img.files[0]);
    formData.append('name', event.target.name.value);
    formData.append('nickname', event.target.nickname.value);
    formData.append('phone', event.target.phone.value);

    this.register(formData)

    // this.register({
    //   email : event.target.email.value,
    //   pwd : event.target.pwd.value,
    //   profile_img : event.target.profile_img.files[0],
    //   name : event.target.name.value,
    //   nickname : event.target.nickname.value,
    //   phone : event.target.phone.value
    // })
  }

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

  register = (regiInfo) => {

    fetch('http://localhost:3002/users/account', {
      method:'post',
      body: regiInfo
    })
    .then(res => res.json())
    .then(data => alert(data.msg))
  }

  render() {
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
            <p><input type='text' className='input_normal' name='email' placeholder='이메일을 입력해주세요.'></input></p>

            <p className='row-name'>비밀번호*</p>
            <p><input type='password' className='input_password' name='pwd' placeholder='영어, 숫자 조합 6~20자'></input></p>

            <p className='row-name'>비밀번호 확인*</p>
            <p><input type='password' className='input_password' name='pwdcheck' placeholder='위와 동일한 비밀번호 입력'></input></p>

            <p className='row-name'>이름*</p>
            <p><input type='text' className='input_normal' name='name' placeholder='이름을 입력해주세요.'></input></p>

            <p className='row-name'>닉네임</p>
            <p><input type='text' className='input_normal' name='nickname' placeholder='닉네임을 입력해주세요.(중복불가)'></input></p>

            <p className='row-name'>휴대폰 번호</p>
            <p><input type='text' className='input_normal' name='phone' placeholder='-를 생략하여 입력해주세요.'></input></p>

            <p className='row-name'>프로필 사진</p>
            <p><input type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img' onChange={this.handleFileOnChange}></input></p>
            {profile_preview}
            <p><input type='submit' className='accountBtn' value='회원가입'></input></p>
          </form>

        </div>

      </div>
    )
  }
}

export default Account;