import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import profileImg from '../../resources/mypage/images/profile_img.jpg';


class MyInfo extends Component {

    constructor(props){
        super(props);

        this.state = {
            file:'',
            previewURL:'',
            isExistNickname : true,
            isUpdateSuccess : false
        }

        this.editInfoHanlder = this.editInfoHanlder.bind(this);
        this.saveEditedInfoHandler = this.saveEditedInfoHandler.bind(this);
        this.checkNicknameHandler = this.checkNicknameHandler.bind(this);
        this.profilePreviewHandler = this.profilePreviewHandler.bind(this);
    }

    editInfoHanlder(e){
        e.preventDefault();
        let inputs = document.getElementsByClassName('editable');
        
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].removeAttribute('readOnly');
        }
        document.getElementById('file-uploader-wrapper').style.display = 'inline-block';
        document.getElementById('duplicate-check').style.display = 'block';
        document.getElementById('editBtn').style.display = 'none';
      
        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.getElementById('saveBtn').style.display = 'inline-block';
        
    }

    saveEditedInfoHandler(e){
        e.preventDefault();
        if(this.state.isExistNickname){
            alert('닉네임 중복체크를 해주세요');
        }else{
           
           const formData = new FormData();
           formData.append('email',e.target.email.value);
           formData.append('profile_img',e.target.profile_img.files[0]);
           formData.append('nickname',e.target.nickname.value);
           formData.append('phone',e.target.phone.value);
            
            fetch('http://localhost:3002/mypage/info/updatemember',{
                method: 'POST',
                body: formData

            })
            .then(res => res.json())
            .then (data => {
                this.setState({
                    isUpdateSuccess: data.isUpdateSuccess
                }, () => {
                    if(this.state.isUpdateSuccess){
                        this.props.history.push({
                            pathname:'/mypage/info',
                            state:{users:this.props.location.state.users}
                        })
                    }
                })
            })
        }
        

    }

    checkNicknameHandler(e){
        e.preventDefault();
        const input_nickname = document.getElementsByName('nickname')[0].value;
        
        fetch('http://localhost:3002/mypage/info/nickname',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nickname: input_nickname })
        })
        .then(res => res.json())
        .then (data => {
         if(data.isExistNickname !== undefined){

             this.setState({
                isExistNickname:  data.isExistNickname
            }, () => {
                console.log(this.state.isExistNickname);
                if(this.state.isExistNickname === true){
                    alert('이미 존재하는 닉네임입니다.');
                }else{
                    alert('사용할 수 있는 닉네임입니다.');
                }
        
            })

         }
        });
       
    }

    profilePreviewHandler = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];   
        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result
          })
        }
        reader.readAsDataURL(file);
      }

    render(){
        
        
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                       <button id='editBtn' className='basic-btn' onClick={this.editInfoHanlder}>Edit</button>
                        
                        <form id='user-info-edit-form' onSubmit={this.saveEditedInfoHandler} encType='multipart/form-data'>
                            <div className='body-profile-info-container'>
                                <div className='profile-img-wrapper'>
                                    <img className ='profile-img'
                                     src={this.state.previewURL? this.state.previewURL : require(`../../uploads/${this.props.location.state.users.profile_img}`)}
                                     alt={profileImg}/>
                    
                                    <div id='file-uploader-wrapper'>
                                    <i className="fas fa-camera input-camera"></i>
                                    <input className='profile-uploader' type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='profile_img' onChange={this.profilePreviewHandler}/>
                                    </div>
                                </div>
                                <div className='profile-info'>
                                    <p>{this.props.location.state.users.nickname}</p>
                                </div>
                            </div>
                            <div className='user-info-container'>
                                    <div className='form-group'>
                                        <div className='info-title'>Email</div>
                                        <div className='input-wrapper'>
                                            <input className='form-input-group' readOnly type='text' name='email' defaultValue={this.props.location.state.users.email} />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='info-title'>Name</div>
                                        <div className='input-wrapper'>
                                            <input className='form-input-group ' readOnly type='text' name='name' defaultValue={this.props.location.state.users.name} />
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='info-title'>Nickname</div>
                                        <div className='input-wrapper'>
                                            <input className='form-input-group editable' readOnly  type='text' name='nickname' defaultValue={this.props.location.state.users.nickname} />
                                            <a id='duplicate-check' onClick={this.checkNicknameHandler}>duplicate check</a>
                                        </div>
                                    </div>
                                    <div className='form-group'>
                                        <div className='info-title'>Phone</div>
                                        <div className='input-wrapper'>
                                            <input className='form-input-group editable' readOnly type='text' name='phone' defaultValue={this.props.location.state.users.phone} />
                                        </div>
                                    </div>

                                    <div className='form-group' id='sns-wrapper'>
                                        <div className='info-title'>Linked SNS</div>
                                        <div className='input-wrapper'>
                                        {/* 없음, sns 계정 연결 되어 있음으로 표시하기 연동 버튼 따로 만들기  */}
                                        </div>
                                    </div>
                                    <div id='btn-wrapper'>
                                        <button id='cancelBtn' className='update-group-btn' onClick={this.cancelEditedInfoHander}>CANCEL</button>
                                        <input type='submit' id='saveBtn' className='update-group-btn' value='SAVE'/>
                                    </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}


export default MyInfo;