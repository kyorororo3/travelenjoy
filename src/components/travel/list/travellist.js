import React from 'react';

// Components
import TravelListObj from './travellist_obj';

class TravelList extends React.Component {
  render() {
    let{ travel_list, isLoaded } = this.props
    return(
      <div className='travel-list-wrapper'>
        <div className='sub-title-text'>
          Travel <span>&</span>Joy Guide Tour
        </div>
        {isLoaded? travel_list.map(tour => <TravelListObj key={tour.seq} tour={tour} />) : <h1>Loading....</h1>}
      </div>
    )
  }
}

export default TravelList