import React from 'react';
import {Modal, Row, Col, Media, Carousel, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../resources/freetalk/css/free_talk.css'
import '../../../resources/freetalk/css/free_talk_modal.css'
import TalkModalBody from "../../freetalk/talk/TalkModalBody";
import EditImages from "../../freetalk/talk/EditImages";
class MyTalkList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHover : false,
            images: [],
            showModal : false,
            file: 'cat1.jpg',
            likes: 0,
            isLiked: false
        }
    }

    handleHover = () => {
        // console.log('마우스 오버')
        this.setState({isHover : true});
     }
     handleHoverOut = () => {
         this.setState({isHover : false});
     }

    hoverDiv = (result) => {
        let {likecount, commentcount} = this.props.talk;
        if(result){
            return (
                <div className='mytalk-hover'>
                    <i className="far fa-heart"/>&nbsp;{likecount}&ensp;&ensp;
                    <i className="far fa-comment-dots"/>&nbsp;{commentcount}
                </div>
            );
        }else{
            return null;
        }
    }
    getImagesHandler = (data) => {
        fetch(`http://localhost:3002/mypage/talk/post/images?email=${data.email}&seq=${data.seq}`)
        .then(res => res.json())
        .then(data => this.setState({
            images:data
        })
    )

    }
    async delete () {
        let seq ={seq : this.props.talk.seq};

        fetch('http://localhost:3002/freetalk/free/delete', {
            method:'post',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify(seq)
        })
            .then(res => res.json())
            .then(data => console.log(data));

        return true;
    }

    handleDelete = () => {
        if(this.delete()){
            alert('삭제가 완료되었습니다.');
            // reload가 필요로 하는 부분
        }
    }

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
        }
    }

    handleAddLikes = () => {
        if(this.state.isLiked){
            this.setState({isLiked: true, likes: (this.state.likes + 1)})
        }else{
            this.setState({isLiked: true,likes: (this.props.talk.likecount + 1)})
        }
    }
    handleSubLikes = () => {
        if(this.state.isLiked){
            this.setState({isLiked: true, likes: (this.state.likes - 1)})
        }else{
            this.setState({isLiked: true,likes: (this.props.talk.likecount - 1)})
        }
    }
    handleShowModal = () => {
        const {seq, email} = this.props.talk;
        this.getImagesHandler({seq:seq, email:email});
        this.setState({showModal : true})
    }
    handleCloseModal = () => {
        this.setState({showModal : false})
    }

    render() {
        let {seq, email, nickname, reg_date, likecount, name_saved} = this.props.talk;
        let { isLiked, likes} = this.state;

        return(
            
            <div className='post-wrapper'>
                <div className='mytalk' onClick={this.handleShowModal} onMouseOver={this.handleHover} onMouseLeave={this.handleHoverOut}>
                    <img className='talk-thumbnail' alt='이미지없음' src={require(`../../../uploads/${name_saved}`)}  />
                    {this.hoverDiv(this.state.isHover)}
                </div>   
                <div className='talk-modal-wrapper'>
                    <Modal id="talk-edit-images-wrap" show={this.state.showEditImageModal} onHide={this.handleCloseEditImage} centered={"true"}>
                        <EditImages images={this.state.images}
                                    seq={this.props.seq}
                                    handleCloseEditImage={this.handleCloseEditImage}/>
                    </Modal>
                    <Modal id="talk-modal-wrap" show={this.state.showModal} onHide={this.handleCloseModal} centered={"true"}>
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
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('../../../resources/mypage/images/profile_img.jpg')}}
                                            />
                                        </a>
                                        <Media.Body id="modal-body-profile-detail-body">
                                          <a href="#">{nickname}</a>
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
                                                    src={require('../../../uploads/' + image.name_saved)}/>
                                                </Carousel.Item>
                                            ))
                                            :<img src={require('../../../uploads/' + this.state.file)}/>
                                        }
                                    </Carousel>
                                </div>
                            </div>
                        </Col></Row>
                        <Row><Col>
                            <div className="modal-content-wrap">
                                <Modal.Body>
                                    <TalkModalBody
                                        talkSeq={seq}
                                        email={email}
                                        nickname={nickname}
                                        regDate={reg_date}
                                        likes={isLiked? likes:likecount}
                                        handleAddLikes={this.handleAddLikes}
                                        handleSubLikes={this.handleSubLikes}
                                        currentUser={this.props.user}
                                    />
                                </Modal.Body>
                            </div>
                        </Col></Row>
                    </Modal>
                </div>
            </div>
        )
    }
}
export default MyTalkList;
