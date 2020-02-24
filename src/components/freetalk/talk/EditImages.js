import React, {Component} from "react";
import {Modal, Button, Row, Col, Media, Carousel, Dropdown, Form} from 'react-bootstrap';
import '../../../resources/freetalk/css/edit_talk_image.css'


//게시물
//modal 문서 : https://react-bootstrap.github.io/components/modal/

class EditImages extends Component {

    fileObj = [];
    fileArray = [];

    file = '';

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            isFileUploaded: false,
            contentText: '',
            currentUser: {},
            seq: this.props.seq
        }
        this.contentRef = React.createRef();
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)

        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                    if(data.email !== undefined) {
                        this.setState({currentUser: data})
                    }
                }
            );
    }

    uploadMultipleFiles(e) {
        let file = e.target.files[0];
        this.fileObj.push(e.target.files)
        console.log(e.target.files[0])
        this.setState({file: this.fileObj[0][0]})
        for (let i = 0; i < this.fileObj[0].length; i++) {
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
            console.log('type : ' + this.fileObj[0][i].type)
        }

        for(let i = 0 ; i < this.fileArray.length ; i++) {
            console.log(i + ' ' + this.fileArray[0])
        }

        this.setState({ file: this.fileArray })

        let reader = new FileReader();

        reader.readAsArrayBuffer(this.fileObj[0][0]);

        reader.onloadend = () => {
            this.setState({ file: file, imagePreviewUrl: reader.result });
        };
        this.setState({isFileUploaded: true});
    }

    uploadFiles = (e) => {
        e.preventDefault()

        let fileList = [];
        fileList.push(this.fileObj[0][0])
        fileList.push(this.fileObj[0][1])

        let formData = new FormData();
        for(let file of this.fileObj[0]){
            formData.append("files", file);
        }
        formData.append("seq", this.state.seq)

        fetch('http://localhost:3002/freetalk/free/update/images', {
            method:'post',
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data));

        console.log('this.state.file ' + this.state.file);
        alert('수정이 완료되었습니다.')
        this.handleClose();

    }

    handleClose = () => this.props.handleCloseEditImage();

    onSubmitHandler(e){
        e.preventDefault();
    }

    render() {
        return (
            <div className="edit-images-wrap">
                <Form encType='multipart/form-data' onSubmit={this.onSubmitHandler}>
                    <div className="form-group multi-preview">
                        {(this.fileArray || []).map((url, i) => (
                            <img key={i} src={url} alt="..." />
                        ))}
                    </div>
                    <Form.Group controlId="formGroupFiles">
                        <Form.Label>사진 선택</Form.Label>
                        <Form.Control type="file" onChange={this.uploadMultipleFiles} multiple disabled={this.state.isFileUploaded}/>
                    </Form.Group>
                    <button type="button" id="btnFileSubmit" className="btn btn-primary" onClick={this.uploadFiles} disabled={!this.state.isFileUploaded}>Save</button>
                </Form>
            </div>
        )
    }
}

export default EditImages;