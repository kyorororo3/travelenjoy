import React, { createRef, Component } from 'react';
import {Form} from "react-bootstrap";

//https://github.com/SinghDigamber/react-image-preview

export default class MultipleImageUploader extends Component {

    fileObj = [];
    fileArray = [];
    imageList = [];

    file = '';

    constructor(props) {
        super(props)
        this.state = {
            file: [null],
            isFileUploaded: false,
            contentText: ''
        }
        this.contentRef = React.createRef();
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
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
        formData.append("content", this.state.contentText);

        fetch('http://localhost:3002/freetalk/free/save/images', {
            method:'post',
            body: formData
        })
            .then(res => res.json())
            .then(data => console.log(data));

        console.log('this.state.file ' + this.state.file);
    }

    onSubmitHandler(e){
        e.preventDefault();
    }

    contentTextOnChange = (e) => {
        e.preventDefault()
        this.setState({contentText: e.target.value} );
    }

    render() {
        return (
            <div className="uploader-wrap">
                {/*<div className="write-content">*/}
                {/*    <input type="text" placeholder="문구 입력..."/>*/}
                {/*</div>*/}
                {/*<form encType='multipart/form-data' onSubmit={this.onSubmitHandler}>*/}


                {/*    <div className="form-group">*/}
                {/*        <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />*/}
                {/*    </div>*/}
                {/*    <button type="button" id="btnFileSubmit" className="btn btn-danger btn-block" onClick={this.uploadFiles}>Upload</button>*/}
                {/*    <input type="submit" value="제출테스트"/>*/}
                {/*</form>*/}
                <Form encType='multipart/form-data' onSubmit={this.onSubmitHandler}>
                    <Form.Group controlId="formGroupContent">
                        <Form.Label>문구 입력...</Form.Label>
                        {/*<input type="text" className="form-control" ref={this.contentRef} placeholder="문구 입력..."/>*/}
                        <Form.Control id="contentText" type="text" placeholder="문구 입력..." onChange={this.contentTextOnChange}/>
                    </Form.Group>
                    <div className="form-group multi-preview">
                        {(this.fileArray || []).map((url, i) => (
                            <img key={i} src={url} alt="..." />
                        ))}
                    </div>
                    <Form.Group controlId="formGroupFiles">
                        <Form.Label>사진 선택</Form.Label>
                        <Form.Control type="file" onChange={this.uploadMultipleFiles} multiple disabled={this.state.isFileUploaded}/>
                    </Form.Group>
                    <button type="button" id="btnFileSubmit" className="btn btn-primary" onClick={this.uploadFiles} disabled={!this.state.isFileUploaded}>Upload</button>
                </Form>
            </div>
        )
    }
}