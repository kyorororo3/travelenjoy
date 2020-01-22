import React from 'react';
import {Link} from 'react-router-dom'
import  '../../resources/users/css/account.css';

class Account extends React.Component {

  render() {
    return(
      <div className="account-wrapper">
        <Link to='/account/member'>일반회원</Link>
        <Link to='/account/guide'>가이드</Link>
      </div>
    )
  }
}

export default Account;