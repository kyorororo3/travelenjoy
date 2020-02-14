import React, { Component } from 'react';

class PopupList extends Component{
    render(){
        const {reservation_number, email, start_date, join_people, total_price, phone, message} = this.props.list
        return(
            <tbody>
                <tr>
                    <td>{email}</td>
                    <td>{phone}</td>
                    <td>{start_date}</td>
                    <td>{join_people}명</td>
                    <td>{total_price}원</td>
                    <td className="message-size">{message}</td>
                </tr>
            </tbody>
        )
    }
}

export default PopupList;