import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// css
import '../../../resources/travel/css/travelreservation.css';

// Component
import TravelReservationInfo from './travelreservation_tour';
import TravelReservationClient from './travelreservation_client';
import TravelReservationTos from './travelreservation_tos';
import TravelReservationComplete from './travelreservation_complete';

function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateStr = year + "-" + two(month) + "-" + two(day);

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
  constructor(props) {
    super(props);

    this.state = {
      isPaid: false,
      phone: undefined,
      require: undefined
    }
  }

  handlePhoneChange = (e) => {
    const val = e.target.value;
    this.setState({
      phone: val
    })
  }

  handleRequireChange = (e) => {
    const val = e.target.value;
    this.setState({
      require: val
    })
  }

  handleClick = () => {
    const { tour_seq, selectedDays, person, email } = this.props.location.state;
    const { phone, require } = this.state;
    const total_price = document.getElementsByClassName('total-price')[0].dataset.total_price;
    // alert(tour_seq + " " + selectedDays + " " + person + " " + email + " " + phone + " " + require + " " + total_price);
    
    // 로그인이 되어있는지 체크
    fetch('http://localhost:3002/users/getUser', {
      credentials: "include"
    })
      .then(res => res.json())
      .then(user => {
        if(user.email === undefined) {  // 로그인 정보가 없을 경우
          alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
          this.props.history.push('/login');  // 로그인 페이지로 이동.
        }else if(user.email === email){ // 로그인 정보가 있을 경우
          // const data = {
          //   reservation_number: new Date().getTime() + "_" + tour_seq,
          //   tour_seq: tour_seq,
          //   email: email,
          //   start_date: dateToString(selectedDays[0]),
          //   join_people: person,
          //   total_price: total_price
          // }
  
          // fetch('http://localhost:3002/tour/reservation', {
          //   method: 'post',
          //   headers: {
          //     'Content-Type': 'application/json; charset=utf-8'
          //   },
          //   body: JSON.stringify(data)
          // }) 
          //   .then(res => res.json())
          //   .then(data => {
          //     if(data.result === 'succ') {
          //       alert('insert 성공!');
          //       this.props.history.push('/travel/reservation/complete');
          //     }else if(data.result === 'fail') {
          //       alert('예상치 못한 오류로 결제가 취소되었습니다.');
                
          //       // 카드결제 취소 logic...ㅎ

          //       this.props.history.push(`travel/detail/${tour_seq}`);
          //     }
          //   })

          const IMP = window.IMP;
          IMP.init('imp00240527');

          IMP.request_pay({
            pg : 'inicis', // version 1.1.0부터 지원.
            pay_method : 'card',
            merchant_uid : new Date().getTime() + "_" + tour_seq,
            name : 'Travel&Joy',
            // amount : total_price,
            amount: 10,
            buyer_email : email,
            buyer_name : user.name,
            buyer_tel : phone,
          }, function(rsp) {
            if ( rsp.success ) {
              var msg = '결제가 완료되었습니다.\n';
              msg += '고유ID : ' + rsp.imp_uid + '\n';
              msg += '상점 거래ID : ' + rsp.merchant_uid + '\n';
              msg += '결제 금액 : ' + rsp.paid_amount + '\n';
              msg += '카드 승인번호 : ' + rsp.apply_num;
      
              const data = {
                reservation_number: rsp.merchant_uid,
                tour_seq: tour_seq,
                email: email,
                start_date: dateToString(selectedDays[0]),
                join_people: person,
                total_price: total_price
              }
      
              fetch('http://localhost:3002/tour/reservation', {
                method: 'post',
                headers: {
                  'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
              }) 
                .then(res => res.json())
                .then(data => {
                  if(data.result === 'succ') {
                    alert(msg);
                    this.setState({
                      isPaid: true
                    })
                  }else if(data.result === 'fail') {
                    alert('예상치 못한 오류로 결제가 취소되었습니다.');
                    
                    // 카드결제 취소 logic...ㅎ

                    this.props.history.push(`travel/detail/${tour_seq}`);
                  }
                });
            } else {
              var msg = '결제에 실패하였습니다.';
              msg += '에러내용 : ' + rsp.error_msg;
              alert(msg);
            }
          }.bind(this))
        }
      })
  }

  render() {
    const { tour_seq, selectedDays, person, email } = this.props.location.state;
    let { isPaid } = this.state;

    return(
      <div className='container'>
        {isPaid? <TravelReservationComplete /> : 
        <div className='travel-reservation-wrapper'>
          <TravelReservationInfo selectedDays={selectedDays} person={person} tour_seq={tour_seq} />
          <TravelReservationClient handlePhoneChange={this.handlePhoneChange} handleRequireChange={this.handleRequireChange}/>
          <TravelReservationTos />
          <div className='travel-pay'>
            <button type='button' className='btn-l' onClick={this.handleClick}>결제하기</button>
          </div>
        </div>}
      </div>
    )
  }
}

export default withRouter(TravelReservation);