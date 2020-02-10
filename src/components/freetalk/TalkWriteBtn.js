import React, {Component} from "react";
import {Media, Modal} from 'react-bootstrap';
import MultipleImageUploader from './uploader/MultipleImageUploader';
import '../../resources/freetalk/css/free_talk_write.css'

//게시물 작성버튼
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class TalkWriteBtn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            file: 'cat19.jpg',
            images: [],
            currentUser: this.props.getCurrentUser
        }
    }

    componentDidMount() {
        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                    if(data.email !== undefined)
                        this.setState({currentUser : JSON.stringify(data)})
                }
            );
        // fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
        //     .then(res => res.json())
        //     .then(res => this.setState({images: res.images}))
        //     .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
    }

    handleHover = (e) => {
        console.log('handle hover');
    }
    handleOnClickTalk = () => {
    }

    handleClose = () => this.setState({showModal: false});
    handleShow = () => {
        if (this.state.currentUser === '') {
            alert('로그인이 필요합니다.');
           return;
        }
        this.setState({showModal: true});
    }

    reloadMain = () => this.props.reloadMain();

    render() {
        const instagramIconStyle = {
            fontSize: "100px",
            display: "inline-block",
            position: "sticky",
            top: "100px",
            left: "82%",
            right: "130px",
            bottom: "5%",
            background: "rgba(255, 255, 255, 0.8)",
            width: "150px",
            height: "125px",
            borderRadius: "100px",
            border: "0.1px solid",
            textAlign: "center",
            verticalAlign: "middle",
            paddingTop: "22px",
            cursor: "pointer"
        }
        return (
            <div className="talk-write-wrap" onClick={this.handleOnClickTalk}>
                <Modal id="talk-write-modal" show={this.state.showModal} onHide={this.handleClose} centered={"true"}>
                    <Media.Body>
                        <div className="talk-write-body-wrap">
                            <div className="write-file">
                                <MultipleImageUploader handleClose={this.handleClose} reloadMain={this.reloadMain}/>
                            </div>
                        </div>
                    </Media.Body>
                </Modal>
                <i className="fab fa-instagram" style={instagramIconStyle} onClick={() => this.handleShow()}></i>
            </div>
        );
    }
}

export default TalkWriteBtn;