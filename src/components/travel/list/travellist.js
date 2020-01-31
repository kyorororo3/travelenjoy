import React from 'react';

// Components
import TravelListObj from './travellist_obj';

class TravelList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isFull: false,
      list: undefined,
      start: 1,
      end: 12,
      total: undefined
    }
  }
  
  handleMoreRead = () => {
    const {list, start, end, total} = this.state;
    fetch(`http://localhost:3002/tour/list?start=${start}&end=${end}`)
    .then(res => res.json())
    .then(data =>  {
      this.setState({
        list: list.concat(data),
        start: this.state.start + 12,
        end: this.state.end + 12
      });
    })
    // console.log(end);
    if(total <= end) {
      this.setState({
        isFull: true
      })
    }
  }

  componentDidMount() {
    const {start, end} = this.state;
    fetch(`http://localhost:3002/tour/list?start=${start}&end=${end}`)
    .then(res => res.json())
    .then(data => this.setState({
        list: data,
        isLoaded: true
      })
    );

    fetch(`http://localhost:3002/tour/list/length`)
      .then(res => res.json())
      .then(data => this.setState({
        total: data.length
      }));

    this.setState({
      start: start + 12,
      end: end + 12
    })
  }

  // componentWillUpdate(nextProps, nextState){
  //   const {end, total} = nextState;
  //   console.log("componentWillUpdate: " + end + " " + total);

  //   if(total <= end-12) {
  //     this.setState({
  //       isFull: true
  //     })
  //   }
  // }

  render() {
    let { list, isLoaded, isFull } = this.state


    return(
      <div className='travel-list-wrapper'>
        <div className='sub-title-text'>
          Travel <span>&</span>Joy Guide Tour
        </div>
        <div className='travel-lists'>
          {isLoaded? list.map(tour => <TravelListObj key={tour.seq} tour={tour} />) : <h1>Loading....</h1>}
        </div>
        <div className='more-btn' style={{textAlign: "center", marginBottom: 20 + "px"}}>
          {!isFull && <button type='button' id='more-btn' className='btn-m' onClick={this.handleMoreRead}>MORE</button>}
        </div>
      </div>
    )
  }
}

export default TravelList