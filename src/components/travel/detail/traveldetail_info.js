import React from 'react';
import {withRouter} from 'react-router-dom';
import TravelInfoGuide from './traveldeail_info_guide';

class TravelInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      loginId: undefined,
      isScrapped: false
    }
  }

  componentDidMount() {
    // 로그인이 되어있는지 체크
    fetch('http://localhost:3002/users/getUser', {
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => {
        if(user.email !== undefined) { 
          fetch(`http://localhost:3002/tour/detail/scrap/isScrapped?email=${user.email}&tour_seq=${this.props.info.seq}`)
            .then(res => res.json())
            .then(result => {
              this.setState({
                loginId: user.email,
                isScrapped: result.isScrapped
              })
            })
        }
      })  

    const el_div = document.getElementsByClassName('description-content')[0];
    el_div.innerHTML = this.props.info.content;
  }

  handleScrap = () => {
    const {loginId, isScrapped} = this.state;
    
    if(loginId === undefined) {  // 로그인 정보가 없을 경우
      alert('로그인이 필요한 페이지입니다.');
      this.props.history.push('/login');  // 로그인 페이지로 이동.
    }else { // 로그인 정보가 있을 경우
      if(isScrapped) {
        // alert('스크랩해제 기능이 들어갈 예정임니다 ㅎ');
        fetch(`http://localhost:3002/tour/detail/scrap/delete?email=${loginId}&tour_seq=${this.props.info.seq}`)
          .then(() => {
            this.setState({
              isScrapped: false
            })
            alert('스크랩이 해제되었습니다!');
          })
        
      }else {
        // alert('스크랩하기 기능이 들어갈 예정임니다 ㅎ');
        fetch(`http://localhost:3002/tour/detail/scrap/insert?email=${loginId}&tour_seq=${this.props.info.seq}`)
          .then(() => {
            this.setState({
              isScrapped: true
            })
            alert('스크랩 되었습니다!');
          })
      }
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
          참여인원 : {min_people} ~ {max_people}명 <br/><br/>
          <div className='description-content'></div>
        </div>
        <TravelInfoGuide email={email} />
      </div>
    )
  }
}

export default withRouter(TravelInfo)