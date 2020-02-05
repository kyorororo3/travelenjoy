import React from 'react';
import TravelDestinationMap from './traveldetail_des_map';

class TravelDestination extends React.Component {

  render() {
    const { seq, des_name, des_description, des_img, start_time, end_time} = this.props.destination;

    return(
      <div className='travel-destination-wrapper'>
        <div className='travel-destination-info'>
          <div className='course-mark'>
            <i className="fas fa-map-marker-alt"></i>
            <div className='line'></div>
          </div>
          <div className='info-text'>
            <div className='destination-name'>{des_name}</div>
            <div className='destination-time'>[{start_time}시 ~ {end_time}시]</div>
            <div className='destination-description'>{des_description}</div>
          </div>
          <div className='info-image'>
            des_img 자리임 
          </div>
        </div>
        <TravelDestinationMap destination={this.props.destination}/>
      </div>
    )
  }
}

export default TravelDestination;