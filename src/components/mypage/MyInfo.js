import React, { Component } from 'react';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

class MyInfo extends Component {

    constructor(props){
        super(props);

        this.editInfoHanlder = this.editInfoHanlder.bind(this);
    }

    editInfoHanlder(e){
        e.preventDefault();
        let inputs = document.getElementsByClassName('form-input-group');

        for (let index = 0; index < inputs.length; index++) {
            inputs[index].readOnly = false;
        }

        document.getElementById('editBtn').style.display = 'none';
        let cancelBtn = document.createElement('button');
        let saveBtn = document.createElement('button');

        let btn_wrapper = document.getElementById('btn-wrapper');

        cancelBtn.id = 'cancelBtn';
        cancelBtn.className = 'update-group-btn';
        cancelBtn.onClick='cancelEditedInfoHandler';
        cancelBtn.innerHTML = 'CANCEL';

        saveBtn.id = 'saveBtn';
        saveBtn.className = 'update-group-btn';
        cancelBtn.onClick='saveEditedInfoHandler';
        saveBtn.innerHTML = 'SAVE';

        btn_wrapper.appendChild(cancelBtn);
        btn_wrapper.appendChild(saveBtn);
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
                            <form id='user-info-edit-form' >
                                <div className='form-group'>
                                    <div className='info-title'>Name</div>
                                    <div className='input-wrapper'>
                                        <input className='form-input-group' readOnly type='text' name='name' value={this.props.location.state.users.name} />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='info-title'>Email</div>
                                    <div className='input-wrapper'>
                                        <input className='form-input-group' readOnly type='text' name='email' value={this.props.location.state.users.email} />
                                    </div>
                                </div>
                                <div className='form-group'>
                                    <div className='info-title'>Phone</div>
                                    <div className='input-wrapper'>
                                        <input className='form-input-group' readOnly type='text' name='phone' value={this.props.location.state.users.phone} />
                                    </div>
                                </div>

                                <div className='form-group' id='sns-wrapper'>
                                    <div className='info-title'>Linked SNS</div>
                                    <div className='input-wrapper'>
                                     {/* 없음, sns 계정 연결 되어 있음으로 표시하기 연동 버튼 따로 만들기  */}
                                    </div>
                                </div>
                                <div id='btn-wrapper'>

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