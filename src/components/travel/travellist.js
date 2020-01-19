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
      <div className='container'>
        <div className='tour-search-wrapper'>
          <div className='main-text'>
            어디로 떠나고 싶으신가요?
          </div>
          <div className='tour-search-form-wrapper'>
            <form className='tour-search-form'>
              <input type='text' name='location' />
              <input className='btn-search' type='submit' value=''/>
            </form>
          </div>
        </div>
        <div className='tour-list-wrapper'>
        <h2>list component</h2>
          {isLoaded? list.map(tour => <TravelListObj key={tour.seq} tour={tour} />) : <h1>Loading....</h1>}
        </div>
      </div>
    )
  }
}

export default TravelList