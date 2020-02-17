import React, { Component } from 'react';
import * as utils from '../../../utils/Functions';

class MyReviewTableForm extends Component {
    
    constructor(props){
        super(props);

    }

    reviewDetailHandler = (e) =>{this.props.callbackFromParent({showReadModal:true, review:this.props.review})}
   
    render(){
        const {score, title, wdate} = this.props.review;

        let total_star = [];
        for(let i = 0 ; i < score ; i++){
           total_star.push(<img src={require('../../../resources/mypage/images/star-active.png')}/>);
        }
        for(let i = 0 ; i < 5-score ; i++){
            total_star.push(<img src={require('../../../resources/mypage/images/star-inactive.png')}/>);
        }
        

        return(
            <div className='review-table-row' onClick={this.reviewDetailHandler}>
                <span className='star'>{total_star}</span>
                <span className='thumb'>{title}</span>
                <span className='wdate'>{wdate}</span>
            </div>
        );
    }
}


export default MyReviewTableForm;