import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';

class ReviewReadModal extends Component {

  

    constructor(props){
        super(props);

        this.state = {
    
        }
 
    }

    deleteHandler = (e) => {
        const result = window.confirm('Are you sure you want to delete this review?');
        if(result){
            fetch(`http://localhost:3002/mypage/review/delete?seq=${this.props.review.seq}`)
            .then(res => res.json())
            .then(data => this.props.callbackFromParent({
                showModal:false,
                review:[],
                isReloaded:true
            }))
        }
    }
    cancelBtnHandler = (e) => {this.props.callbackFromParent({showModal:false, review:[], isReloaded:false})}

    render(){
       
        const {category, tour_title, score, title, content, review_img} = this.props.review;

        let total_star = [];
        for(let i = 0 ; i < score ; i++){
           total_star.push(<img src={require('../../../resources/mypage/images/star-active.png')}/>);
        }
        for(let i = 0 ; i < 5-score ; i++){
            total_star.push(<img src={require('../../../resources/mypage/images/star-inactive.png')}/>);
        }
        
        return(
            <Form>
                <Form.Group as={Row} >
                    <Form.Label column sm={2}>Tour</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='text' name='tour_title' defaultValue={`[${category}] ${tour_title}`} readOnly/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='text' name='title' defaultValue={title} readOnly/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Score</Form.Label>
                    <div className='form-group review-score-star col-sm-10'>
                    <span id='star'>{total_star}</span>
                        <span className='score-number readonly'>&nbsp;{score}.0</span>
                    </div>
                </Form.Group>
                <Form.Group className='img-row'>
                <Form.Label>Image</Form.Label>
                    {review_img? <img className='modal-review-img' src={require(`../../../uploads/${review_img}`)}/>:''}
                </Form.Group>
                <Form.Group>
                <Form.Label>Content</Form.Label>
                    <Form.Control as='textarea' rows='4' defaultValue={content} />
                </Form.Group>
                <Button type='button' onClick={this.cancelBtnHandler} >CLOSE</Button>
                <a className='delete-a' onClick={this.deleteHandler}>Do you want to delete this review?</a>
            </Form>
        );
    }
}

export default ReviewReadModal;