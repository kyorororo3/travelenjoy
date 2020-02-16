import React, { Component } from 'react';

class MyReviewTableForm extends Component {
    
    constructor(props){
        super(props);

    }

    msgDetailHandler = (e) =>{this.props.callbackFromParent({showReadModal:true, review:this.props.review})}

    render(){

        return(
            <div className='msg-table-row' onClick={this.alertDetailHandler}>
                <span class='msg-icon'> </span>
                <span class='msg-content'> </span>
                <span class='msg-reg-date'> </span>
            </div>
        );
    }
}


export default MyReviewTableForm;