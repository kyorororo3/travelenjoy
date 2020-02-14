import React, { Component } from 'react';
import Popup from './guide_popup';

class GuideDeTour extends Component {
    constructor(props) {
        super(props);
        this.state={
            tourMember : [],
            showPopup : false
        }
        this.Clickhandler = this.Clickhandler.bind(this);
    }

    Clickhandler = (e) => {
        e.preventDefault();
        let seq = this.props.tour.seq;

        this.setState({
            showPopup: !this.state.showPopup
        })

        fetch(`http://localhost:3002/guide/reservationList?seq=${seq}`)
        .then(res => res.json())
        .then(data => {this.setState({tourMember:data});
                        console.log(data)});
    }

    render() {
        const { seq, email, category, title, content, thumbnail, min_people, max_people, price } = this.props.tour;
        return (
            <div>
                <div className='guide-detail-title'><img className='guide-tour-img' src={require('../../resources/guide/images/bus.png')} /><span className='detail-title-span'>나의 투어</span></div>
                <table className='guide-detail-table'>
                    <tbody>
                        <tr>
                            <th>투어 제목</th>
                            <td>{title}</td>
                        </tr>
                        <tr>
                            <th>투어 지역</th>
                            <td>{category}</td>
                        </tr>
                        <tr>
                            <th>대표 사진</th>
                            <td><img className="guide-detail-img" src={require(`../../uploads/${thumbnail}`)} alt="no img" /></td>
                        </tr>
                        <tr>
                            <th>[최소-최대] 인원</th>
                            <td>[ {min_people} - {max_people} ] 명</td>
                        </tr>
                        <tr>
                            <th>투어 비용</th>
                            <td>{price} 원</td>
                        </tr>
                        <tr>
                            <th>참여 회원</th>
                            <td><input type="button" onClick={this.Clickhandler} value="참여회원 보기" /></td>
                        </tr>
                        <tr>
                            <th colSpan="2">투어 설명</th>
                        </tr>
                        <tr>
                            <td colSpan="2"><div dangerouslySetInnerHTML={{ __html: content }} /></td>
                        </tr>
                    </tbody>
                </table>
                {this.state.showPopup ?
                    <Popup
                        closePopup={this.Clickhandler}
                        tourMem={this.state.tourMember}
                    />
                    : null
                }
            </div>

        )
    }
}

export default GuideDeTour;