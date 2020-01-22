import React, { Component } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

import '../../resources/mypage/css/mycalendar.scss';


class MyCalendar extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                           <div className='calendar-wrapper'>
                                <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />
                           </div>
                        </div>
                    </div>
            </div>
        );
    }
}



export default MyCalendar;