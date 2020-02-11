import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';

class ReviewReadModal extends Component {

    fileObj = [];
    fileArray = [];
    imageList = [];

    file = '';

    constructor(props){
        super(props);

        this.state = {
        //    isHovered:[false,false,false,false,false],
        //    score:0,
        //    isFileUploaded: false
        }
    //    this.starMouseenterHandler = this.starMouseenterHandler.bind(this);
    //    this.starMouseleaveHanlder = this.starMouseleaveHanlder.bind(this);
    //    this.starOnClick = this.starOnClick.bind(this);
    //    this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this);
    //    this.cancelBtnHandler = this.cancelBtnHandler.bind(this);

    }

    // starMouseenterHandler(e){

    //     const hovers = [false,false,false,false,false];
    //     const score = e.target.dataset.score;
    //     for(let i = 0 ; i<score ;i++){
    //         hovers[i] = true;
    //     }

    //    this.setState({
    //        isHovered:hovers,
    //        score:0
    //    })

    // }

    // starMouseleaveHanlder(e){
    //     const hovers = this.state.isHovered;
    //     if(this.state.score === 0){
    //         for(let i = 0; i<5 ;i++){
    //             hovers[i] = false;
    //         }
    //     }
    //    this.setState({
    //        isHovered:hovers
    //    })

    // }

    // starOnClick(e){
    //     const score = e.target.dataset.score;
    //     const hovers = [false,false,false,false,false];
    //     for(let i = 0 ; i<score ;i++){
    //         hovers[i] = true;
    //     }
    //     this.setState({
    //         isHovered:hovers,
    //         score:score
    //     })

    // }

    // uploadMultipleFiles(e) {
    //     let file = e.target.files[0];
    //     this.fileObj.push(e.target.files)
    //     console.log(e.target.files[0])
    //     this.setState({file: this.fileObj[0][0]})
    //     for (let i = 0; i < this.fileObj[0].length; i++) {
    //         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    //         console.log('type : ' + this.fileObj[0][i].type)
    //     }

    //     for(let i = 0 ; i < this.fileArray.length ; i++) {
    //         console.log(i + ' ' + this.fileArray[0])
    //     }

    //     this.setState({ file: this.fileArray })

    //     let reader = new FileReader();

    //     reader.readAsArrayBuffer(this.fileObj[0][0]);

    //     reader.onloadend = () => {
    //         this.setState({ file: file, imagePreviewUrl: reader.result });
    //     };
    //     this.setState({isFileUploaded: true});

    // }

    cancelBtnHandler = (e) => {this.props.callbackFromParent({showModal:false, tour:[]})}

    render(){
        const tour_title = `[${this.props.tour_category}] ${this.props.tour_title}`;
        const {score, title, wdate} = this.props.review;

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
                    <Form.Control type='text' name='tour_title' value={tour_title} readOnly/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='text' name='title' value={title} readOnly/>
                    </Col>
                </Form.Group>
                <Form.Group className='file-upload-group' as={Row}>
                    <Form.Label column sm={2}>Image Upload</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='file' onChange={this.uploadMultipleFiles} multiple/>
                    </Col>
                    <div className="form-group multi-preview">
                        {(this.fileArray || []).map((url, i) => (
                            <img key={i} src={url} alt="..." />
                        ))}
                    </div>
                        <Form.Text>{this.state.isFileUploaded? '':'please upload image files(jpg, png, gif) max 5 images '}</Form.Text>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Score</Form.Label>
                    <div className='form-group review-score-star col-sm-10'>
                    <span id='star'>{total_star}</span>
                        <span className='score-number'>&nbsp;{score}.0</span>
                    </div>
                </Form.Group>

                <Form.Group>
                <Form.Label>Content</Form.Label>
                    <Form.Control as='textarea' rows='7' />
                </Form.Group>
                <Button type='button' onClick={this.cancelBtnHandler} >CANCEL</Button>
                <Button type='submit' >SAVE</Button>
            </Form>
        );
    }
}

export default ReviewReadModal;