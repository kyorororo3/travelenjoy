import React from 'react';

// Date를 String으로 변환시켜주는 함수 (yyyy/mm/dd)
function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateStr = year + "/" + two(month) + "/" + two(day);

  return dateStr;
}
// 자릿수가 하나일 경우 앞에 0을 붙여줌
function two(str) {
  str = str + "";

  if(str.length === 1) {
    str = "0" + str;
  }
  return str;
}
class TravelReservationInfo extends React.Component {

  componentDidMount() {
    fetch(`http://localhost:3002/tour/detail/${this.props.tour_seq}`)
      .then(res => res.json())
      .then(data => {
        const info = data.tour_info;
        document.getElementsByClassName('tourdesc-title')[0].innerHTML = info.title;
        document.getElementsByClassName('company-name')[0].innerHTML = info.nickname;
        document.getElementsByClassName('data')[2].innerHTML = "₩" + info.price;
        document.getElementsByClassName('data')[3].innerHTML = "₩" + (info.price * this.props.person);
        document.getElementsByClassName('total-price')[0].dataset.total_price = info.price * this.props.person;
        // 업체 프로필이미지 정보 가져오기 fetch 들어갈 자리임!
      })
  }

  render() {
    const { selectedDays, person } = this.props;
    const startDay = selectedDays[0];
    const endDay = selectedDays[selectedDays.length - 1];

    return(
      <div className='travel-reservation-info panel-l'>
        <div className='tourdesc'>
          <div className='tourdesc-image'>
            썸네일 자리입니다.
          </div>
          <div className='tourdesc-title'></div>
          <div className='tourdesc-guide'>
            <span className='profile-image'></span>
            <span className='company-name'></span>
          </div>
        </div>
        <div className='selected'>
          <div className='selected-date reservation-row'>
            <span className='label'>예약일</span>
            <span className='data'>
              {startDay === endDay? dateToString(startDay):dateToString(startDay) - dateToString(endDay)}
            </span>
          </div>
          <div className='selected-people reservation-row'>
            <span className='label'>예약인원</span>
            <span className='data'>{person}명</span>
          </div>
        </div>
        <div className='price'>
          <div className='price-for-one reservation-row'>
            <span className='label'>1인당 가격</span>
            <span className='data'></span>
          </div>
          <div className='total-price reservation-row'>
            <span className='label'>전체 가격</span>
            <span className='data'></span>
          </div>
        </div>
      </div>
    )
  }
}

export default TravelReservationInfo;