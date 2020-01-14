import React from 'react';
import { withRouter } from 'react-router-dom';

class TourlistObj extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    this.props.history.push('/tour/detail/' + seq);
  }

  render() {
    return(
      <div className='tour-list-obj' data-seq={this.props.tour.SEQ}
       onClick={this.goToDetail}>
        <div data-seq={this.props.tour.SEQ}>{this.props.tour.TITLE}</div>
        <div data-seq={this.props.tour.SEQ}>{this.props.tour.CONTENT}</div>
        <div data-seq={this.props.tour.SEQ}>{this.props.tour.NICKNAME}</div>
      </div>
    )
  }
}

export default withRouter(TourlistObj);