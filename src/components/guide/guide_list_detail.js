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
            isLoaded: false,
            reserCount: 0,
            reviewCount: 0,
            scrapCount:0
        }
        // this.updateBtn = this.updateBtn.bind(this);
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

    // updateBtn = (e) =>{
    //     e.preventDefault();
    //     alert("수정");
    // }

    deleteBtn = (e) => {
        e.preventDefault();
        if(window.confirm('투어를 삭제합니다.')){
            let email = this.props.location.state.users.email;
            let tour_seq = this.props.match.params.seq;

            console.log("삭제할 seq: ", tour_seq);

            fetch(`http://localhost:3002/guide/guideDelReser?seq=${tour_seq}`)
            .then(res => res.json())
            .then(data => {
                this.setState({reserCount:data.count});
                console.log(this.state.reserCount);

                fetch(`http://localhost:3002/guide/guideDelReview?seq=${tour_seq}`)
                .then(res => res.json())
                .then(data => { 
                    this.setState({reviewCount:data.count});
                    console.log(this.state.reviewCount);

                    fetch(`http://localhost:3002/guide/guideDelScrap?seq=${tour_seq}`)
                    .then(res => res.json())
                    .then(data => {
                        this.setState({scrapCount:data.count});
                        console.log(this.state.scrapCount);

                        fetch(`http://localhost:3002/guide/guideDelete?seq=${tour_seq}&email=${email}&reser=${this.state.reserCount}&review=${this.state.reviewCount}&scrap=${this.state.scrapCount}`)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            alert("투어가 삭제 되었습니다.");
                            this.props.history.push({
                                pathname: '/guide/list',
                                state: {users: this.props.location.state.users.email}
                              })
                        });
                    })
                })
            })




        }
    }



    render() {
        let { isLoaded, tourInfo, desInfo } = this.state;
        return (
            <div className="container">
                <GuideHeader users={this.props.location.state.users} />
                <div className='guide-detail-div'>
                    <div className='guide-detail-UpDelBtn'>
                        {/* <input type='button' className='guide-detail-UpBtn' onClick={this.updateBtn} value='Edit'></input> */}
                        <input type='button' className='guide-detail-DelBtn' onClick={this.deleteBtn} value='Delete'></input>
                    </div>
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