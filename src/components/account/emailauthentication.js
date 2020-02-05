import React from 'react';
import '../../resources/users/css/emailauth.css';

class EmailAuthentication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSend : false,
            checkCorrect : ''
        }
    }

    getEmail = () => {
        let email = document.getElementsByName('email')[0].value.trim();
        this.sendEmail({email:email});
        document.getElementById('afterSendEmail').style.display='block';
    }

    sendEmail = (email) => {
        fetch('http://localhost:3002/auth/emailAuth', {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(email)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.msg);
            if(data.msg === 'sucess'){
                this.setState({isSend : true});               
            }else{
                this.setState({isSend : false});
            }
        })
    }

    getInputNum = () => {
        let num = document.getElementsByName('input_number')[0].value.trim();
        this.isCorrect({authCode : num});
    }

    isCorrect = (authCode) => {
        fetch('http://localhost:3002/auth/emailAuth/check', {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(authCode)
        })
        .then(res => res.json())
        .then(data => {
            if(data.msg == 'ok'){
                this.setState({checkCorrect : true})
                document.getElementById('afterSendEmail').style.display='none';
                this.props.emailAuth(true);
            }else{
                this.setState({checkCorrect : false})
                this.props.emailAuth(false);
            }
        })
    }

    render(){ 
        let resultAuth = null;
        if(this.state.checkCorrect){
            resultAuth = <div className='authCode correct'><i className="far fa-check-circle"/>&nbsp;인증이 완료되었습니다.</div>
        }else if(this.state.checkCorrect !== '' && !this.state.checkCorrect){
            resultAuth = <div className='authCode incorrect'>인증번호가 일치하지 않습니다.</div>
        }
        return(
            <div className='container'>
                <p><button type='button' className='sendEmail-btn' onClick={this.getEmail}
                         disabled={this.props.isAble?false:true}><i className="far fa-envelope"/>&nbsp;인증번호 전송</button></p>
                <div id='afterSendEmail'>
                    <input type='text' className='input-authnumber' name='input_number' placeholder='인증번호를 입력하세요' />&nbsp;&nbsp;
                    <button type='button' className='tryAuth-btn' onClick={this.getInputNum}>확인</button>
                </div>
                {resultAuth}
            </div>
        )
    }

}

export default EmailAuthentication;