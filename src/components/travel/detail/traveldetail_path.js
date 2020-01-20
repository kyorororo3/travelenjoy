import React from 'react';

// Components
import TravelDestinationMap from './traveldetail_map';

class TravelPath extends React.Component {
  render() {
    const { path } = this.props
    return(
      <div className='travel-path-wrapper'>
        travel path
        {path.map( (des, i) => <TravelDestinationMap key={i} destination={des} />)}
      </div>
    )
  }
}

export default TravelPath;