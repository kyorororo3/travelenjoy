import React from 'react';

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
  }

  handleScrap = () => {
    const {isScrapped} = this.state;
    
    // 로그인이 되어있는지 체크
    fetch('http://localhost:3002/users/getUser', {
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => {
        if(user.email === undefined) {  // 로그인 정보가 없을 경우
          alert('로그인이 필요한 페이지입니다.');
          this.props.history.push('/login');  // 로그인 페이지로 이동.
        }else { // 로그인 정보가 있을 경우
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
      })  


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