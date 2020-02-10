import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

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
                                <Link to={{
                                    pathname:'/mypage/calendar',
                                    state:{ users:this.props.users }
                                }}>My Calendar</Link>
                            </div>
                            <div className='item'>
                                <Link to={{
                                    pathname:'/mypage/travel',
                                    state:{ users:this.props.users }
                                }}>My Travel</Link>
                            </div>
                            <div className='item'>
                                <Link to={{
                                    pathname:'/mypage/scrap',
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
    }
}


export default MySidebar;