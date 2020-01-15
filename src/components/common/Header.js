import React from 'react';
import { Link } from 'react-router-dom';
import  '../../resources/css/header.css';

class Header extends React.Component {


  render() {
    return(
      <div className="header-wrapper">
        {/* <div className='login_info'>
          <Link to='/login'>LOGIN</Link>
          <Link to='/account'>JOIN</Link>
        </div> */}
        <nav className='header-nav' role='navigation'>
            <div className='top-menu'>
                <div className='container'>
                    <div className='row'>
                        <div className='header-logo-wrapper'>
                            <div id='header-logo'> 
                                <Link to='/'>Travel <span>&</span>joy</Link>
                            </div>
                        </div>
                        <div className='menu-wrapper'>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><Link to='/travel'>Travel</Link></li>
                                <li><Link to='/talk'>Talk</Link></li>
                                <li className='login-btn'><Link to='/login'><span>Login</span></Link></li>
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