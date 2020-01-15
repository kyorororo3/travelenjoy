import React from 'react';

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
    return(
      <div className='tour-detail-wrapper'>
        <h2>detail component</h2>
        
      </div>
    )
  }
}

export default Tourdetail