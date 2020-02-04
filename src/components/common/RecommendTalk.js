import React from 'react';

class RecommendTalk extends React.Component {
    render() {
        return(
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
        )
    }
}
export default RecommendTalk;