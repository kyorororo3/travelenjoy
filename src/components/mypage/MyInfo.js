import React, { Component } from 'react';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

class MyInfo extends Component {

    constructor(props){
        super(props);

        this.state = {
            isExistNickname : ''
        }

        this.editInfoHanlder = this.editInfoHanlder.bind(this);
        this.saveEditedInfoHandler = this.saveEditedInfoHandler.bind(this);
        this.checkNicknameHandler = this.checkNicknameHandler.bind(this);
    }

    editInfoHanlder(e){
        e.preventDefault();
        let inputs = document.getElementsByClassName('editable');
        
        for (let index = 0; index < inputs.length; index++) {
            inputs[index].removeAttribute('readOnly');
        }
        
        document.getElementById('duplicate-check').style.display = 'block';
        document.getElementById('editBtn').style.display = 'none';
      
        document.getElementById('cancelBtn').style.display = 'inline-block';
        document.getElementById('saveBtn').style.display = 'inline-block';
        
    }

    saveEditedInfoHandler(e){
        e.preventDefault();

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
        .then (data => this.setState({
          isExistNickname:  data.isExistNickname
          
        })
        
        );
        if(this.state.isExistNickname === true){
            alert('이미 존재하는 닉네임입니다.');
        }else{
            alert('사용할 수 있는 닉네임입니다.');
        }

    }

    render(){
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                       <button id='editBtn' className='basic-btn' onClick={this.editInfoHanlder}>Edit</button>
                        
                        <div className='body-profile-info-container'>
                        <div className='profile-img-wrapper'>
                                <img className ='profile-img' src={profile_img}/>
                            </div>
                            <div className='profile-info'>
                                <p>{this.props.location.state.users.nickname}</p>
                            </div>
                        </div>
                        <div className='user-info-container'>
                            <form id='user-info-edit-form' action='/mypage/info/edit' encType='multipart/form-data'>
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
                                    <button id='saveBtn' className='update-group-btn' onClick={this.saveEditedInfoHandler}>SAVE</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default MyInfo;