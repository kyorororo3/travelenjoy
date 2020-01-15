import React from 'react';
import TravelListObj from './travellist_obj';

class TravelList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: null,
      isLoaded: false
    }
  }

  componentDidMount() {
    fetch('http://localhost:3002/tour/list')
      .then(res => res.json())
      .then(data => this.setState({
        list: data,
        isLoaded: true
        })
      );
  }

  render() {

    var { list, isLoaded } = this.state;
    
    return(
      <div className='tour-list-wrapper'>
       <h2>list component</h2>
       {isLoaded? list.map(tour => <TravelListObj key={tour.SEQ} tour={tour} />) : <h1>Loading....</h1>}
      </div>
    )
  }
}

export default TravelList