import React, { Component } from 'react';

class GuideInfo extends Component {
    constructor(props){
        super(props);     
    }

    render(){
        const {guideInfo} = this.props;
        return(
            <div className='guide-info-popup'>
                <div className='guide-info-popup_inner'>
                    <div>
                        <img className='guide-info-img' src={require(`../../uploads/${guideInfo.profile_img}`)} alt="no img"></img>
                    </div>
                    <div className='guide-info-all'>
                        <div className='guide-info-div'>
                            <div className='guide-info-title'>
                                Email
                            </div>
                            <div className='guide-info-val'>
                                {guideInfo.email}
                            </div>
                        </div>
                        <div className='guide-info-div'>
                            <div className='guide-info-title'>
                                Name
                            </div>
                            <div className='guide-info-val'>
                                {guideInfo.name}
                            </div>
                        </div>
                        <div className='guide-info-div'>
                            <div className='guide-info-title'>
                                Company
                            </div>
                            <div className='guide-info-val'>
                                {guideInfo.companyname}
                            </div>
                        </div>
                        <div className='guide-info-div'>
                            <div className='guide-info-title'>
                                Phone
                            </div>
                            <div className='guide-info-val'>
                                {guideInfo.phone}
                            </div>
                        </div>
                    </div>
                    <div className='guide-info-btn' onClick={this.props.closePopup}>                  
                        close
                    </div>
               </div>
            </div>

        )
    }

}

export default GuideInfo;