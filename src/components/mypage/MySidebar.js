import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

class Sidebar extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return( 
                <div className='mypage-sidebar'>
                    <div className='sidebar-wrapper'>
                        <div className='profile-container box'>
                            <div className='profile-img-wrapper'>
                                <img className ='profile-img' src={profile_img}/>
                            </div>
                            <div className='profile-info'>
                                <p>{this.props.users.nickname}</p>
                                <p>( {this.props.users.email} )</p>
                                <Link to='/mypage/info'>Profile Setting</Link>
                            </div> 
                        </div>
                        <div className='item-container box'>
                            <div className='item'>
                                <Link to='/mypage/calendar'>My Calendar</Link>
                            </div>
                            <div className='item'>
                                <Link to='/mypage/travel'>My Travel</Link>
                            </div>
                            <div className='item'>
                                <Link to='/mypage/wishlist'>My Wishlist</Link>
                            </div>
                            <div className='item'>
                                 <Link to='/mypage/history'>My History</Link>
                            </div>
                        </div>            
                    </div>
                </div>
        );
    }
}


export default Sidebar;