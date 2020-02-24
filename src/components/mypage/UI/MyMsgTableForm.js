import React, { Component } from 'react';

class MyMsgTableForm extends Component {
    
    constructor(props){
        super(props);

        this.state={
            isRead:0
        }
    }

    msgDetailHandler = async(e) =>{
        if(this.props.msg.isread === 0){
            let result = window.confirm('this message will be automatically deleted within 3 days');
             if(result){
                 fetch(`http://localhost:3002/mypage/home/msg/update?seq=${this.props.msg.msg_seq}`)
                 .then(res => res.json())
                 await this.setState({isRead:1})
                 window.setTimeout(() => {this.deleteMsg()},2.592e+8);
             
             }
        }
    }

    deleteMsg = (e) =>{
        fetch(`http://localhost:3002/mypage/home/msg/delete?seq=${this.props.msg.msg_seq}`)
        .then(res => res.json())

    }
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props !== nextProps
    }

    render(){

        const {msg} = this.props;

        return(
            <div className='msg-table-row' onClick={this.msgDetailHandler}>
                <span className='msg-icon'>{msg.isread === 0? <i className="fas fa-envelope"></i>:<i className="far fa-envelope-open"></i> }</span>
                <span className={msg.isread === 0 ? 'msg-content bold': 'msg-content'}>{msg.msg_content}</span>
                <span className='msg-reg-date'>{msg.msg_reg_date}</span>
            </div>
        );
    }
}


export default MyMsgTableForm;