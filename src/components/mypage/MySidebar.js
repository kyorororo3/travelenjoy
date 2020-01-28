import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MySidebar extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return( 
                <div className='mypage-sidebar'>
                    <div className='sidebar-wrapper'>
                        <div className='profile-container box'>
                            <div className='profile-img-wrapper'>
                                <img className ='profile-img' src={`../../uploads/${this.props.users.profile_img}`}/>
                            </div>
                            <div className='profile-info'>
                                <p>{this.props.users.nickname}</p>
                                <p>( {this.props.users.email} )</p>
                                <Link to={{
                                    pathname:'/mypage/info',
                                    state:{ users:this.props.users }
                                }}
                                className='settings'><i className="fas fa-cog"></i> Profile Setting</Link>
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
                                <Link to='/mypage/scrap'>My Scrap</Link>
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


export default MySidebar;