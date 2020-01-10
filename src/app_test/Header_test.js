import React from 'react';

class Header extends React.Component {

  // LOGIN, JOIN 엉커태그 클릭 시 페이지 이동 없이 App의 상태값 변경
  handleAnchor = (e) => {
    e.preventDefault();
    this.props.handleController(e.target.dataset.controller);
  }

  render() {
    return(
      <div className="header-wrapper">
        <h1>Here is Header</h1>
        <div className='login_info'>
          <a href='/login' data-controller='login' onClick={this.handleAnchor}>LOGIN</a>
           | <a href='/account' data-controller='account' onClick={this.handleAnchor}>JOIN</a>
        </div>
      </div>
    )
  }
}

export default Header;