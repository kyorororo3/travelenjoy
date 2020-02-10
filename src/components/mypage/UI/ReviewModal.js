import React, { Component } from 'react';
import {Modal, Button, Row, Col, Media, Carousel} from 'react-bootstrap';

class ReviewModal extends Component {

    constructor(props){
        super(props);

        this.state = {
            showModal:false
        }
    }

    ModalOpener = () => this.setState({showModal:true});
    ModalCloser = () => this.setState({showModal:false});

    render(){
        <div className='modal-body-wrap'>
            <div className='modal-body-functon'>

            </div>
        </div>
    }
}