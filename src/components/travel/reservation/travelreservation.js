import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// css
import '../../../resources/travel/css/travelreservation.css';

// Component
import TravelReservationInfo from './travelreservation_tour';
import TravelReservationClient from './travelreservation_client';
import TravelReservationTos from './travelreservation_tos';

// Utility
import * as UtilityFunctions from '../../../utils/Functions';

class TravelReservation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      agree: false,
      phone: '',
      require: ''
    }
  }

  handleAgree = (e) => {
    const val = e.target.value;

    if(val === 'on') {
      this.setState({
        agree: true
      })
    }
  }

  handlePhoneChange = (e) => {
    const regex= /[^0-9]/g;
    const val = e.target.value;

    if(regex.test(val)) {
      e.target.value = val.replace(regex,'');
    }

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
    const { phone, require, agree } = this.state;
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

          if(phone === '') {
            alert('[필수] 연락 받을 번호를 입력해주세요.');
            return;
          }
          if(!agree) {
            alert('[필수] 이용약관에 동의해주세요.');
            return;
          }
          
          const insert = {
            reservation_number: new Date().getTime() + "_" + tour_seq,
            tour_seq: tour_seq,
            email: email,
            start_date: UtilityFunctions.dateToString(selectedDays[0]),
            join_people: person,
            total_price: total_price,
            phone: phone,
            message: require
          }
  
          fetch('http://localhost:3002/tour/reservation', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(insert)
          }) 
            .then(res => res.json())
            .then(result => {
              if(result.seq !== 0) {
                alert('insert 성공! tour_reservation_seq = ' + result.seq);
                this.props.history.push({
                  pathname: '/travel/reservation/complete',
                  state: {seq: result.seq}
                })
              }else if(result.seq === 0) {
                alert('예상치 못한 오류로 결제가 취소되었습니다.');
                
                // 카드결제 취소 logic...ㅎ

                this.props.history.push(`/travel/detail/${tour_seq}`);
              }
            })

          // const IMP = window.IMP;
          // IMP.init('imp00240527');

          // IMP.request_pay({
          //   pg : 'inicis', // version 1.1.0부터 지원.
          //   pay_method : 'card',
          //   merchant_uid : new Date().getTime() + "_" + tour_seq,
          //   name : 'Travel&Joy',
          //   // amount : total_price,
          //   amount: 10,
          //   buyer_email : email,
          //   buyer_name : user.name,
          //   buyer_tel : phone,
          // }, function(rsp) {
          //   if ( rsp.success ) {
          //     var msg = '결제가 완료되었습니다.\n';
          //     msg += '고유ID : ' + rsp.imp_uid + '\n';
          //     msg += '상점 거래ID : ' + rsp.merchant_uid + '\n';
          //     msg += '결제 금액 : ' + rsp.paid_amount + '\n';
          //     msg += '카드 승인번호 : ' + rsp.apply_num;
      
          //     const insert = {
          //       reservation_number: rsp.merchant_uid,
          //       tour_seq: tour_seq,
          //       email: email,
          //       start_date: UtilityFunctions.dateToString(selectedDays[0]),
          //       join_people: person,
          //       total_price: total_price,
          //       phone: phone,
          //       message: require
          //     }
      
          //     fetch('http://localhost:3002/tour/reservation', {
          //       method: 'post',
          //       headers: {
          //         'Content-Type': 'application/json; charset=utf-8'
          //       },
          //       body: JSON.stringify(insert)
          //     }) 
          //       .then(res => res.json())
          //       .then(result => {
          //         if(result.seq !== 0) {
          //           alert('insert 성공! tour_reservation_seq = ' + result.seq);
          //           this.props.history.push({
          //             pathname: '/travel/reservation/complete',
          //             state: {seq: result.seq}
          //           })
          //         }else if(result.seq === 0) {
          //           alert('예상치 못한 오류로 결제가 취소되었습니다.');
                    
          //           // 카드결제 취소 logic...ㅎ

          //           this.props.history.push(`/travel/detail/${tour_seq}`);
          //         }
          //       })

          //   } else {
          //     var msg = '결제에 실패하였습니다.';
          //     msg += '에러내용 : ' + rsp.error_msg;
          //     alert(msg);
          //   }
          // }.bind(this))
        }
      })
  }

  render() {
    const { tour_seq, selectedDays, person, email } = this.props.location.state;

    return(
      <div className='container'>
        <div className='travel-reservation-wrapper'>
          <TravelReservationInfo selectedDays={selectedDays} person={person} tour_seq={tour_seq} />
          <TravelReservationClient handlePhoneChange={this.handlePhoneChange} handleRequireChange={this.handleRequireChange}/>
          <TravelReservationTos handleAgree={this.handleAgree}/>
          <div className='travel-pay'>
            <button type='button' className='btn-l' onClick={this.handleClick}>결제하기</button>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TravelReservation);