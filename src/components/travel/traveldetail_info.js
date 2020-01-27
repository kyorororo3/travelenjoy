import React from 'react';

class TravelInfo extends React.Component {
  render() {
    let { email, nickname, category, title, content, thumbnail, period,
      min_people, max_people } = this.props.info;

    return(
      <div className='travel-info-wrapper'>
        travel info <br/>
        작성자 : {nickname} <br/>
        카테고리 : {category} <br/>
        제목 : {title} <br/>
        내용 : <div dangerouslySetInnerHTML={ {__html: content} }/><br/>
        기간 : {period}일 <br/>
        참여인원 : {min_people} ~ {max_people}명 <br/><br/>
      </div>
    )
  }
}

export default TravelInfo;