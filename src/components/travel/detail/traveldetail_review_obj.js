import React from 'react';

class TravelReviewObj extends React.Component {

  render() {
    const {email, score, title, content, review_img, wdate} = this.props.review;

    return (
      <div className='travel-review-obj'>
        <div className='review-nickname-score-date'>
          <div className='review-nickname'>{email}</div>
          <div className='review-score' style={{width: (20 * score) + 'px'}}></div>
          <div className='review-date'>{wdate}</div>
        </div>
        <div className='review-title'>
          {title}
        </div>
        <div className='review-content-image'>
          <div className='review-content'>
            {content}
          </div>
          <div className='review-image'>
            이미지
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReviewObj