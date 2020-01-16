import React from 'react';
import { withRouter } from 'react-router-dom';

class TravelListObj extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    this.props.history.push('/travel/detail/' + seq);
  }

  render() {
    return(
      <div className='tour-list-obj' data-seq={this.props.tour.seq}
       onClick={this.goToDetail}>
        <div data-seq={this.props.tour.seq}>{this.props.tour.title}</div>
        <div data-seq={this.props.tour.seq}>{this.props.tour.content}</div>
        <div data-seq={this.props.tour.seq}>{this.props.tour.nickname}</div>
      </div>
    )
  }
}

export default withRouter(TravelListObj);