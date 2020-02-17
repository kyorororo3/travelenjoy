import React, { Component } from 'react';

class MyMsgTableForm extends Component {
    
    constructor(props){
        super(props);

    }

    msgDetailHandler = (e) =>{this.props.callbackFromParent({showReadModal:true, review:this.props.review})}

    render(){

        const {msg} = this.props;

        return(
            <div className='msg-table-row' onClick={this.alertDetailHandler}>
                <span className='msg-icon'> </span>
                <span className='msg-content'>{msg.msg_content}</span>
                <span className='msg-reg-date'>{msg.msg_reg_date}</span>
            </div>
        );
    }
}


export default MyMsgTableForm;