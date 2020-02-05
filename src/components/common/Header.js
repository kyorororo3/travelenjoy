import React from 'react';
import { NavLink } from 'react-router-dom';
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
    });
  }

  render() {
    let isLogin = '';
    let mypage = '';
    if(this.props.isAuth){       
      isLogin = <li><NavLink exact to='/mypage' className='menu'>Mypage</NavLink></li>
      mypage = <li className='login-logout-btn'><NavLink exact to='/'><span onClick={this.handleLogout}>Logout</span></NavLink></li>
    }else{
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
                                <li><NavLink exact to='/' className='menu' activeClassName='active'>Home</NavLink></li>
                                <li><NavLink to='/travel' className='menu'>Travel</NavLink></li>
                                <li><NavLink to='/talk' className='menu'>Talk</NavLink></li>
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

export default Header;