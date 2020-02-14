import React, { Component } from 'react';
import {Form, Row, Col, Button} from 'react-bootstrap';

class ReviewWriteModal extends Component {


    constructor(props){
        super(props);

        this.state = {
           isHovered:[false,false,false,false,false],
           score:0,
           file:'',
           previewURL:'',
           isFileUploaded: false
        }
       this.starMouseenterHandler = this.starMouseenterHandler.bind(this);
       this.starMouseleaveHanlder = this.starMouseleaveHanlder.bind(this);
       this.starOnClick = this.starOnClick.bind(this);
       this.imgPreviewHandler = this.imgPreviewHandler.bind(this);
       this.cancelBtnHandler = this.cancelBtnHandler.bind(this);
       this.saveBtnHandler = this.saveBtnHandler.bind(this);

    }

    starMouseenterHandler(e){
        const hovers = [false,false,false,false,false];
        const score = e.target.dataset.score;
        for(let i = 0 ; i<score ;i++){
            hovers[i] = true;
        }
       this.setState({
           isHovered:hovers,
           score:0
       })
    }

    starMouseleaveHanlder(e){
        const hovers = this.state.isHovered;
        if(this.state.score === 0){
            for(let i = 0; i<5 ;i++){
                hovers[i] = false;
            }
        }
       this.setState({
           isHovered:hovers
       })

    }

    starOnClick(e){
        const score = e.target.dataset.score;
        const hovers = [false,false,false,false,false];
        for(let i = 0 ; i<score ;i++){
            hovers[i] = true;
        }
        this.setState({
            isHovered:hovers,
            score:score
        })

    }

    imgPreviewHandler(e){
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];   
        reader.onloadend = () => {
          this.setState({
            file : file,
            previewURL : reader.result,
            isFileUploaded: true
          })
        }
        reader.readAsDataURL(file);
    }

    cancelBtnHandler = (e) => {this.props.callbackFromParent({showWriteModal:false, tour:[], isReloaded:false})}
    
    saveBtnHandler(e){
        e.preventDefault();

        const formData = new FormData();
        formData.append('tour_seq',this.props.tour.seq); 
        formData.append('email',this.props.email);
        formData.append('title',e.target.title.value);
        formData.append('content',e.target.content.value);
        formData.append('score',this.state.score);
        formData.append('review_img',e.target.review_img.files[0]);

        console.log(formData);
        debugger;
        fetch('http://localhost:3002/mypage/review/register',{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then (data => {
            if(data.isInsertSuccess){
              this.props.callbackFromParent({showWriteModal:false, tour:[], isReloaded:true})
            }
        })

    }
    render(){
        const tour_title = `[${this.props.tour.category}] ${this.props.tour.title}`;
        return(
            <Form onSubmit={this.saveBtnHandler}>
                <Form.Group as={Row} >
                    <Form.Label column sm={2}>Tour</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='text' value={tour_title} readOnly/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                <Form.Label column sm={2}>Title</Form.Label>
                    <Col sm={10}>
                    <Form.Control type='text' name='title' />
                    </Col>
                </Form.Group>
                <Form.Group className='file-upload-group' as={Row}>
                    <Form.Label column sm={3}>Image Upload</Form.Label>
                    <Col sm={8}>
                    <Form.Control type='file' accept='image/jpg,impge/png,image/jpeg,image/gif' name='review_img' onChange={this.imgPreviewHandler}/>
                    </Col>
                    <div className="form-group multi-preview">
                    {this.state.file !== ''?<img src={this.state.previewURL} />:null}
                    </div>
                        <Form.Text>{this.state.isFileUploaded? '':'please upload image files(jpg, png, gif) max 5 images '}</Form.Text>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column sm={2}>Score</Form.Label>
                    <div className='form-group review-score-star col-sm-10'>
                        <input type="button" className={this.state.isHovered[0]? 'review-star-btn-active':'review-star-btn'} data-score={1}  onMouseOver={this.starMouseenterHandler} onMouseLeave={this.starMouseleaveHanlder} onClick={this.starOnClick} />
                        <input type="button" className={this.state.isHovered[1]? 'review-star-btn-active':'review-star-btn'} data-score={2}  onMouseOver={this.starMouseenterHandler} onMouseLeave={this.starMouseleaveHanlder} onClick={this.starOnClick}/>
                        <input type="button" className={this.state.isHovered[2]? 'review-star-btn-active':'review-star-btn'} data-score={3}  onMouseOver={this.starMouseenterHandler} onMouseLeave={this.starMouseleaveHanlder} onClick={this.starOnClick}/>
                        <input type="button" className={this.state.isHovered[3]? 'review-star-btn-active':'review-star-btn'} data-score={4}  onMouseOver={this.starMouseenterHandler} onMouseLeave={this.starMouseleaveHanlder} onClick={this.starOnClick}/>
                        <input type="button" className={this.state.isHovered[4]? 'review-star-btn-active':'review-star-btn'} data-score={5}  onMouseOver={this.starMouseenterHandler} onMouseLeave={this.starMouseleaveHanlder} onClick={this.starOnClick}/>
                        <span className='score-number'>&nbsp;{this.state.score}.0</span>
                    </div>
                </Form.Group>

                <Form.Group>
                <Form.Label>Content</Form.Label>
                    <Form.Control as='textarea' rows='4' name='content'/>
                </Form.Group>
                <Button type='button' onClick={this.cancelBtnHandler} >CANCEL</Button>
                <Button type='submit'>SAVE</Button>
            </Form>
        );
    }
}

export default ReviewWriteModal;