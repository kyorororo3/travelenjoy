import React from 'react';

class TravelInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isScrapped: false
    }
  }

  handleScrap = () => {
    const {isScrapped} = this.state;
    
    if(isScrapped) {
      alert('스크랩해제 기능이 들어갈 예정임니다 ㅎ');
      this.setState({
        isScrapped: false
      })
    }else {
      alert('스크랩하기 기능이 들어갈 예정임니다 ㅎ');
      this.setState({
        isScrapped: true
      })
    }

  }

  render() {
    let { email, nickname, category, title, content, thumbnail,
      min_people, max_people } = this.props.info;

    return(
      <div className='travel-info-wrapper'>
        <div className='travel-info-category'>
          [{category}]
        </div>
        <div className='travel-info-title'>
          <span>{title}</span>
          <span onClick={this.handleScrap} className='tour-scrap'>
            {this.state.isScrapped? <i className="fas fa-heart"></i>: <i className="far fa-heart"></i>}
          </span>
        </div>
        <div className='travel-info-images'>
          이미지 들어갈 자리임!
        </div>
        <div className='travel-info-contents'>
          <div className='sub-title-text'><i className="fas fa-atlas"></i> Tour Description</div>
          내용 : {content} <br/>
          참여인원 : {min_people} ~ {max_people}명 <br/><br/>
        </div>
      </div>
    )
  }
}

export default TravelInfo;