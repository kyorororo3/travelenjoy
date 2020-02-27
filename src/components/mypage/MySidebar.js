import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import profileImg from '../../resources/mypage/images/profile_img.jpg';


class MySidebar extends Component {

    constructor(props){
        super(props);
    }

    render(){
        const { profile_img, nickname, email} = this.props.users
        return( 
                <div className='mypage-sidebar'>
                    <div className='sidebar-wrapper'>
                        <div className='profile-container box'>
                            <div className='profile-img-wrapper'>
                                <img className ='profile-img' src={`../../uploads/${profile_img}`} alt={profileImg} />
                            </div>
                            <div className='profile-info'>
                                <p>{nickname}</p>
                                <p>( {email} )</p>
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
                                 <Link to={{
                                    pathname:'/mypage/review',
                                    state:{ users:this.props.users }
                                }}>My Review</Link>
                            </div>
                            <div className='item'>
                                 <Link to={{
                                    pathname:'/mypage/talk',
                                    state:{ users:this.props.users }
                                }}>My Talk</Link>
                            </div>
                        </div>            
                    </div>
                </div>
        );
    }
}


export default MySidebar;