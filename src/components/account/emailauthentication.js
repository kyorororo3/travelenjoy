import React from 'react';
import '../../resources/users/css/emailauth.css';

class EmailAuthentication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isSend : false
        }
    }

    getEmail = () => {
        let email = document.getElementsByName('email')[0].value.trim();
       // this.sendEmail({email:email});
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


    render(){ 
        return(
            <div className='container'>
                <p><button type='button' className='sendEmail-btn' onClick={this.getEmail}
                         disabled={this.props.isAble?false:true}><i className="far fa-envelope"/>&nbsp;인증번호 전송</button></p>
                <div id='afterSendEmail'>
                    <input type='text' className='input-authnumber' placeholder='인증번호를 입력하세요' />&nbsp;&nbsp;
                    <button type='button' className='tryAuth-btn'>확인</button>
                </div>
            </div>
        )
    }

}

export default EmailAuthentication;