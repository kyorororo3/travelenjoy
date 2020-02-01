import React from 'react';

class TravelReservationComplete extends React.Component {
  render() {
    const {number} = this.props
    return(
      <div className='travel-reservation-complete-wrapper'>
        예약번호 : {number}
      </div>
    )
  }
}

export default TravelReservationComplete;