import React, { Component } from 'react';


class GuideDeDesVal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { des_name, des_img, des_description, postcode, address, address_detail, start_time, end_time } = this.props.list
        return (
            <div className="guide-detail-des-div">
                <img className='guide-detail-des-icon' src={require('../../resources/guide/images/destination.png')} />
                <table className="guide-detail-des-table">
                    <tbody>
                        <tr>
                            <th>장소 이름</th>
                            <td>{des_name}</td>
                        </tr>
                        <tr>
                            <th>장소 설명</th>
                            <td>{des_description}</td>
                        </tr>
                        <tr>
                            <th>대표 사진</th>
                            <td><img className="guide-detail-des-img" src={require(`../../uploads/${des_img}`)} alt="no img" /></td>
                        </tr>
                        <tr>
                            <th>장소 주소</th>
                            <td>{postcode} {address} {address_detail}</td>
                        </tr>
                        <tr>
                            <th>투어 시간</th>
                            <td>{start_time}시 ~ {end_time}시</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

export default GuideDeDesVal;