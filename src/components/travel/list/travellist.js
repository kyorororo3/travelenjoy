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

    fetch(`http://localhost:3002/tour/location?loc=${searched_location}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.isLoc) {
          alert('/city로 이동합니다.');
          this.props.history.push(`/travel/city?category=${searched_location}`);
        }else if(!data.isLoc) {
          alert('검색 결과 리스트를 갱신합니다.');
          fetch(`http://localhost:3002/tour/list?search=${searched_location}`)
            .then(res => res.json())
            .then(search_list => {
              this.setState({
                list: search_list
              })
            })
        }
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