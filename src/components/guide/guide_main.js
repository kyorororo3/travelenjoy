import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import GuideHeader from './guide_Header';
import '../../resources/guide/css/guideMain.css';

class guideMain extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("guide Main render() ", this.props.users)
    return (
      <div className='container'>
        <GuideHeader users={this.props.users}/>
        <div className='guide-main-div'>
          <div className='guide-tour-btn1' style={{ cursor: 'pointer' }}>
            <img className='guide-tour-img' src={require('../../resources/guide/images/global.png')} />
            <Link to={{pathname: '/guide/make' , state: {users: this.props.users}}}>
              <label className='guide-tour-label' style={{ cursor: 'pointer' }}>투어 등록</label>
            </Link>
          </div>
          <div className='guide-tour-btn2' style={{ cursor: 'pointer' }}>
            <img className='guide-tour-img' src={require('../../resources/guide/images/list.png')} />
            <Link to={{pathname: '/guide/list', state: {users: this.props.users}}}>
              <label className='guide-tour-label' style={{ cursor: 'pointer' }}>투어 LIST</label>
            </Link>
          </div>
          <div className='guide-tour-btn3' style={{ cursor: 'pointer' }}>
            <img className='guide-tour-img' src={require('../../resources/guide/images/qa.png')} />
            <Link to={{pathname: '/guide/question', state: {users: this.props.users}}}>
              <label className='guide-tour-label' style={{ cursor: 'pointer' }}>투어 문의</label>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default guideMain;