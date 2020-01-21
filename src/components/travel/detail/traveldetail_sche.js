import React from 'react';
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";

// CSS
import 'react-day-picker/lib/style.css';

// 자릿수가 하나일 경우 앞에 0을 붙여줌
function two(str) {
  str = str + "";

  if(str.length === 1) {
    str = "0" + str;
  }
  return str;
}

// Date를 String으로 변환시켜주는 함수 (yyyy/mm/dd)
function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const dateStr = year + "/" + two(month) + "/" + two(day);

  return dateStr;
}

class TravelSche extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSelected: false,
      selectedDays: []
    }
  }
  
  // 날짜 선택 시 투어 기간에 맞게 날짜가 전부 선택됨.
  handleDayChange = (date, modifiers = {}) => {
    
    // 선택이 불가능한 날짜일 경우 선택 못함.
    if(modifiers.disabled) {
      return;
    }

    const addDay = this.props.period;
    const _selectedDays = [date]
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    for(let i = 1; i < addDay; i++) {
      // let addedDay = date.setDate(day + i);
      let pushed = new Date(year, month, day + i);
      _selectedDays.push(pushed);
    }
    console.log(_selectedDays);
    
    this.setState({
      isSelected: true,
      selectedDays: _selectedDays
    })
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
  }

  // 인원수 감소
  handleCountDown = () => {
    const el_input = document.getElementById('_person');
    let num = el_input.value;

    if(num === '') {
      el_input.value = 1;
    }else if(parseInt(num) <= 0){
      el_input.value = 0;
    }else {
      el_input.value = parseInt(num) - 1;
    }
  }

  // 예약하기 버튼 클릭!
  handleReservation = (e) => {
    e.preventDefault();
    const { selectedDays } = this.state;
    const person = e.target.person.value;

    console.log(selectedDays);
    console.log(person);
  }

  render() {
    const { isSelected, selectedDays} = this.state;
    let startDay = undefined;
    let endDay = undefined;

    if(isSelected) {
      startDay = dateToString(selectedDays[0]);
      endDay = dateToString(selectedDays[selectedDays.length - 1]);
    }

    return(
      <div className='travel-schedule-wrapper'>
        <DayPicker 
          showOutsideDays
          disabledDays={ [new Date(), {before: new Date()}] }
          selectedDays={selectedDays}
          onDayClick={this.handleDayChange} />
        <div className='travel-schedule-selected'>
          {isSelected?
            <h3>{startDay} - {endDay}</h3> : 
            <h3>날짜를 선택해주세요.</h3>
          }
        </div>
        <form onSubmit={this.handleReservation}>
          <div className='travel-schedule-input'>
            <input type='text' id='_person' name='person' placeholder='인원수를 입력해주세요' />
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

export default TravelSche;