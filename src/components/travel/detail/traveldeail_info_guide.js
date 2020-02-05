import React from 'react';

class TravelInfoGuide extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      guide_info: undefined
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
  }

  render() {
    const {isLoaded, guide_info} = this.state;

    return(
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
    )
  }
}

export default TravelInfoGuide