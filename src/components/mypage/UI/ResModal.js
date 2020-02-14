import React, { Component } from 'react';

class ResModal extends Component {


    constructor(props){
        super(props);

        this.state = {

        }

    }

    closeBtnHandler = (e) => {this.props.callbackFromParent({showResModal:false, tour:[]})}
    
 
    render(){

        const {category, title, reservation_number, start_date, join_people, total_price, phone, message} = this.props.tour;
      
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
                    <button type='button' className='btn-primary' onClick={this.closeBtnHandler}>CLOSE</button>
                </div>
            </div>
        );
    }
}

export default ResModal;