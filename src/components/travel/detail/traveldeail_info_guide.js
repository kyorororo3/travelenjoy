import React from 'react';
import {withRouter} from 'react-router-dom';

// component
import TravelDetailModal from './traveldetail_modal'

class TravelInfoGuide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      guide_info: undefined,
      loginId: undefined,
      modal: false
    }
  }

  componentDidMount() {
    const {email} = this.props;

    fetch(`http://localhost:3002/tour/detail/guide?email=${email}`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          isLoaded: true,
          guide_info: data
        })
      })
  }

  handleClick = () => {
    alert('문의버튼 클릭');

     // 로그인이 되어있는지 체크
     fetch('http://localhost:3002/users/getUser', {
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => {
        if(user.email === undefined) { 
          alert('로그인이 필요한 페이지입니다.');
          this.props.history.push('/login');  // 로그인 페이지로 이동.
        }else {
          this.setState({
            loginId: user.email,
            modal: true
          })
        }
      })

  }

  handleModal = () => {
    this.setState({
      modal: false
    })
  }

  render() {
    const {isLoaded, guide_info, modal} = this.state;

    return(
      <React.Fragment>
      <div className='travel-info-guide'>
        <div className='sub-title-text'><i className="fas fa-address-book"></i> Tour Guide</div>
        <div className='guide-img-name'>
          <div className='guide-img'>
            {isLoaded && <img alt='이미지음슴' src=''></img>}
          </div>
          <div className='guide-name'>
            {isLoaded && guide_info.companyname}
          </div>
          <div className='question-btn-wrapper'>
            <button id='_question' type='button' onClick={this.handleClick}>1:1 문의하기</button>
          </div>
        </div>
      </div>
      {modal && <TravelDetailModal handleModal={this.handleModal} />}
      </React.Fragment>
    )
  }
}

export default withRouter(TravelInfoGuide)