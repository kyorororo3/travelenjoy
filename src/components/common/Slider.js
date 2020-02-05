import React from 'react';

class Slider extends React.Component {
    render() {
        return(
            <div className='slideshow-wrapper'>
                <div className='slide-txt'>경주로 떠나시나요?</div>
                <img className='slide-img' alt='이미지없음' src={require('../../resources/common/images/jeonju.jpg')} />
            </div>
        )
    }
}
export default Slider;