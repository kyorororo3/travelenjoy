import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/guide/css/guideMain.css';

class GuideHeader extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className='guide-main-bar'>
                <div className='guide-main-name'>
                    [ {this.props.users.email} ] 가이드 님
                </div>
                <div className='guide-main-home'>
                  <Link to='/guide'>
                    <span><img className='guide-tour-home-img' src={require('../../resources/guide/images/house.png')} /></span>
                  </Link>
                </div>
            </div>
        )
    }
}

export default GuideHeader;