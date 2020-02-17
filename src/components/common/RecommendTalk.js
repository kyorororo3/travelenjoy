import React from 'react';
import {Modal, Button, Row, Col, Media, Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../resources/freetalk/css/free_talk.css'
import '../../resources/freetalk/css/free_talk_modal.css'
import TalkModalBody from "../freetalk/talk/TalkModalBody";

class RecommendTalk extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file : 'cat19.jpg',
            images : [],
            likes : this.props.talk.likecount,
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
            },
            isScrap : false,
            currentUser : ''
        }
    }

    componentDidMount() {
        fetch(`http://localhost:3002/freetalk/list/images?seq=${this.props.talk.seq}`)
        .then(res => res.json())
        .then(res => {
            console.log(res.images);
            this.setState({images: res.images})
        })
        .then(res => this.setState({file:(this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
        
        fetch('http://localhost:3002/freetalk/list/author?email=' + this.props.talk.email + '&nickname=' + this.props.talk.nickname)
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
        )
    }

    handleHover = () => {
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
                    {this.state.isScrap?<i className="fas fa-heart" style={{color:"#fff"}} />:<i className="far fa-heart" style={{color:"#fff"}} />}
                    &nbsp;{likecount}&ensp;&ensp;
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

    handleAddLikes = () => {
        this.setState({likes: (this.state.likes + 1)})
    }
    handleSubLikes = () => {
        this.setState({likes: (this.state.likes - 1)})
    }


    render() {
        let {seq, email, nickname, reg_date, likecount} = this.props.talk;
        return(
            <div className='recommendtalk-wrapper'>
                <div className='recommendtalk' onClick={this.handleShowModal} onMouseOver={this.handleHover} onMouseLeave={this.handleHoverOut}>
                    <img className='recommendtalk-thumbnail' alt={require('../../resources/common/images/talk.jpg')} 
                        src={require(`../../resources/freetalk/image/talk/${this.state.file}`)} />
                    {this.hoverDiv(this.state.isHover)}
                </div>   
                <div className='recommendtalk-modal-wrapper'>
                    <Modal id="talk-modal-wrap" show={this.state.showModal} onHide={this.handleCloseModal} centered={"true"}>
                        <Row><Col>
                            <div className="modal-author-profile">
                                <div className="modal-body-profile-detail">
                                    <Media>
                                        <a>
                                            <img
                                                width={32}
                                                height={32}
                                                src='https://logodix.com/logo/1707081.png'
                                                alt='profile image'
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('../../resources/mypage/images/profile_img.jpg')}}
                                            />
                                        </a>
                                       
                                        <a>{this.state.author.nickname}</a>
                                     
                                    </Media>
                                </div>
                            </div>
                            <div className="modal-image-wrap">
                                <div className="modal-image-aligner">
                                    <Carousel>
                                    {(this.state.images.length > 0)?
                                        this.state.images.map( (image, i) => (
                                            <Carousel.Item key={image.seq}>
                                            <img src={require('../../resources/freetalk/image/talk/' + image.name_real)}/>
                                            </Carousel.Item>
                                        ))
                                        :<img src={require('../../resources/freetalk/image/talk/' + this.state.file)}/>
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
                                        likes={this.state.likes}
                                        handleAddLikes={this.handleAddLikes}
                                        handleSubLikes={this.handleSubLikes}
                                        currentUser={this.state.currentUser}
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