import React, {Component} from 'react';

//draft editor
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class GuideMake extends Component{
    constructor(props){
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
            uploadedImages:[],
            text:'',
            file : '',
            imagePreviewUrl: ''
        };
        this.onSubmitHandler =this.onSubmitHandler.bind(this);
        this.onEditorStateChange =this.onEditorStateChange.bind(this);
        this.uploadImageCallBack = this.uploadImageCallBack.bind(this);
    }

    onSubmitHandler(e){
        e.preventDefault();
        alert(e.target.title.value);
        alert(this.state.text);
        
        const data = {};
        var formData = Object.assign({},data);
        formData = {
          category :e.target.category.value,
          title :e.target.title.value,
          content : this.state.text,
          thumbnail :  this.state.file,
          period: e.target.period.value,
          min_people : e.target.min_people.value,
          max_people : e.target.max_people.value,
          price: e.target.price.value
        }

        console.log("data! " , formData);

        fetch('http://localhost:3002/guide/makeAf', {
          method:'post',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify(formData)
      })
      .then(res => res.json())
      .then(data => console.log(data));
    }

    onEditorStateChange(editorState){
        this.setState({
          editorState,
          text: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        });
    };

    uploadImageCallBack(file){
        let uploadedImages = this.state.uploadedImages;
        const imageObject = {
          file: file,
          localSrc: URL.createObjectURL(file),
        }
        uploadedImages.push(imageObject);   
        this.setState({uploadedImages: uploadedImages})
        console.log("이미지업로드 경로: " + imageObject.localSrc);
        return new Promise(
          (resolve, reject) => {
            resolve({ data: { link: imageObject.localSrc } });
          }
        );
    }

    handleImageChange = e => {
      e.preventDefault();  
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({ file: file, imagePreviewUrl: reader.result });
      };
      console.log("프리뷰 파일: " ,file);
      console.log("프리뷰 경로: " ,reader.result);

      reader.readAsDataURL(file);
    };

    render(){
        const { editorState } = this.state;
        return(
            <form encType='multipart/form-data'
                    onSubmit={this.onSubmitHandler}>
               제목: <input type="text" name="title"/><br/>
               투어 지역: <select name="category">
                            <option value="서울">서울</option>
                            <option value="인천">인천</option>
                            <option value="경기">경기</option>
                            <option value="충청도">충청도</option>
                            <option value="강원도">강원도</option>    
                            <option value="전라도">전라도</option>
                            <option value="경상도">경상도</option>
                            <option value="제주도">제주도</option>
                          </select><br/>
               대표사진:<input type="file" name="thumbnail" onChange={this.handleImageChange}/><br/>             
               최소인원:<input type="text" name="min_people"/><br/>
               최대인원:<input type="text" name="max_people"/><br/>
               가격:<input type="text" name="price"/><br/>
               투어기간: <input type="text" name="period"/><br/>
               내용: 
                    <div className="App">
                        <header className="App-header">
                            <Editor
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
               <input type="submit" value="등록"/>
            </form>
            
        );
    }
}
export default GuideMake;



