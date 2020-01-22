import React, { Component } from 'react';


class Calendar extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            MyCalendar is here today is 2020-01-20

                        </div>
                    </div>
            </div>
        );
    }
}


export default Calendar;