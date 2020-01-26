import React from 'react';
import {withRouter} from 'react-router-dom';

// css
import '../../../resources/travel/css/travelreservation.css';

// Component
import TravelReservationInfo from './travelreservation_tour';
import TravelReservationClient from './travelreservation_client';
import TravelReservationTos from './travelreservation_tos';

class TravelReservation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      phone: undefined,
      require: undefined
    }
  }

  handlePhoneChange = (e) => {
    const val = e.target.value;
    this.setState({
      phone: val
    })
  }

  handleRequireChange = (e) => {
    const val = e.target.value;
    this.setState({
      require: val
    })
  }

  handleClick = () => {
    const { tour_seq, selectedDays, person, email } = this.props.location.state;
    const { phone, require } = this.state;
    const total_price = document.getElementsByClassName('total-price')[0].dataset.total_price;
    alert(tour_seq + " " + selectedDays + " " + person + " " + email + " " + phone + " " + require + " " + total_price);
  }

  render() {
    const { tour_seq, selectedDays, person, email } = this.props.location.state;

    return(
      <div className='travel-reservation-wrapper'>
        <TravelReservationInfo selectedDays={selectedDays} person={person} tour_seq={tour_seq} />
        <TravelReservationClient handlePhoneChange={this.handlePhoneChange} handleRequireChange={this.handleRequireChange}/>
        <TravelReservationTos />
        <div className='travel-pay'>
          <button type='button' className='btn-l' onClick={this.handleClick}>결제하기</button>
        </div>
      </div>
    )
  }
}

export default withRouter(TravelReservation);