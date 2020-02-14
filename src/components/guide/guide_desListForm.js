import React, { Component } from 'react';

import '../../resources/guide/css/guideMake.css';

class Des_List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { id, des_name, des_description, postcode, address, start_time, end_time } = this.props.desData;
        return (
            <div className="des-List-div">
                <div className="des-List-Num">
                    [{id}번째 경로]
                </div>
                <div className="des-List-span">
                    <span>경로명</span>
                </div>
                <div className="des-List-value">
                    {des_name}
                </div>
                <div className="des-List-span">
                    <span>주소</span>
                </div>
                <div className="des-List-value">
                    {postcode} - {address}
                </div>
                <div className="des-List-span">
                    <span>투어시간</span>
                </div>
                <div className="des-List-value">
                    {start_time}시 ~ {end_time}시
                </div> 
            </div>
        )
    }
}

export default Des_List;