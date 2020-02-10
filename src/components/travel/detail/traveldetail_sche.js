import React, { useReducer } from 'react';
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { withRouter } from 'react-router-dom';

// CSS
import 'react-day-picker/lib/style.css';

// Utility
import * as UtilityFunctions from '../../../utils/Functions';

class TravelSche extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      selectedDays: [],
      available: undefined
    }
  }
  
  // 날짜 선택 시 투어 기간에 맞게 날짜가 전부 선택됨.
  handleDayChange = (date, modifiers = {}) => {
    // 선택이 불가능한 날짜일 경우 선택 못함.
    if(modifiers.disabled) {
      return;
    }

    const data = {
      tour_seq: this.props.tour_seq,
      date: UtilityFunctions.dateToString(date)
    }

    fetch(`http://localhost:3002/tour/available`, { // 해당 날짜의 투어가능인원을 찾음
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          isSelected: true,
          selectedDays: [date],
          available: this.props.max - parseInt(result)
        })
      });
  }

  // 입력된 인원 수가 신청 가능한 인원수인지 체크
  checkPerson = () => {
    const {available} = this.state;
    const input = document.getElementById('_person');
    const input_val = parseInt(input.value);

    const {selectedDays} = this.state;

    if(selectedDays.length <= 0) {
      alert('투어 날짜를 먼저 선택해주세요.');
      input.value = '';
    }else {
      if(input_val > available) {
        alert(`현재 예약 가능 인원을 초과했습니다.\n예약가능인원 : ${available}`);
        input.value = available;
      }
    }
  }

  // 인원수 증가
  handleCountUp = () => {
    
    const el_input = document.getElementById('_person');
    let num = el_input.value;
    
    if(num === '') {
      el_input.value = 1;
    }else {
      el_input.value = parseInt(num) + 1;
    }
    
    this.checkPerson();
  }
  
  // 인원수 감소
  handleCountDown = () => {
    const el_input = document.getElementById('_person');
    let num = el_input.value;

    if(num === '' || parseInt(num) <= 1) {
      el_input.value = 1;
    }else {
      el_input.value = parseInt(num) - 1;
    }

    this.checkPerson();
  }

  // 예약하기 버튼 클릭!
  handleReservation = (e) => {
    e.preventDefault();
    const {selectedDays} = this.state;
    const person = e.target.person.value;
    const tour_seq = e.target.seq.value;

    // 폼이 기입됬는지 체크
    if(selectedDays.length === 0) { // 날짜선택이 안됬을 경우
      alert('[필수] 투어 날짜를 선택하세요');
    }else if(parseInt(person) <= '0' || person === '') { // 인원이 없을 경우
      alert('[필수] 투어 인원을 입력하세요');
    }else {
      // 로그인이 되어있는지 체크
      fetch('http://localhost:3002/users/getUser', {
        credentials: "include"
      })
        .then(res => res.json())
        .then(user => {
          if(user.email === undefined) {  // 로그인 정보가 없을 경우
            alert('로그인이 필요한 페이지입니다.');
            this.props.history.push('/login');  // 로그인 페이지로 이동.
          }else { // 로그인 정보가 있을 경우
            this.props.history.push({
              pathname: '/travel/reservation',
              state: {
                selectedDays: selectedDays,
                tour_seq: tour_seq,
                person: person,
                email: user.email
              }
            });
          }
        })  
    }
  }

  render() {
    const { isSelected, selectedDays, available} = this.state;

    const disabledDaysObj = this.props.disabledDays
    let _disabledDays = [];

    for (let i = 0; i < disabledDaysObj.length; i++) {
      const obj = disabledDaysObj[i];
      _disabledDays.push(UtilityFunctions.stringToDate(obj.start_date));
    }

    _disabledDays.push(new Date());
    _disabledDays.push({before: new Date()});

    return(
      <div className='travel-schedule-wrapper'>
        <DayPicker 
          showOutsideDays
          disabledDays={_disabledDays}
          selectedDays={selectedDays}
          onDayClick={this.handleDayChange} />
          {isSelected?
          <div className='travel-schedule-selected'>
            <div className='travel-schedule-day'>
              <span className='label'>예약일</span>
              <span className='data'>{UtilityFunctions.dateToString(selectedDays[0])}</span>
            </div>
            <div className='travel-schedule-available'>
              <span className='label'>예약가능인원</span>
              <span className='data'>{available}명</span>
            </div>
          </div> : 
          <div className='travel-schedule-unselected'>
            시작 날짜를 선택해주세요.
          </div>
          }
        
        <form onSubmit={this.handleReservation}>
          <input type='hidden' name='seq' value={this.props.tour_seq}/>
          <div className='travel-schedule-input'>
            <input type='text' id='_person' name='person' 
              placeholder='인원수를 입력해주세요'
              onChange={this.checkPerson} />
            <div className='input-up-down'>
              <div className='input-up' onClick={this.handleCountUp}>
                <i className="fas fa-caret-up"></i>
              </div>
              <div className='input-down' onClick={this.handleCountDown}>
                <i className="fas fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className='travel-schedule-input'>
            <input className='btn-m' type='submit' value='예약하기'/>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(TravelSche);