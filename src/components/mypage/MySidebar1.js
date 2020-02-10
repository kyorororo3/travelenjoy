import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

const MySidebar = ({match}) =>(

    
    <div className='mypage-sidebar'>
        <div className='sidebar-wrapper'>
            <div className='profile-container box'>
                <div className='profile-img-wrapper'>
                    <img className ='profile-img' src='{`../../uploads/${this.props.users.profile_img}`}'/>
                </div>
                <div className='profile-info'>
                    <p>{match.params.user.nickname}</p>
                    <p>( {this.props.users.email} )</p>
                    <Link to={{
                        pathname:`${match.url}/info`,
                        state:{ users:this.props.users }
                    }}
                    className='settings'><i className="fas fa-cog"></i> Profile Setting</Link>
                </div> 
            </div>
            <div className='item-container box'>
                <div className='item'>
                    <Link to={{
                        pathname:`${match.url}/calendar`,
                        state:{ users:this.props.users }
                    }}>My Calendar</Link>
                </div>
                <div className='item'>
                    <Link to={{
                        pathname:`${match.url}/travel`,
                        state:{ users:this.props.users }
                    }}>My Travel</Link>
                </div>
                <div className='item'>
                    <Link to={{
                        pathname:`${match.url}/scrap`,
                        state:{ users:this.props.users }
                    }}>My Scrap</Link>
                </div>
                <div className='item'>
                    <Link to='/mypage/review'>My Review</Link>
                </div>
                <div className='item'>
                    <Link to='/mypage/talk'>My Talk</Link>
                </div>
            </div>            
        </div>
    </div>
);


export default MySidebar;