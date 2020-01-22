import React from 'react';
import queryString from 'query-string';

class TravelCity extends React.Component {
  render() {
    const {category} = queryString.parse(this.props.location.search);

    return(
      <div className='travel-city-wrapper'>
        <div className='travel-city-banner'>
          <div className='trevel-city-banner-text'>
            {category}
          </div>
          <img src={require(`../../../resources/travel/images/banner/banner_${category}.jpg`)} />
        </div>
        <div className='container'>
          CONTAINER
        </div>
      </div>
    )
  }
}

export default TravelCity;