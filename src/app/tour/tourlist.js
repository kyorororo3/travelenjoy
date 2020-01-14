import React from 'react';
import TourlistObj from './tourlist_obj';

class Tourlist extends React.Component {

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
       {isLoaded? list.map(tour => <TourlistObj key={tour.SEQ} tour={tour} />) : <h1>Loading....</h1>}
      </div>
    )
  }
}

export default Tourlist