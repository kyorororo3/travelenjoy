import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import GuideHeader from './guide_Header';
import '../../resources/guide/css/guideMain.css';

class guideMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  //login info
  componentDidMount() {
    fetch('http://localhost:3002/users/getUser', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.email !== undefined)
          this.setState({ users: data })
      }
      );
  }

  render() {

    return (
      <div className='container'>
        <GuideHeader />
        <div className='guide-main-div'>
          <div className='guide-tour-btn1' style={{ cursor: 'pointer' }}>
            <img className='guide-tour-img' src={require('../../resources/guide/images/global.png')} />
            <Link to='/guide/make'>
              <label className='guide-tour-label' style={{ cursor: 'pointer' }}>투어 등록</label>
            </Link>
          </div>
          <div className='guide-tour-btn2' style={{ cursor: 'pointer' }}>
            <img className='guide-tour-img' src={require('../../resources/guide/images/list.png')} />
            <Link to={{pathname: '/guide/list', state: {users: this.state.users}}}>
              <label className='guide-tour-label' style={{ cursor: 'pointer' }}>투어 LIST</label>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default guideMain;