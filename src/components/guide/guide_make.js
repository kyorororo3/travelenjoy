import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import GuideDes from './guide_des';
import GuideHeader from './guide_Header';
import DesList from './guide_desList';

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
    this.id = 1;
    this.state = {
      email: this.props.location.state.users,
      editorState: EditorState.createEmpty(),
      uploadedImages: [],
      text: '',
      file: '',
      imagePreviewUrl: '',
      desform: '',
      submitBtn: <input className="tour-submit-btn" type="submit" value="저장 후 다음" />,
      desData: [],
      readOnly: false,
      uploadBtn: '',
      tour_seq: '',
      tourUpload: false,
      desListView: '',
      Isdisabled : false,
      Isfile: 'file'
    };
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    this.onSaveHandler = this.onSaveHandler.bind(this);
    this.desHandler = this.desHandler.bind(this);
    this.upLoadonClick = this.upLoadonClick.bind(this);
  }

  //tour 저장후다음 -> des
  onSubmitHandler = (e) => {
    e.preventDefault();

    // this.setState({
    //   readOnly: true, //readonly로 다 바꾸기
    //   desform: <input type="button" className="guide-des-plus-btn" value="경로추가" onClick={this.onSaveHandler}></input>,
    //   submitBtn: '',
    //   email: this.props.location.state.users,
    //   Isdisabled : true,
    //   Isfile: 'hidden'
    // })

    if (e.target.title.value === "") {
      alert("투어 제목을 입력해 주세요");
    }
    else if (e.target.category.value === "") {
      alert("지역을 선택해 주세요");
    }
    else if (e.target.thumbnail.files[0] === undefined) {
      alert("대표사진을 설정해 주세요")
    }
    else if (e.target.min_people.value === "" || e.target.max_people.value === "") {
      alert("참여인원을 입력해 주세요");
    }
    else if (parseInt(e.target.min_people.value) >= parseInt(e.target.max_people.value)) {
      alert("참여인원을 정확하게 입력해 주세요");
    }
    else if (e.target.price.value === "") {
      alert("가격을 입력해 주세요");
    }
    else if (this.state.text === "") {
      alert("내용을 입력해 주세요");
    }
    else {
      const formData = new FormData();
      formData.append('email', this.state.email.email);
      formData.append('companyname', this.state.email.companyname);
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
          data => { 
            this.setState({
              tour_seq: data.result.insertId,
              readOnly: true, //readonly로 다 바꾸기
              desform: <input type="button" className="guide-des-plus-btn" value="경로추가" onClick={this.onSaveHandler}></input>,
              submitBtn: '',
              email: this.props.location.state.users,
              Isdisabled : true,
              Isfile: 'hidden'
            })
          }
        );
    }
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
    reader.readAsDataURL(file);
  }

  onSaveHandler = (e) => {
    e.preventDefault();
    this.setState({
      desform: <GuideDes onClick={this.desHandler} />
    })
  }

  desHandler = (_des_name, _des_img, _des_description, _postcode, _address, _address_detail, _start_time, _end_time) => {
    console.log("make.js -- 들어온 name: ", _des_name);
    alert("경로가 추가되었습니다");

    var _desData = this.state.desData.concat({
      id: this.id++, tour_seq: this.state.tour_seq, des_name: _des_name, des_img: _des_img, des_description: _des_description, postcode: _postcode, address: _address,
      address_detail: _address_detail, start_time: _start_time, end_time: _end_time
    });

    this.setState({
      desData: _desData,
      uploadBtn: <input type="button" className="guide-final-submit-btn" onClick={this.upLoadonClick} value="투어 등록" />,
      desform: <input type="button" className="guide-des-plus-btn" value="경로추가" onClick={this.onSaveHandler}></input>,
      desListView: <DesList key={this.id} desData={_desData} />
    })
    console.log("리스트: ", _desData);
  }


  //경로 등록
  upLoadonClick = e => {

    e.preventDefault();
    for (let i = 0; i < this.state.desData.length; i++) {

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
    alert("가이드님의 투어 등록이 완료되었습니다!");
    this.props.history.push('/guide');
  }

  render() {
    console.log("guide Make render() ", this.state.email)
    const { editorState } = this.state;
    return (
      <div className="container" >
        <GuideHeader users={this.state.email} />
        <div className="guide-make-h"><span className="guide-make-s"> 1 > 투어 등록</span><img className='guide-tour-img' src={require('../../resources/guide/images/map.png')} /></div>
        <div className='guide-make-form-div'>
          <form onSubmit={this.onSubmitHandler} encType='multipart/form-data'>
            <div className='guide-make-info-div'>

              <div className='guide-titleSpan'>
                <span>투어 제목</span>
              </div>
              <div className='guide-input'>
                <input type="text" name="title" className="guide-form-input" readOnly={this.state.readOnly} placeholder="투어 제목" />
              </div><br />

              <div className='guide-titleSpan'>
                <span>투어 지역</span>
              </div>
              <div className='guide-input'>
                <select className='guide-input-category' name="category" disabled={this.state.Isdisabled}>
                  <option value="">선택</option>
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
                <input type={this.state.Isfile} name="thumbnail" onChange={this.handleImageChange} /> {this.state.file !== ""?<img className='pre-img' src={this.state.imagePreviewUrl}/>:null}
              </div><br />

              <div className='guide-titleSpan'>
                <span>[최소-최대]인원</span>
              </div>
              <div className='guide-input'>
                <input type="text" className="guide-form-input" name="min_people" readOnly={this.state.readOnly} placeholder="최소 인원" />명 ~ <input type="text" className="guide-form-input" name="max_people" readOnly={this.state.readOnly} placeholder="최대 인원" />명
              </div><br />

              <div className='guide-titleSpan'>
                <span>투어 비용</span>
              </div>
              <div className='guide-input'>
                <input type="text" className="guide-form-input" name="price" readOnly={this.state.readOnly} placeholder="금액" /> 원  <span className='guide-price-info'>*인당 비용입니다.</span>
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
              {this.state.desListView}<br />
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


