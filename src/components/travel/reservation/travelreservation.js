import React from 'react';
import {withRouter} from 'react-router-dom';
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
class TravelReservation extends React.Component {
  render() {
    console.log(this.props.location.state);
    const { tour_seq, startday, person, email } = this.props.location.state;

    return(
      <div className='travel-reservation-wrapper container'>
        예약페이지 입니다. <br/>
        예약자 : {email} <br/>
        예약인원 : {person} <br/>
        예약일(투어시작일) : {dateToString(startday)} <br/>
        tour_seq : {tour_seq} <br/>
      </div>
    )
  }
}

export default withRouter(TravelReservation);