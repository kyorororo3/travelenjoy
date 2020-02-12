import React from 'react';

class TravelReservationClient extends React.Component {
  render() {
    return(
      <div className='travel-client-info panel-m'>
        <div className='sub-title-text'>
          <i className="fas fa-user-check"></i> 예약자 정보
        </div>
        <div className='client-info-content'>
          <div className='label'>여행자 연락처</div>
          <div className='input-phone'>
            <input type='text' name='phone' onChange={this.props.handlePhoneChange} placeholder="'-'를 제외하고 입력해주세요"/>
          </div>
          <div className='help-message'>
            예약 관련 연락 시 사용될 번호이니 정확하게 입력해주세요.
          </div>
          <div className='label'>요구사항</div>
          <div className='input-require'>
            <textarea name='require' 
              onChange={this.props.handleRequireChange} 
              rows='2'
              placeholder='선택사항입니다.'></textarea>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReservationClient