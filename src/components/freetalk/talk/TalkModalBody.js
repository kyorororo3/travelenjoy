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
        comments: [],
        currentUser: '',
        content: '',
        editContent: ''
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/author?email=' + this.props.email + '&nickname=' + this.props.nickname)
            .then(res => res.json())
            // .then(res => this.setState({author: res.author}))
            .then(res => console.log(res.author.profile_img) )

        fetch('http://localhost:3002/freetalk/list/comments?talk_seq=' + this.props.talkSeq)
            .then(res => res.json())
            .then(res => this.setState({comments: res.comments}))
        this.setState({currentUser: this.props.currentUser})
    }

    createComment = (e) => {
        e.preventDefault()

        let commentData = new FormData();

        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                    if(data.email !== undefined) {
                        commentData.append("email", data.email);
                        commentData.append("nickname", data.nickname);

                        commentData.append("talkSeq", this.props.talkSeq);
                        commentData.append("content", this.state.content);
                        console.log('front comment : ' + commentData);
                        console.log('front comment : ' + commentData.toString());
                        console.log('front comment : ' + JSON.stringify(commentData));

                        fetch('http://localhost:3002/freetalk/list/comments/create', {
                            body: JSON.stringify({
                                email: data.email,
                                nickname: data.nickname,
                                talkSeq: this.props.talkSeq,
                                content: this.state.content
                            }),
                            headers: {'Content-Type': 'application/json; charset=utf-8'},
                            method: 'post'
                        })
                            .then(res => res.json())
                            .then(data => console.log(data));
                        alert('저장이 완료되었습니다.')
                        fetch('http://localhost:3002/freetalk/list/comments?talk_seq=' + this.props.talkSeq)
                            .then(res => res.json())
                            .then(res => this.setState({comments: res.comments}))
                        this.setState({content:''});
                    }else
                        alert('로그인이 필요합니다.')
                }
            );
    }

    handleCommentContent = (e) =>{
        this.setState({content: e.target.value});
        console.log(this.state.content);
    }

    handleEditComment = (e) => {
        this.setState({editContent: e.target.value})
    }

    render() {
        return(
            <div className="modal-body-wrap">
                <div className="modal-body-function">
                    <div className="modal-body-function-left">
                        <i className="far fa-heart"></i>
                        <i className="far fa-comment"></i>
                        <i className="fas fa-upload"></i>
                    </div>
                    <div className="modal-body-function-right">
                        <i className="far fa-bookmark"></i>
                    </div>
                </div>
                <div className="modal-body-info">
                    <a>좋아요 {this.props.likes}개</a>
                    <a className="moment-info">{moment(this.props.regDate, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow()}</a>
                </div>
                <div className="modal-body-comments">
                    {(this.state.comments.length > 0)?
                        this.state.comments.map( (comment, i) => (
                            <div className="comment-wrap" key={comment.seq} number={i}>
                                <div className="comment-author">
                                    <div className="comment-author-profile">
                                        <a href="#">
                                            <img
                                                width={32}
                                                height={32}
                                                src={require('../../../../public/uploads/' + comment.profile_img)}
                                                alt='profile image'
                                                onError={(e)=>{e.target.onerror = null; e.target.src=require('../../../resources/mypage/images/profile_img.jpg')}}
                                            />
                                        </a>
                                        <a href={'#'}>{comment.nickname}</a>
                                    </div>
                                    <div className="comment-registration-date">
                                        <a className="moment-info">{moment(comment.reg_date, 'YYYY-MM-DDTHH:mm:ss.SSS').fromNow()}</a>
                                        {(this.state.currentUser.email === comment.email)
                                            ?<div className="comment-function">
                                                <i className="fa fa-edit"/>&nbsp;
                                                <i className="fa fa-trash-alt"/>
                                            </div>
                                            :'불일치'}
                                    </div>
                                </div>
                                <div className="comment-body">
                                    <div className="comment-body-content">
                                        &nbsp;&nbsp;{comment.content}
                                    </div>
                                </div>
                            </div>
                        ))
                    :'등록된 댓글이 없습니다 :)'}
                    <br/>
                </div>
                <div className="modal-body-write-comment">
                    <form onSubmit={this.createComment}>
                        <input type="text"
                               value={this.state.content}
                               placeholder={(this.state.currentUser === '')?"로그인이 필요합니다.":"댓글 입력..."}
                               disabled={(this.state.currentUser === '')?true:false}
                               onChange={this.handleCommentContent}
                        />
                    </form>
                </div>
            </div>
        )
    }
}

export default TalkModalBody;