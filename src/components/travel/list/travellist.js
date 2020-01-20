import React from 'react';
import TravelListObj from './travellist_obj';

// CSS
import '../../../resources/travel/css/travellist.css';

// Components
import TravelSearch from './travellist_search';

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

  handleSearch = (e) => {
    e.preventDefault();
    const searched_location = e.target.location.value;
    // alert(searched_location);

    fetch(`http://localhost:3002/tour/list?search=${searched_location}`)
      .then(res => res.json())
      .then(search_list => {
        this.setState({
          list: search_list,
        })
      })
  }

  render() {
    var { list, isLoaded } = this.state;
    
    return(
      <div className='container'>
        <TravelSearch handleSearch={this.handleSearch}/>
        <div className='tour-list-wrapper'>
          {isLoaded? list.map(tour => <TravelListObj key={tour.seq} tour={tour} />) : <h1>Loading....</h1>}
        </div>
      </div>
    )
  }
}

export default TravelList