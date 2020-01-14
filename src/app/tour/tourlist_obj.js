import React from 'react';

class TourlistObj extends React.Component {
  render() {
    return(
      <div className='tour-list-obj'>
        <div>{this.props.tour.TITLE}</div>
        <div>{this.props.tour.CONTENT}</div>
        <div>{this.props.tour.NICKNAME}</div>
      </div>
    )
  }
}

export default TourlistObj;