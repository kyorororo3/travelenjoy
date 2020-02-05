import React from 'react';
import { Link } from 'react-router-dom'
import '../../resources/users/css/account.css';

class Account extends React.Component {

  render() {
    return (
      <div className='container'>
        <div className='account-type-wrapper'>

          <p className='account-title'>회원가입 유형을 선택해주세요.</p>

          <div className='account-type-div'>
            <Link to='/account/member' className='account-type-Link'>
              <img className='account-type-img' src={require('../../resources/users/images/high-five.png')} />
              <div className='account-type-msg-wrapper'>
                <span className='account-type-msg-1'>Travel&Joy와 함께하세요!</span>
                <span className='account-type-msg-2'>일반회원 가입</span>
              </div>
            </Link>
          </div>

          <div className='account-type-div'>
            <Link to='/account/guide' className='account-type-Link'>
              <img className='account-type-img' src={require('../../resources/users/images/partnership.png')} />
              <div className='account-type-msg-wrapper'>
                <span className='account-type-msg-1'>Travel&Joy의 파트너가 되어보세요!</span>
                <span className='account-type-msg-2'>파트너회원 가입</span> 
              </div>                   
            </Link>
          </div>

        </div>
      </div>
    )
  }
}

export default Account;