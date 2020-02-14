import React, { Component } from 'react';
import '../../resources/guide/css/guideMake.css';

class GuideDes extends Component {

    constructor(props) {
        super(props);
        this.state = {
            des_name: '',
            des_img: '',
            des_description: '',
            postcode: '',
            address: '',
            address_detail: '',
            start_time: '',
            end_time: '',
            file: '',
            imagePreviewUrl: ''
        }
        this.sample6_execDaumPostcode = this.sample6_execDaumPostcode.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
        this.inputFormHandler = this.inputFormHandler.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
    }

    componentDidMount() {
        const script = document.createElement('script');
        script.async = true;
        script.src = "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js?autoload=false";
        document.head.appendChild(script);
    }


    sample6_execDaumPostcode() {
        window.daum.postcode.load(function () {
            new window.daum.Postcode({
                oncomplete: function (data) {
                    // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    var addr = ''; // 주소 변수

                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 우편번호와 주소 정보를 해당 필드에 넣는다.
                    document.getElementById('sample6_postcode').value = data.zonecode;
                    document.getElementById("sample6_address").value = addr;

                    // 커서를 상세주소 필드로 이동한다.
                    document.getElementById("sample6_detailAddress").focus();
                }
            }).open();
        })
    }

    onSubmitHandler(e) {
        e.preventDefault();
        //console.log("des.js값 : " ,this.state.des_name);
        //console.log("des.js값 : " ,document.getElementById('sample6_postcode').value);
        if (this.state.des_name === "") {
            alert("장소 이름을 입력해 주세요");
        }
        else if (document.getElementById('sample6_postcode').value === "" || document.getElementById("sample6_address").value === "") {
            alert("장소 위치를 입력해 주세요");
        }
        else if (this.state.des_img === undefined || this.state.des_img === "") {
            alert("대표사진을 설정해 주세요");
        }
        else if (this.state.des_description === "") {
            alert("설명을 입력해 주세요");
        }
        else if (this.state.start_time === "" || this.state.end_time === "") {
            alert("시간을 선택해 주세요");
        }
        else if (parseInt(this.state.start_time) >= parseInt(this.state.end_time)) {
            alert("시간을 다시 선택해주세요");
        }

        else {
            this.props.onClick(
                this.state.des_name,
                this.state.des_img,
                this.state.des_description,
                document.getElementById('sample6_postcode').value,
                document.getElementById("sample6_address").value,
                this.state.address_detail,
                this.state.start_time,
                this.state.end_time
            )
        }
    }

    inputFormHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    handleImageChange(e) {
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
        this.setState({
            des_img: file
        })
    }

    render() {
        return (
            <div>
                <div className="guide-make-h"><span className="guide-make-s"> 2 > 경로 등록</span><img className='guide-tour-img' src={require('../../resources/guide/images/address.png')} /></div>
                <div className='guide-make-des-div'>
                    <div className='guide-titleSpan'>
                        <span>장소 이름</span>
                    </div>
                    <div className='guide-input'>
                        <input name="des_name" className="guide-form-input" type="text" onChange={this.inputFormHandler}></input>
                    </div><br />

                    <div className='guide-titleSpan-desapi'>
                        <span>장소 위치</span>
                    </div>
                    <div className='guide-input-desapi'>
                        <input type="text" className="guide-form-input" id="sample6_postcode" name="postcode" placeholder="우편번호" />
                        <input type="button" className="des-fine-btn" onClick={this.sample6_execDaumPostcode} value="찾기" /><br />
                        <input type="text" className="guide-form-input" id="sample6_address" name="address" placeholder="주소" />&nbsp;
                        <input type="text" className="guide-form-input" id="sample6_detailAddress" name="address_detail" placeholder="상세주소" onChange={this.inputFormHandler} />
                    </div><br />

                    <div className='guide-titleSpan'>
                        <span>대표 사진</span>
                    </div>
                    <div className='guide-input'>
                        <input type="file" name="des_img" onChange={this.handleImageChange} ></input>{this.state.file !== ""?<img className='pre-img' src={this.state.imagePreviewUrl}/>:null}
                    </div><br />

                    <div className='guide-titleSpan'>
                        <span>장소 설명</span>
                    </div>
                    <div className='guide-input'>
                        <textarea name="des_description" onChange={this.inputFormHandler} />
                        <div className='guide-tourinfoSpan'>
                            <span> * 장소에 대한 설명을 간단하게 적어주세요</span>
                        </div>
                    </div><br />

                    <div className='guide-titleSpan'>
                        <span>투어 시간</span>
                    </div>
                    <div className='guide-input'>
                        <select className='guide-input-time' name='start_time' onChange={this.inputFormHandler}>
                            <option> - </option>
                            <option value="9">9시</option>
                            <option value="10">10시</option>
                            <option value="11">11시</option>
                            <option value="12">12시</option>
                            <option value="13">13시</option>
                            <option value="14">14시</option>
                            <option value="15">15시</option>
                            <option value="16">16시</option>
                            <option value="17">17시</option>
                            <option value="18">18시</option>
                            <option value="19">19시</option>
                            <option value="20">20시</option>
                            <option value="21">21시</option>
                        </select>
                        ~
                            <select className='guide-input-time' name='end_time' onChange={this.inputFormHandler}>
                            <option> - </option>
                            <option value="9">9시</option>
                            <option value="10">10시</option>
                            <option value="11">11시</option>
                            <option value="12">12시</option>
                            <option value="13">13시</option>
                            <option value="14">14시</option>
                            <option value="15">15시</option>
                            <option value="16">16시</option>
                            <option value="17">17시</option>
                            <option value="18">18시</option>
                            <option value="19">19시</option>
                            <option value="20">20시</option>
                            <option value="21">21시</option>
                        </select>
                    </div><br />

                    <input type="button" className="guide-des-Btn" onClick={this.onSubmitHandler} value="저장"></input>
                </div>
            </div>
        )
    }
}

export default GuideDes;