import React, { Component } from 'react';
import GuideDes from './guide_des';
import GuideHeader from './guide_Header';

import '../../resources/guide/css/guideMake.css';

//draft editor
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
//import htmlToDraft from 'html-to-draftjs';

class GuideMake extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      text: '',
      file: '',
      imagePreviewUrl: '',
      desform: '',
      submitBtn: <input className="tour-submit-btn" type="submit" value="저장 후 다음" />,
      desData: [
        { des_name: '', des_img: '', des_description: '', postcode: '', address: '', address_detail: '', start_time: '', end_time: '' }
      ],
      readOnly: false,
      users: [],
      uploadBtn: '',
      tour_seq: '',
      des_list: '',
      tourUpload: false
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.desHandler = this.desHandler.bind(this);
    this.upLoadonClick = this.upLoadonClick.bind(this);
  }

  //login info
  componentDidMount() {
    fetch('http://localhost:3002/users/getUser', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.email !== undefined)
          this.setState({ users: data })
      }
      );
  }

  //tour 저장후다음 -> des
  onSubmitHandler(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', this.state.users.email);
    formData.append('companyname', this.state.users.companyname);
    formData.append('category', e.target.category.value);
    formData.append('title', e.target.title.value);
    formData.append('content', this.state.text);
    formData.append('thumbnail', e.target.thumbnail.files[0]);
    formData.append('min_people', e.target.min_people.value);
    formData.append('max_people', e.target.max_people.value);
    formData.append('price', e.target.price.value);

    fetch('http://localhost:3002/guide/makeAf', {
      method: 'post',
      body: formData
    })
      .then(res => res.json())
      .then(
        data => this.setState({
          tour_seq: data.result.insertId,
          readOnly: true, //readonly로 다 바꾸기
          desform: <input type="button" className="guide-des-plus-btn" value="경로추가" onClick={this.onSaveHandler}></input>,
          submitBtn: ''
        })
      );
  }


  //editor state
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
      text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
    });
  };

  //editor imageCallback
  uploadImageCallBack(file) {
    let uploadedImages = this.state.uploadedImages;

    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file),
    }
    uploadedImages.push(imageObject);
    this.setState({ uploadedImages: uploadedImages })
    console.log("이미지2 " + JSON.stringify(this.state.uploadedImages));
    return new Promise(
      (resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      }
    );
  }

  //file upload
  handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    console.log("프리뷰 파일: ", file);
    console.log("프리뷰 경로: ", reader.result);

    reader.readAsDataURL(file);
  }

  onSaveHandler() {
    this.setState({
      desform: <GuideDes onClick={this.desHandler} />
    })
  }

  desHandler = (_des_name, _des_img, _des_description, _postcode, _address, _address_detail, _start_time, _end_time) => {
    alert("저장");

    var _desData = Array.from(this.state.desData);
    _desData.push({
      tour_seq: this.state.tour_seq, des_name: _des_name, des_img: _des_img, des_description: _des_description, postcode: _postcode, address: _address,
      address_detail: _address_detail, start_time: _start_time, end_time: _end_time
    });

    this.setState({
      desData: _desData,
      uploadBtn: <input type="button" className="guide-final-submit-btn" onClick={this.upLoadonClick} value="투어 등록" />,
      desform: <input type="button" className="guide-des-plus-btn" value="경로추가" onClick={this.onSaveHandler}></input>
    })
  }


  //경로 등록
  upLoadonClick = (e) => {
    e.preventDefault();
    
    for (let i = 1; i < this.state.desData.length; i++) {

      const formData = new FormData();
      formData.append('tour_seq', this.state.tour_seq);
      formData.append('des_name', this.state.desData[i].des_name);
      formData.append('des_img', this.state.desData[i].des_img);
      formData.append('des_description', this.state.desData[i].des_description);
      formData.append('postcode', this.state.desData[i].postcode);
      formData.append('address', this.state.desData[i].address);
      formData.append('address_detail', this.state.desData[i].address_detail);
      formData.append('start_time', this.state.desData[i].start_time);
      formData.append('end_time', this.state.desData[i].end_time);

      fetch('http://localhost:3002/guide/makeDesAf', {
        method: 'post',
        body: formData
      })
        .then(res => res.json())
        .then(data => console.log(data));
    }
    alert("투어 등록이 되었습니다!");
    this.setState({
      tourUpload:true
    })
  }

  render() {
    const { editorState } = this.state;   
    if(this.state.tourUpload){
      return window.location = "/guide/main";
    }
    return (
      <div className="container">
        <GuideHeader />
        <div className="guide-make-h"><span className="guide-make-s"> 1 > 투어 등록</span><img className='guide-tour-img' src={require('../../resources/guide/images/map.png')} /></div>
        <div className='guide-make-form-div'>
          <form onSubmit={this.onSubmitHandler} encType='multipart/form-data'>
            <div className='guide-make-info-div'>

              <div className='guide-titleSpan'>
                <span>투어 제목</span>
              </div>
              <div className='guide-input'>
                <input type="text" name="title" className="guide-form-input" readOnly={this.state.readOnly} placeHolder="투어 제목" />
              </div><br />

              <div className='guide-titleSpan'>
                <span>투어 지역</span>
              </div>
              <div className='guide-input'>
                <select className='guide-input-category' name="category">
                  <option value="서울">서울</option>
                  <option value="인천">인천</option>
                  <option value="경기">경기</option>
                  <option value="충청도">충청도</option>
                  <option value="강원도">강원도</option>
                  <option value="전라도">전라도</option>
                  <option value="경상도">경상도</option>
                  <option value="제주도">제주도</option>
                </select>
              </div><br />

              <div className='guide-titleSpan'>
                <span>대표사진</span>
              </div>
              <div className='guide-input'>
                <input type="file" name="thumbnail" onChange={this.handleImageChange} />
              </div><br />

              <div className='guide-titleSpan'>
                <span>[최소-최대]인원</span>
              </div>
              <div className='guide-input'>
                <input type="text" className="guide-form-input" name="min_people" readOnly={this.state.readOnly} placeHolder="최소 인원" />명 ~ <input type="text" className="guide-form-input" name="max_people" readOnly={this.state.readOnly} placeHolder="최대 인원" />명
              </div><br />

              <div className='guide-titleSpan'>
                <span>투어 비용</span>
              </div>
              <div className='guide-input'>
                <input type="text" className="guide-form-input" name="price" readOnly={this.state.readOnly} placeHolder="금액" /> 원  <span className='guide-price-info'>*인당 비용입니다.</span>
              </div><br /><br />

              <div className='guide-tourinfoSpan'>
                <span>* 투어에 대한 설명을 적어주세요</span>
              </div>
              <div className='guide-make-editor-div'>
                <div className="App">
                  <header className="App-header">
                    <Editor
                      className='draft-editor'
                      localization={{ locale: 'ko' }}
                      readOnly={this.state.readOnly}
                      name="content"
                      editorState={editorState}
                      toolbarClassName="toolbarClassName"
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      onEditorStateChange={this.onEditorStateChange}
                      toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                        image: { uploadCallback: this.uploadImageCallBack, previewImage: true },
                        inputAccept: 'application/pdf,text/plain,application/vnd.openxmlformatsofficedocument.wordprocessingml.document,application/msword,application/vnd.ms-excel'
                      }}
                    />
                  </header>
                </div>
              </div>
              {this.state.des_list}
              <br /><br />{this.state.desform}<br /><br /><br />
              {this.state.uploadBtn}
              {this.state.submitBtn}
            </div>
          </form>
        </div>
      </div>

    );
  }
}
export default GuideMake;


