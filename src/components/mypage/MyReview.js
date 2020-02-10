import React, { Component } from 'react';


class MyReview extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            this is review

                        </div>
                    </div>
            </div>
        );
    }
}


export default MyReview;