import React, { Component } from 'react';
import * as utils from '../../../utils/Functions';
class MyCmtTableForm extends Component {
    
    constructor(props){
        super(props);

    }

    msgDetailHandler = (e) =>{this.props.callbackFromParent({showReadModal:true, review:this.props.review})}

    render(){

        const {cmt} = this.props;

        return(
            <div className='cmt-table-row' onClick={this.alertDetailHandler}>
                <span className='cmt-content'>{cmt.content}</span>
                <span className='cmt-reg-date'>{cmt.reg_date}</span>
            </div>
        );
    }
}


export default MyCmtTableForm;