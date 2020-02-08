import React from 'react';
import {Modal, Button, Row, Col, Media} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/freetalk/css/free_talk.css'
import '../../resources/freetalk/css/free_talk_modal.css'
import TalkModalBody from "../freetalk/talk/TalkModalBody";

class RecommendTalk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isHover : false,
            showModal : false,
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
                <div className='recommnedtalk-hover'>
                    <i className="far fa-heart"/>&nbsp;{likecount}&ensp;&ensp;
                    <i className="far fa-comment-dots"/>&nbsp;{commentcount}
                </div>
            );
        }else{
            return null;
        }
    }

    handleShowModal = () => {
        this.setState({showModal : true})
    }
    handleCloseModal = () => {
        this.setState({showModal : false})
    }

    render() {
        let {seq, email, nickname, reg_date, likecount} = this.props.talk;
        return(
            <div className='recommendtalk-wrapper'>
                <div className='recommendtalk' onClick={this.handleShowModal} onMouseOver={this.handleHover} onMouseLeave={this.handleHoverOut}>
                    <img className='recommendtalk-thumbnail' alt='이미지없음' src={require('../../resources/common/images/talk.jpg')}  />
                    {this.hoverDiv(this.state.isHover)}
                </div>   
                <div className='recommendtalk-modal-wrapper'>
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
                                    <img style={{width:"400px"}} src={require('../../resources/common/images/talk2.jpg')}/>
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
                                        likes={likecount}
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
export default RecommendTalk;