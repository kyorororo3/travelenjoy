import React from 'react';

// Components
import TravelReviewObj from './traveldetail_review_obj';

class TravelReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      review_list: []
    }
  }
  componentDidMount() {
    const {tour_seq} = this.props;
    fetch(`http://localhost:3002/tour/detail/review?tour_seq=${tour_seq}`)
      .then(res => res.json())
      .then(data => this.setState({
        isLoaded: true,
        review_list: data
      }))
  }
  render() {
    const {isLoaded, review_list} = this.state;

    return(
      <div className='travel-review-wrapper'>
        <div className='sub-title-text'><i className="fas fa-star"></i> Tour Review</div>
        <div className='reivew-avg'>
          평점평균...
        </div>
        {isLoaded && review_list.map(review => <TravelReviewObj key={review.seq} review={review} />)}
      </div>
    )
  }
}

export default TravelReview