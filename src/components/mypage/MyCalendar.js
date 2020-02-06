import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../../resources/mypage/css/mycalendar.scss';


class MyCalendar extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email:this.props.location.state.users.email,
          list: []
        }
      }
      componentDidMount() {
        fetch(`http://localhost:3002/mypage/travel?email=${this.state.email}`)
          .then(res => res.json())
          .then(data => this.setState({
            list: data
            })
          );
           
      } 
    render(){
        let { list } = this.state
        let eventsList = list.map((event) => 
            [{
                id:event.seq,
                title:event.title,
                start:event.start_date,
                backgroundColor:'#e1e9eb'
            }][0]
        )


        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                           <div className='calendar-wrapper'>
                                <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]}    
                                events={eventsList}
                              />
                           </div>
                        </div>
                    </div>
            </div>
        );
    }
}



export default MyCalendar;