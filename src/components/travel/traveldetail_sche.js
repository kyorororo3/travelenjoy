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
  handleDayChange = (date) => {
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
        travel schedule<br/>
        <DayPicker 
          showOutsideDays
          selectedDays={selectedDays}
          onDayClick={this.handleDayChange} />
        <div className='travel-schedule-selected'>
          {isSelected?
            <h3>{startDay} - {endDay}</h3> : 
            <h3>날짜를 선택해주세요.</h3>
          }
        </div>
      </div>
    )
  }
}

export default TravelSche;