import React from 'react';
import '../../resources/common/css/home.css';
class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      users: []
    }
  }
  // componentDidMount() {
  //   fetch('http://localhost:3002/users/getUser',{
  //     credentials: 'include'
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       if(data.email !== undefined){
  //         this.setState({users : data})
  //         console.log(data);
  //       }          
  //     });
  // }

  render() {


    return (
      <div className='container'>
        <div className='home-wrapper'>

          <div className='slideshow-wrapper'>
            <div className='slide-txt'>경주로 떠나시나요?</div>
            <img className='slide-img' alt='이미지없음' src={require('../../resources/common/images/jeonju.jpg')} />
          </div>

         

          <div className='recommendlist-wrapper'>

          <div className='home-subtitle'>이런 여행 어떠세요? 👀</div>
            
          <div className='recommendlist-row'>

              <div className='recommendtour'>
                <div className='thumbnail'>
                <img className='thumbnail-img' alt='이미지없음' src={require('../../resources/common/images/haeundae.jpg')} />
                </div>

                <div className='recommendtour-body'>
                  <div className='recommendtour-body loc'>부산</div>
                  <div className='recommendtour-body title'>해운대 스냅샷</div>
                  <div className='recommendtour-body tourprice'>56,000won</div>
                </div>
              </div>

              <div className='recommendtour'>
                <div className='thumbnail'>
                <img className='thumbnail-img' alt='이미지없음' src={require('../../resources/common/images/jeju.jpg')} />
                </div>

                <div className='recommendtour-body'>
                    <div className='recommendtour-body loc'>제주도</div>
                    <div className='recommendtour-body title'>서귀포 귤농장 체험</div>
                    <div className='recommendtour-body tourprice'>29,000won</div>
                  </div>
              </div>

              <div className='recommendtour'>
                <div className='thumbnail'>
                <img className='thumbnail-img' alt='이미지없음' src={require('../../resources/common/images/coffee.jpg')} />
                </div>

                <div className='recommendtour-body'>
                  <div className='recommendtour-body loc'>강원도</div>
                  <div className='recommendtour-body title'>강릉 커피투어</div>
                  <div className='recommendtour-body tourprice'>20,000won</div>
                </div>  
              </div>

              <div className='recommendtour'>
                <div className='thumbnail'>
                <img className='thumbnail-img' alt='이미지없음' src={require('../../resources/common/images/ulsan.jpg')} />
                </div>

                <div className='recommendtour-body'>
                  <div className='recommendtour-body loc'>울산</div>
                  <div className='recommendtour-body title'>맛집탐방 + 출사를 한번에</div>
                  <div className='recommendtour-body tourprice'>60,000won</div>
                </div>
              </div>
            </div>
          </div>


          <div className='recommendlist-wrapper'>
            <div className='home-subtitle'>실시간 인기글 💬</div>

            <div className='recommendlist-row'>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk2.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk2.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk2.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk2.jpg')}  />
              </div>

              <div className='recommendtalk'>
                  <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk2.jpg')}  />
              </div>

            </div>
          </div>

        </div> 
      </div>   // container end
    )
  }
}

export default Home;