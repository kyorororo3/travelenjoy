import React from 'react';

// Components
import TravelReviewObj from './traveldetail_review_obj';

class TravelReview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      review_list: [],
      start: 0,
      total: undefined,
      isFull: false,
      average: 0
    }
  }
  componentDidMount() {
    const {tour_seq} = this.props;
    fetch(`http://localhost:3002/tour/detail/review?tour_seq=${tour_seq}&start=0`)
      .then(res => res.json())
      .then(data => this.setState({
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
    
    fetch(`http://localhost:3002/tour/detail/review/average?tour_seq=${tour_seq}`)
      .then(res => res.json())
      .then(data => this.setState({
        average: Math.round(data.avg * 10) / 10
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
    const {review_list, isFull, average} = this.state;

    return(
      <div className='travel-review-wrapper'>
        <div className='sub-title-text'><i className="fas fa-star"></i> Tour Review</div>
        <div className='review-avg-wrapper'>
          <div className='review-avg'>
            <div className='avg-number'>{average}점</div>
            <div className='avg-star-inactive'>
              <div className='avg-star-active' style={{width: (40 * average) + 'px'}}></div>
            </div>
          </div>
        </div>
        {review_list.length === 0? <div className='non-data'>등록된 리뷰가 없습니다.</div> : review_list.map(review => <TravelReviewObj key={review.seq} review={review} />)}
        <div className='more-btn'>
          {!isFull && <button type='button' onClick={this.handleMoreRead} className='btn-m'>MORE</button>}
        </div>
      </div>
    )
  }
}

export default TravelReview