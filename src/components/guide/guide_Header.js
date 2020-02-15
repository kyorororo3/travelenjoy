import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../../resources/guide/css/guideMain.css';

class GuideHeader extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (
            <div className='guide-main-bar'>
                <div className='guide-mode'>
                    GUIDE MODE
                </div><br/>
                <div className='guide-main-info-bar'>
                    <div className='guide-main-name'>
                        <span className="guide-id-span">{this.props.users.email}</span> 님
                    </div>
                    <div className='guide-main-company'>
                        companmy is <span className="guide-id-span">{this.props.users.companyname}</span> 
                    </div>
                </div>
            </div>
        )
    }
}

export default GuideHeader;