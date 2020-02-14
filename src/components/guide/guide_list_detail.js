import React, { Component, Fragment } from 'react';

import GuideDeTour from './guide_de_tour';
import GuideDeDes from './guide_de_des';
import GuideHeader from './guide_Header';


class GuideDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tourInfo: undefined,
            desInfo: undefined,
            isLoaded: false
        }
        this.updateBtn = this.updateBtn.bind(this);
        this.deleteBtn = this.deleteBtn.bind(this);
    }

    componentDidMount() {
        let seq = this.props.match.params.seq;
        fetch(`http://localhost:3002/guide/tourDetail?seq=${seq}`)
            .then(res => res.json())
            .then(data => this.setState({
                tourInfo: data.tour_Info,
                desInfo: data.tour_Des,
                isLoaded: true
            })
            );
    }

    updateBtn = (e) =>{
        e.preventDefault();
        alert("수정");
    }

    deleteBtn = (e) => {
        e.preventDefault();
        alert("삭제");
        let tour_seq = this.props.match.params.seq;
        console.log("삭제할 seq: ", tour_seq);

        //fetch(`http://localhost:3002/guide/guideDelete?seq=${tour_seq}`)
    }



    render() {
        let { isLoaded, tourInfo, desInfo } = this.state;
        return (
            <div className="container">
                <GuideHeader users={this.props.location.state.users} />
                <div className='guide-detail-div'>
                    <input type='button' onClick={this.updateBtn} value='수정'></input>
                    <input type='button' onClick={this.deleteBtn} value='삭제'></input>
                    {isLoaded &&
                        (<Fragment>
                            <GuideDeTour tour={tourInfo} />
                            <div className='guide-detail-Destitle'><img className='guide-tour-img' src={require('../../resources/guide/images/journey.png')} /><span className='detail-title-span'>투어 경로</span></div>
                            <GuideDeDes des={desInfo} />
                        </Fragment>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default GuideDetail;