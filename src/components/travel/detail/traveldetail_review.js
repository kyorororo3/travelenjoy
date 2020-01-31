import React from 'react';

// Components
import TravelReviewObj from './traveldetail_review_obj';

class TravelReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      review_list: [],
      start: 0,
      total: undefined,
      isFull: false
    }
  }
  componentDidMount() {
    const {tour_seq} = this.props;
    fetch(`http://localhost:3002/tour/detail/review?tour_seq=${tour_seq}&start=0`)
      .then(res => res.json())
      .then(data => this.setState({
        isLoaded: true,
        review_list: data,
        start: this.state.start + 5
      }))
    
    fetch(`http://localhost:3002/tour/detail/review/length?tour_seq=${tour_seq}`)
      .then(res => res.json())
      .then(data => this.setState({
        total: data.length
      }, () => {
        const {total, start} = this.state
        if(total <= start) {
          this.setState({
            isFull: true
          })
        }
      }))
  }

  handleMoreRead = () => {
    const {tour_seq} = this.props;
    const {start, review_list} = this.state;
    fetch(`http://localhost:3002/tour/detail/review?tour_seq=${tour_seq}&start=${start}`)
      .then(res => res.json())
      .then(data => this.setState({
        review_list: review_list.concat(data),
        start: start + 5
      }, () => {
        const {total, start} = this.state
        if(total <= start) {
          this.setState({
            isFull: true
          })
        }
      }))
  }

  render() {
    const {isLoaded, review_list, isFull} = this.state;

    return(
      <div className='travel-review-wrapper'>
        <div className='sub-title-text'><i className="fas fa-star"></i> Tour Review</div>
        <div className='reivew-avg'>
          평점평균...
        </div>
        {isLoaded && review_list.map(review => <TravelReviewObj key={review.seq} review={review} />)}
        <div className='more-btn'>
          {!isFull && <button type='button' onClick={this.handleMoreRead} className='btn-m'>MORE</button>}
        </div>
      </div>
    )
  }
}

export default TravelReview