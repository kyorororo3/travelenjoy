import React, {Component} from "react";
import {Modal, Button, Row, Col, Media, Carousel, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/freetalk/css/free_talk.css'
import '../../resources/freetalk/css/free_talk_modal.css'
import TalkModalBody from "./talk/TalkModalBody";
import EditImages from "./talk/EditImages";

//게시물
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class Talk extends Component {

    state = {
        file: 'cat1.jpg',
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
        },
        currentUser: '',
        isOwner: 0,
        showDeleteImageModal: false
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_saved:this.state.file}))
        fetch('http://localhost:3002/freetalk/list/likes?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({likes: res.likes}))
        fetch('http://localhost:3002/freetalk/list/comments/count?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({comments: res.comments}))
        fetch('http://localhost:3002/freetalk/list/author?email=' + this.props.email + '&nickname=' + this.props.nickname)
            .then(res => res.json())
            .then(res => this.setState({author: res.author}))
        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                    if(data.email !== undefined)
                        this.setState({currentUser : data})
                    if(this.props.email === data.email)
                        this.setState({isOwner: 1})
                }
            );
    }

    handleUpdateCarousel = () => {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_saved:this.state.file}))
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

    handleCloseEditImage = () => {
        this.setState({showEditImageModal:false});
        this.setState({showModal:true});
    }
    handleShowEditImage = () => {
        this.setState({showEditImageModal:true});
        this.setState({showModal:false});
    }

    handleEditImages = () => {
        this.handleShowEditImage()
    }

    handleDelete = () => {
        if(this.delete()){
            alert('삭제가 완료되었습니다.');
            this.props.deleteOneFromList();
        }
    }

    handleAddLikes = () => {
        this.setState({likes: (this.state.likes + 1)})
    }
    handleSubLikes = () => {
        this.setState({likes: (this.state.likes - 1)})
    }

    async delete () {
        let seq ={seq : this.props.seq};

        fetch('http://localhost:3002/freetalk/free/delete', {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(seq)
        })
            .then(res => res.json())
            .then(data => console.log(data));

        return true;
    }

    render() {
        return (
            <div className="talk-wrap" onClick={this.handleOnClickTalk}>
                <Modal id="talk-edit-images-wrap" show={this.state.showEditImageModal} onHide={this.handleCloseEditImage} centered={"true"}>
                    <EditImages images={this.state.images}
                                seq={this.props.seq}
                                handleCloseEditImage={this.handleCloseEditImage}/>
                </Modal>
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
                                            onError={(e)=>{e.target.onerror = null; e.target.src=require('../../uploads/cat1.jpg')}}
                                        />
                                    </a>
                                    <Media.Body id="modal-body-profile-detail-body">
                                        <a href="#">{this.props.nickname}</a>
                                        {(this.state.isOwner)
                                            ?
                                                <Dropdown className={"modify-talk"}>
                                                    <Dropdown.Toggle>
                                                        <i className={"fa fa-cog"}/>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu className="modify-talk-buttons">
                                                        <Dropdown.Item eventKey="1">
                                                            <a onClick={this.handleDelete}>글 삭제</a>
                                                        </Dropdown.Item>
                                                        <Dropdown.Item eventKey="2">
                                                            <a onClick={this.handleEditImages}>사진 수정</a>
                                                        </Dropdown.Item>
                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            :''}
                                    </Media.Body>
                                </Media>
                            </div>
                        </div>
                        <div className="modal-image-wrap">
                            <div className="modal-image-aligner">
                                <Carousel>
                                    {(this.state.images.length > 0)?
                                        this.state.images.map( (image, i) => (
                                            <Carousel.Item key={image.seq}>
                                            <img key={image.seq}
                                                 src={require('../../uploads/' + image.name_saved)}/>
                                            </Carousel.Item>
                                        ))
                                        :<img src={require('../../uploads/' + this.state.file)}/>
                                    }
                                </Carousel>
                            </div>
                        </div>
                    </Col></Row>
                    <Row><Col>
                        <div className="modal-content-wrap">
                            <Modal.Body>
                                <TalkModalBody
                                    key={this.props.seq}
                                    talkSeq={this.props.seq}
                                    email={this.props.email}
                                    nickname={this.props.nickname}
                                    regDate={this.props.reg_date}
                                    likes={this.state.likes}
                                    handleAddLikes={this.handleAddLikes}
                                    handleSubLikes={this.handleSubLikes}
                                    currentUser={this.state.currentUser}
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
                    <img src={require('../../uploads/' + this.state.file)}/>

                    <div className={"talk-image-files"} style={{display:'none'}}>
                        {(this.state.images.length > 0)?
                            this.state.images.map( (image, i) => (
                                    <img key={image.seq}
                                         src={require('../../uploads/' + image.name_saved)}/>
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