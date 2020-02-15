import React, { Component } from 'react';
import Popuplist from './guide_popupList';

class GuidePopup extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        const { tourMem } = this.props;
        return(
            <div className='popup'>
                <div className='popup_inner'>
                <img className='popup-close-btn' onClick={this.props.closePopup} src={require('../../resources/guide/images/close.png')} />
                <div className='popup-title'>참여 회원 목록</div>
                <table className='guide-popup-table'>
                    <thead>
                        <tr>
                            <th>예약회원</th>
                            <th>연락처</th>
                            <th>투어날짜</th>
                            <th>참여인원</th>
                            <th>총 가격</th>
                            <th>요구사항</th>
                        </tr>
                    </thead>

                    {tourMem.map((list,i) => <Popuplist key={i} list={list} />)}
                </table>
                                        
                </div>
            </div>
        )
    }
}

export default GuidePopup;