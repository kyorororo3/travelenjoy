import React from 'react';
import DayPicker from "react-day-picker";
import DayPickerInput from "react-day-picker/DayPickerInput";

// CSS
import 'react-day-picker/lib/style.css';

// function getTourDays(date, period) {
//   return {
//     from: date,
//     to: 
//   }
// }

class TravelSche extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedDays: []
    }
  }

  handleDayChange = (date) => {
    const addDay = this.props.period - 1;
    const _selectedDays = [date]
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    for(let i = 1; i < 5; i++) {
      // let addedDay = date.setDate(day + i);
      let addedDay = new Date(year, month, day + i, 12);
      _selectedDays.push(addedDay);
    }
    console.log(_selectedDays);
    
    this.setState({
      selectedDays: _selectedDays
    })
  }

  render() {
    return(
      <div className='travel-schedule-wrapper'>
        travel schedule<br/>
        <DayPickerInput 
          placeholder="DD/MM/YYYY" 
          format="DD/MM/YYYY"
          selectedDays={this.state.selectedDays}
          onDayChange={this.handleDayChange} />
      </div>
    )
  }
}

export default TravelSche;