import React, {Component} from "react";
import {Modal, Button, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/freetalk/css/free_talk.css'

//게시물
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class Talk extends Component {

    state = {
        file: 'cat19.jpg',
        images: [],
        likes: 0,
        comments: 0,
        showModal: false
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
        fetch('http://localhost:3002/freetalk/list/likes?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({likes: res.likes}))
        fetch('http://localhost:3002/freetalk/list/comments?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({comments: res.comments}))
    }

    _callApi = async () => {

    }

    handleHover = (e) => {
        console.log('handle hover');
    }
    handleOnClickTalk = () => {
    }

    handleClose = () => this.setState({showModal:false});
    handleShow = () => this.setState({showModal:true});

    render() {
        return (
            <div className="talk-wrap" onClick={this.handleOnClickTalk}>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered={"true"}>
                    <Row>
                       <Col>
                            <div className="modal-image-wrap">
                                <img src={require('../../resources/freetalk/image/talk/' + this.state.file)}/>
                            </div>
                       </Col>
                        <Col>
                            <div className="modal-content-wrap">
                                <Modal.Body>
                                    <div className="modal-body-profile">
                                        프로필 영역
                                    </div>
                                    <div className="modal-body-comments">
                                        댓글 스크롤 영역
                                    </div>
                                    <div className="modal-body-function">
                                        좋아요, 스크랩, 댓글남기기 등
                                    </div>
                                </Modal.Body>
                            </div>
                        </Col>
                    </Row>
                </Modal>
                <div className="talk-image-wrap" onClick={this.handleShow}>
                    <div className={"talk-image-description"}>
                        <i className={"far fa-heart"}/> {this.state.likes}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="far fa-comment-dots"/> {this.state.comments}
                    </div>
                    <img src={require('../../resources/freetalk/image/talk/' + this.state.file)}/>

                    <div className={"talk-image-files"} style={{display:'none'}}>
                        {(this.state.images.length > 0)?
                            this.state.images.map( (image, i) => (
                                    <img key={image.seq}
                                         src={require('../../resources/freetalk/image/talk/' + image.name_real)}/>
                                ))
                            :' '}
                    </div>
                </div>
                <div className="talk-text-wrap" style={{display:'none'}}>
                {/*<div className="talk-text-wrap">*/}
                    <div>No : {this.props.seq}</div>
                    <div>Title : {this.props.title}</div>
                    <div>Content : {this.props.content}</div>
                    <div>Email : {this.props.email}</div>
                    <div>Nickname : {this.props.nickname}</div>
                    <div>reg_date : {this.props.reg_date}</div>
                </div>
            </div>
        );
    }
}

export default Talk;