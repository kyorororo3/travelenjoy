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
    return(
      <div className='travel-reservation-complete-wrapper container'>
        <div className='complete-title'>
          <img src={require('../../../resources/travel/images/correct.png')}/>
          <span>예약이 완료되었습니다!</span>
        </div>
      </div>
    )
  }
}

export default TravelReservationComplete;