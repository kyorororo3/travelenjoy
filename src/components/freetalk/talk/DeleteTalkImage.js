import React, {Component} from "react";
import {Modal, Button, Row, Col, Media, Carousel, Dropdown} from 'react-bootstrap';
import '../../../resources/freetalk/css/delete_talk_image.css'


//게시물
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class DeleteTalkImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            images: this.props.images
        }
    }


    render() {
        return (
            <div className={"delete-talk-image-wrap"}>
                {(this.state.images.length > 0)?
                    this.state.images.map( (image, i) => (
                        <img key={image.seq}
                             src={require('../../../uploads/' + image.name_saved)}/>
                    ))
                    :<img src={require('../../../uploads/' + this.state.file)}/>
                }
            </div>
        );
    }
}

export default DeleteTalkImage;