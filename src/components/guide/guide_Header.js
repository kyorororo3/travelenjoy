import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfoPopup from './guide_info';
import '../../resources/guide/css/guideMain.css';


class GuideHeader extends Component {
    constructor(props){
        super(props);
        this.state={
            showPopup : false
        }
        this.InfoBtn = this.InfoBtn.bind(this);
    }

    InfoBtn = (e) =>{
        e.preventDefault();
        this.setState({
            showPopup: !this.state.showPopup
        })
    }
    
    render() {
        console.log("guide MainHeader render() ", this.props.users);
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
                        <div className='guide-main-info'>
                            <button className='guide-main-info-btn' onClick={this.InfoBtn}>Info</button>
                        </div>
                    </div>
                </div>
                {this.state.showPopup ? <InfoPopup closePopup={this.InfoBtn} guideInfo={this.props.users} /> : null}
            </div>
        )
    }
}

export default GuideHeader;