import React, {Component} from "react";
import {Modal, Button, Row, Col, Media} from 'react-bootstrap';
import 'moment/locale/ko';
//게시물 Modal 프로필, 댓글, 기능
//modal 문서 : https://react-bootstrap.github.io/components/modal/

const moment = require('moment');

class TalkModalBody extends Component {

    state = {
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
        comments: []
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/author?email=' + this.props.email + '&nickname=' + this.props.nickname)
            .then(res => res.json())
            // .then(res => this.setState({author: res.author}))
            .then(res => console.log(res.author.profile_img) )

        fetch('http://localhost:3002/freetalk/list/comments?talk_seq=' + this.props.talkSeq)
            .then(res => res.json())
            .then(res => this.setState({comments: res.comments}))
    }

    render() {
        return(
            <div className="modal-body-wrap">
                    <div className="modal-body-profile">
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
                                    <Media.Body>
                                        <a href="#">{this.state.author.nickname}</a>
                                    </Media.Body>
                                </Media>
                            </div>
                            <div className="modal-body-profile-function">
                                <a href="#">
                                    <i className="fas fa-ellipsis-h"/>
                                </a>
                            </div>
                    </div>

                    <div className="modal-body-comments">
                        {(this.state.comments.length > 0)?
                            this.state.comments.map( (comment, i) => (
                                <Media key = {comment.seq}>
                                    <a href="#">
                                    <img
                                        width={32}
                                        height={32}
                                        src={require('../../../../public/uploads/' + comment.profile_img)}
                                        alt='profile image'
                                        onError={(e)=>{e.target.onerror = null; e.target.src=require('../../../resources/mypage/images/profile_img.jpg')}}
                                    /></a>
                                    <Media.Body>
                                        <a href={'#'}>{comment.nickname}</a>
                                        &nbsp; {comment.content}
                                        <br/>
                                        {moment(comment.reg_date, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow()}
                                    </Media.Body>
                                </Media>
                            ))
                        :'등록된 댓글이 없습니다 :)'}
                        <br/>
                    </div>

                    <div className="modal-body-function">
                        좋아요, 스크랩, 댓글남기기 등
                    </div>

            </div>
        )
    }
}

export default TalkModalBody;