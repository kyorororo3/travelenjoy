import React from 'react';

class TravelReservationComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reservation_info: undefined,
      isLoaded: false
    }
  }

  componentDidMount() {
    const {seq} = this.props.location.state;
    
    fetch(`http://localhost:3002/tour/reservation/info?seq=${seq}`)
      .then(res => res.json())
      .then(result => this.setState({
        reservation_info: result,
        isLoaded: true
      }))
  }

  render() {
    const {isLoaded, reservation_info} = this.state;
    
    return(
      <div className='container'>
        <div className='travel-reservation-complete-wrapper'>
          <div className='complete-title'>
            <img src={require('../../../resources/travel/images/correct.png')}/>
            <span>예약이 완료되었습니다!</span>
          </div>
          {isLoaded && 
            <div className='reservation-complete-info'>
              <div className='complete-row'><span>예약 번호</span> {reservation_info.reservation_number}</div>
              <div className='complete-row'><span>예약일</span> : {reservation_info.start_date}</div>
              <div className='complete-row'><span>예약 인원</span> : {reservation_info.join_people}</div>
              <div className='complete-row'><span>결제 금액</span> : {reservation_info.total_price}</div>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TravelReservationComplete;