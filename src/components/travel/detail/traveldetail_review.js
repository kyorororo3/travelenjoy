import React from 'react';

class TravelReview extends React.Component {
  render() {
    return(
      <div className='travel-review-wrapper'>
        <div className='sub-title-text'><i className="fas fa-star"></i> Tour Review</div>
        <div className='reivew-avg'>
          평점평균...
        </div>
        <div className='travel-review-obj'>
          <div className='review-nickname-score-date'>
            <div className='review-nickname'>닉네임</div>
            <div className='review-score'>스코어</div>
            <div className='review-date'>2020-01-31</div>
          </div>
          <div className='review-title'>
            제목
          </div>
          <div className='review-content-image'>
            <div className='review-content'>
              내용
            </div>
            <div className='review-image'>
              이미지
            </div>
          </div>
        </div>
        <div className='travel-review-obj'>
          <div className='review-nickname-score-date'>
            <div className='review-nickname'>닉네임</div>
            <div className='review-score'>스코어</div>
            <div className='review-date'>2020-01-31</div>
          </div>
          <div className='review-title'>
            제목
          </div>
          <div className='review-content-image'>
            <div className='review-content'>
              내용
            </div>
            <div className='review-image'>
              이미지
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReview