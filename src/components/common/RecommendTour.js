import React from 'react';

class RecommendTour extends React.Component {
    render() {
        return(
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

        )
    }
}
export default RecommendTour;