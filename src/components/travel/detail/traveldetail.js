import React, { Fragment } from 'react';

// COMPONENTS
import TravelInfo from './traveldetail_info';
import TravelSche from './traveldetail_sche';
import TravelCourse from './traveldetail_course';
import TravelReview from './traveldetail_review';

// CSS
import '../../../resources/travel/css/traveldetail.css';

class Tourdetail extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded : false,
      tour_info : undefined,
      tour_des : undefined,
      disabledDays : undefined
    }
  }

  componentDidMount() {
    let seq = this.props.match.params.seq;  // url path로 보내진 파라미터 받아옴.

    fetch('http://localhost:3002/tour/detail/' + seq)
      .then( res => res.json() )
      .then( data => this.setState({
        isLoaded: true,
        tour_info: data.tour_info,
        tour_des: data.tour_des,
        disabledDays: data.disabledDays
      }) );

  }

  render() {
    let { isLoaded, tour_info, tour_des, disabledDays } = this.state;
    
    return(
      <div className='travel-detail-wrapper container'>
        <div className='travel-detail-infomation'>
          {isLoaded && 
            ( <Fragment>
                <TravelInfo info={tour_info} />
                <TravelCourse course={tour_des} />
                <TravelReview />
              </Fragment>
            )
          }
        </div>
        <div className='travel-detail-reservation'>
          {isLoaded && <TravelSche disabledDays={disabledDays} tour_seq={tour_info.seq} max={tour_info.max_people}/> }
        </div>
      </div>
    )
  }
}

export default Tourdetail