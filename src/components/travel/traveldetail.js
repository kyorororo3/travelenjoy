import React, { Fragment } from 'react';

// COMPONENTS
import TravelInfo from './traveldetail_info';
import TravelSche from './traveldetail_sche';
import TravelPath from './traveldetail_path';

class Tourdetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded : false,
      tour_info : null,
      tour_sche : null,
      tour_des : null
    }
  }

  componentDidMount() {
    let seq = this.props.match.params.seq;  // url path로 보내진 파라미터 받아옴.

    fetch('http://localhost:3002/tour/detail/' + seq)
      .then( res => res.json() )
      .then( data => this.setState({
        isLoaded: true,
        tour_info: data.tour_info,
        tour_sche: data.tour_sche,
        tour_des: data.tour_des
      }) );
  }

  render() {

    let { isLoaded, tour_info, tour_sche, tour_des } = this.state;
    
    // let loaded_page = <Fragment>
    //   <TravelInfo info={tour_info} />
    //   <TravelSche sche={tour_sche} period={tour_info.period} />
    //   <TravelPath path={tour_des} />
    // </Fragment>

    return(
      <div className='tour-detail-wrapper'>
        <h2>detail component</h2>
        {isLoaded && 
          ( <Fragment>
              <TravelInfo info={tour_info} />
              <TravelSche sche={tour_sche} period={tour_info.period} />
              <TravelPath path={tour_des} />
            </Fragment>
          )
        }
      </div>
    )
  }
}

export default Tourdetail