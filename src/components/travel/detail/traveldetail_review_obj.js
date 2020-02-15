import React from 'react';

class TravelReviewObj extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      writer_info: undefined
    }
  }

  componentDidMount() {
    const {email} = this.props.review;

    fetch(`http://localhost:3002/tour/detail/review/writer?email=${email}`)
      .then(res => res.json())
      .then(result => this.setState({
        isLoaded: true,
        writer_info: result
      }));
  }

  render() {
    const { score, title, content, review_img, wdate} = this.props.review;
    const { isLoaded, writer_info } = this.state
    return (
      <div className='travel-review-obj'>
        <div className='review-writer-date'>
          <div className='review-writer'>
            <div className='writer-profile-img'>
              {isLoaded && <img src={require(`../../../uploads/${writer_info.profile_img}`)}/>}
            </div>
            <div className='writer-nick'>
              {isLoaded && writer_info.nickname}
            </div>
          </div>
          <div className='review-date'>{wdate}</div>
        </div>
        <div className='review-score' style={{width: (20 * score) + 'px'}}></div>
        <div className='review-title'>
          {title}
        </div>
        <div className='review-content-image'>
          <div className='review-content'>
            {content}
          </div>
          <div className='review-image'>
            <img src={require(`../../../uploads/${review_img}`)}/>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReviewObj