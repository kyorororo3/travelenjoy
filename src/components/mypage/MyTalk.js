import React, { Component } from 'react';
import MySearchForm from './UI/MySearchForm';
import RecommendTalk from '../common/RecommendTalk';


class MyTalk extends Component {

    constructor(props){
        super(props);
      
    }
    
    render(){
     
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                           <MySearchForm />
                           <div className='mypost-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Posts</p>
                                <div className='post-container'>
                           
                                </div>
                           </div>
                           <div className='mycomment-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Comments</p>
                                <div className='comment-container'>

                                </div>
                           </div>

                        </div>
                    </div>
            </div>
        );
    }
}


export default MyTalk;