import React, { Component } from 'react';
import * as utils from '../../../utils/Functions';

class MyReviewTableForm extends Component {
    
    constructor(props){
        super(props);

        this.reviewDetailHandler = this.reviewDetailHandler.bind(this);
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
                <span id='star'>{total_star}</span>
                <span id='title'>{title}</span>
                <span id='wdate'>{wdate}</span>
                {/* 어떤 투어에 대한 건지는 모달창이 나왔을 때 나오기로 그리고 그 url 바로 가기 만들기 */}
            </div>
        );
    }
}


export default MyReviewTableForm;