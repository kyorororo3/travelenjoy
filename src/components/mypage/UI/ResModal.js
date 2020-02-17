import React, { Component } from 'react';

// Utility
import {stringToDate} from '../../../utils/Functions';

class ResModal extends Component {


    constructor(props){
        super(props);
        
        const {start_date} = this.props.tour;
        let _after = false;
        if(stringToDate(start_date) < new Date()) _after = true;
        
        this.state = {
          after: _after,
        }

    }

    closeBtnHandler = (e) => {this.props.callbackFromParent({showResModal:false, tour:[]})}
    
    cancleBtnHandler = () => {
      alert("cancle button");
      const {reservation_number} = this.props.tour;
      fetch('http://localhost:3002/tour/cancle', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          reservation_number: reservation_number
        })
      })
        .then(res => res.json())
        .then(result => {
          alert(result);
          const {isSucc} = result;
          if(isSucc) {
            window.location.reload();
          }else {
            alert('환불 안됬지롱 ㅋ');
          }
        });
        
    }
    
 
    render(){

        const {category, title, reservation_number, start_date, join_people, total_price, phone, message} = this.props.tour;
        const {after} = this.state;

        return(
            <div className='modal-wrapper'>
                <div className='modal-header'>
                    <label>{`[${category}] ${title}`}</label>
                </div>
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Reservation Number</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={reservation_number} readOnly />
                </div>
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Reservation Date</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={start_date} readOnly />
                </div>    
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Guests</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={join_people} readOnly />
                </div>    
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Total Price</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={`${total_price} 원`} readOnly />
                </div> 
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Contact Number</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={phone} readOnly />
                </div>    
                <div className='info row'>
                    <label className='col-sm-5 reservation-info-label'>Message</label>
                    <input className='col-sm-7 reservation-info-readonly' type='text' value={message? message:'N/A'} readOnly/>
                </div>       
                <div className='modal-footer'>
                    {!after && <button type='button' className='btn-primary' onClick={this.cancleBtnHandler}>CANCLE</button>}
                    <button type='button' className='btn-primary' onClick={this.closeBtnHandler}>CLOSE</button>
                </div>
            </div>
        );
    }
}

export default ResModal;