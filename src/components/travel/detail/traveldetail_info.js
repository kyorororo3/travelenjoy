import React from 'react';

class TravelInfo extends React.Component {
  render() {
    let { email, nickname, category, title, content, thumbnail,
      min_people, max_people } = this.props.info;

    return(
      <div className='travel-info-wrapper'>
        <div className='travel-info-category'>
          [{category}]
        </div>
        <div className='travel-info-title'>
          {title}
        </div>
        <div className='travel-info-images'>
          이미지 들어갈 자리임!
        </div>
        <div className='travel-info-contents'>
          내용 : {content} <br/>
          참여인원 : {min_people} ~ {max_people}명 <br/><br/>
        </div>
      </div>
    )
  }
}

export default TravelInfo;