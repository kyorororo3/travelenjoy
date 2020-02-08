import React, {Component} from "react";
import {Modal, Button, Row, Col, Media} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/freetalk/css/free_talk.css'
import '../../resources/freetalk/css/free_talk_modal.css'
import TalkModalBody from "./talk/TalkModalBody";

//게시물
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class Talk extends Component {

    state = {
        file: 'cat19.jpg',
        images: [],
        likes: 0,
        comments: 0,
        showModal: false,
        author: {
            email: 'admin',
            pwd: 'admin',
            provider: null,
            provider_id: null,
            name: 'admin',
            nickname: 'admin',
            profile_img: 'default_profile_image.jpg',
            phone: 1111,
            auth:3
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
        fetch('http://localhost:3002/freetalk/list/likes?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({likes: res.likes}))
        fetch('http://localhost:3002/freetalk/list/comments/count?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({comments: res.comments}))
        fetch('http://localhost:3002/freetalk/list/author?email=' + this.props.email + '&nickname=' + this.props.nickname)
            .then(res => res.json())
            .then(res => this.setState({author: res.author}))
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
                <Modal id="talk-modal-wrap" show={this.state.showModal} onHide={this.handleClose} centered={"true"}>
                    <Row><Col>
                        <div className="modal-author-profile">
                            <div className="modal-body-profile-detail">
                                <Media>
                                    <a href="#">
                                        <img
                                            width={32}
                                            height={32}
                                            src='https://logodix.com/logo/1707081.png'
                                            alt='profile image'
                                            onError={(e)=>{e.target.onerror = null; e.target.src=require('../../resources/mypage/images/profile_img.jpg')}}
                                        />
                                    </a>
                                    <Media.Body>
                                        <a href="#">{this.state.author.nickname}</a>
                                    </Media.Body>
                                </Media>
                            </div>
                        </div>
                        <div className="modal-image-wrap">
                            <div className="modal-image-aligner">
                                <img src={require('../../resources/freetalk/image/talk/' + this.state.file)}/>
                            </div>
                        </div>
                    </Col></Row>
                    <Row><Col>
                        <div className="modal-content-wrap">
                            <Modal.Body>
                                <TalkModalBody
                                    talkSeq={this.props.seq}
                                    email={this.props.email}
                                    nickname={this.props.nickname}
                                    regDate={this.props.reg_date}
                                    likes={this.state.likes}
                                />
                            </Modal.Body>
                        </div>
                    </Col></Row>
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