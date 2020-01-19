import React from 'react';
import { NavLink } from 'react-router-dom';
import  '../../resources/common/css/header.css';


class Header extends React.Component {


  render() {
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
                                <li className='login-btn'><NavLink to='/login'><span>Login</span></NavLink></li>
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