import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/mypage/css/mypage.css';
import profile_img from '../../resources/mypage/images/profile_img.jpg';

class MypageHome extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='container'>
                <div className='mypage-heading'>마이페이지 홈</div>
                <div className='mypage-sidebar'>
                    <div className='sidebar-wrapper'>
                        <div className='profile-container box'>
                            <div className='profile-img-wrapper'>
                                <img className ='profile-img' src={profile_img}/>
                            </div>
                            <div className='profile-info'>
                                Profile info will be here 
                            </div> 
                        </div>
                        <div className='item-container box'>
                            <div className='item'>
                                <Link to='/mypage/schedule'>My Schedule</Link>
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
                            <div className='item'>
                                <Link to='/mypage/info'>My Info</Link>
                            </div>
                        </div>            
                    </div>
                </div>
                <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            Mypage contents(body) will be here

                        </div>
                    </div>
                </div>         
            </div>
        );
    }
}


export default MypageHome;