import React, {Component} from "react";
import {Media, Modal} from 'react-bootstrap';

//게시물 작성버튼
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class TalkWriteBtn extends Component {

    state = {
        file: 'cat19.jpg',
        images: []
    }

    componentDidMount() {
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
    handleShow = () => this.setState({showModal: true});

    render() {
        const instagramIconStyle = {
            fontSize: "100px",
            display: "inline-block",
            position: "sticky",
            top: "100px",
            left: "85%",
            right: "100px",
            bottom: "15%",
            background: "white",
            width: "150px",
            height: "150px",
            borderRadius: "100px",
            textAlign: "center",
            verticalAlign: "middle",
            paddingTop: "22px",
            cursor: "pointer"
        }
        return (
            <div className="talk-write-wrap" onClick={this.handleOnClickTalk}>
                <Modal show={this.state.showModal} onHide={this.handleClose} centered={"true"}>
                    <Media.Body>
                        <div className="talk-write-body-wrap">
                            <div className="write-file">

                            </div>
                            <div className="write-content">

                            </div>
                            <div className="write-friends">

                            </div>
                            <div className="write-location">

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