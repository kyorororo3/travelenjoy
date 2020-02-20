import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

import  '../../resources/common/css/header.css';


class Header extends React.Component {

  handleLogout = () => {
    fetch('http://localhost:3002/users/logout',{
      method: 'post',
      credentials: 'include'
    })
    .then(res => res.json())
    .then(data => {
      alert(data.msg);
      this.props.getLogout(false);
      window.location.reload();
      this.props.history.push('/');
    });
  }

  render() {
    let isLogin = '';
    let mypage = '';
    let home = '';
    let make = '';
    let talk ='';
    let travel ='';

    if (this.props.isAuth) { //로그인을 했을 때
      if (this.props.isGuide === 1) { //가이드인 경우의 메뉴 바
        home = <li><NavLink exact to='/guide' className='menu' activeClassName='active'>Home</NavLink></li>
        make = <li><NavLink to='/guide/make' className='menu'>Make</NavLink></li>
        mypage = <li className='login-logout-btn'><NavLink exact to='/'><span onClick={this.handleLogout}>Logout</span></NavLink></li>
        talk = <li><NavLink to='/guide/list' className='menu'>MyTour</NavLink></li>
        travel = <li><NavLink to='/guide/question' className='menu'>Q&A</NavLink></li>
      }//가이드가 아닌 경우의 메뉴 바
      else {
        home = <li><NavLink exact to='/' className='menu' activeClassName='active'>Home</NavLink></li>
        isLogin = <li><NavLink exact to='/mypage' className='menu'>Mypage</NavLink></li>
        mypage = <li className='login-logout-btn'><NavLink exact to='/'><span onClick={this.handleLogout}>Logout</span></NavLink></li>
        talk = <li><NavLink to='/talk' className='menu'>Talk</NavLink></li>
        travel = <li><NavLink to='/travel' className='menu'>Travel</NavLink></li>
      }
    }
    else { //로그아웃을 했을 때(기본 메뉴 바)
      home = <li><NavLink exact to='/' className='menu' activeClassName='active'>Home</NavLink></li>
      talk = <li><NavLink to='/talk' className='menu'>Talk</NavLink></li>
      travel = <li><NavLink to='/travel' className='menu'>Travel</NavLink></li>
      isLogin = <li className='login-logout-btn'><NavLink to='/login'><span>Login</span></NavLink></li>
    }
  

    return(
      
      <div className="header-wrapper">
        {/* <div className='login_info'>
          <NavLink to='/login'>LOGIN</NavLink>
          <NavLink to='/account'>JOIN</NavLink>
        </div> */}
        <nav className='header-nav' role='navigation'>
            <div className='top-menu'>
                <div className='container'>
                    <div className='row'>
                        <div className='header-logo-wrapper'>
                            <div id='header-logo'> 
                                <NavLink to='/'>Travel <span>&</span>joy</NavLink>
                            </div>
                        </div>
                        <div className='menu-wrapper'>
                            <ul>
                                {/* <li><NavLink exact to='/' className='menu' activeClassName='active'>Home</NavLink></li>
                                <li><NavLink to='/travel' className='menu'>Travel</NavLink></li>
                                <li><NavLink to='/talk' className='menu'>Talk</NavLink></li> */}
                                {home}
                                {make}
                                {travel}
                                {talk}
                                {/* <li><NavLink to='/mypage' className='menu'>Mypage</NavLink></li> */}
                                {/* <li className='login-btn'><NavLink to='/login'><span>Login</span></NavLink></li> */}
                                {isLogin}
                                {mypage}
                              
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>  
      </div>
    )
  }
}

export default withRouter(Header);