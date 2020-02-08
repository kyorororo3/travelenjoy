import React from 'react';

import {dateToString} from '../../../utils/Functions';

class TravelReservationInfo extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoaded: false,
      tour_info: undefined,
      guide_info: undefined
    }
  }
  componentDidMount() {
    fetch(`http://localhost:3002/tour/detail?seq=${this.props.tour_seq}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          tour_info: data.tour_info
        }, () => {
          fetch(`http://localhost:3002/tour/detail/guide?email=${this.state.tour_info.email}`)
            .then(res => res.json())
            .then(data => {
              this.setState({
                isLoaded: true,
                guide_info: data
              })
            })
        })
      })
  }

  render() {
    const { selectedDays, person } = this.props;
    const {isLoaded, tour_info, guide_info} = this.state;

    return(
      
      <div className='travel-reservation-info panel-l'>
        <div className='tourdesc'>
          <div className='tourdesc-image'>
            {isLoaded && <img src={require(`../../../uploads/${tour_info.thumbnail}`)}/>}
          </div>
          <div className='tourdesc-title'>{isLoaded && tour_info.title}</div>
          <div className='tourdesc-guide'>
            <span className='profile-image'>{isLoaded && <img src={require(`../../../uploads/${guide_info.profile_img}`)}/>}</span>
            <span className='company-name'>{isLoaded && tour_info.companyname}</span>
          </div>
        </div>
        <div className='selected'>
          <div className='selected-date reservation-row'>
            <span className='label'>예약일</span>
            <span className='data'>
              {dateToString(selectedDays[0])}
            </span>
          </div>
          <div className='selected-people reservation-row'>
            <span className='label'>예약인원</span>
            <span className='data'>{person}명</span>
          </div>
        </div>
        <div className='price'>
          <div className='price-for-one reservation-row'>
            <span className='label'>1인당 가격</span>
            <span className='data'>₩{isLoaded && tour_info.price}</span>
          </div>
          <div className='total-price reservation-row' data-total_price={isLoaded && tour_info.price * person}>
            <span className='label'>전체 가격</span>
            <span className='data'>₩{isLoaded && tour_info.price * person}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReservationInfo;