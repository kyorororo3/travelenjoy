import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from './UI/MyTravelList';
import ReviewForm from './UI/MyReviewTableForm';
import { Modal, Media } from 'react-bootstrap';
import ReviewWrite from './UI/ReviewWriteModal';
import ReviewRead from './UI/ReviewReadModal';
class MyReview extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:this.props.location.state.users.email,
            unposted_list: [],
            myReviews: [],
            showWriteModal:false,
            tour:[],
            review:[],
            isReloaded:false
        }
    }
    componentDidMount() {
        fetch(`http://localhost:3002/mypage/review?command=unposted&email=${this.state.email}`)
          .then(res => res.json())
          .then(data => this.setState({
            unposted_list: data,
            isLoaded: true
            })
        );
        fetch(`http://localhost:3002/mypage/review?command=completed&email=${this.state.email}`)
          .then(res => res.json())
          .then(data => this.setState({
              myReviews:data
          }))
    }
    
    

    CallbackFromTravel = async(dataFromChild) =>{
        await this.setState({
            showWriteModal:dataFromChild.showWriteModal,
            tour:dataFromChild.tour,
            isReloaded:dataFromChild.isReloaded
        })
        if(this.state.isReloaded){
            window.location.reload();
        }
    }

    CallbackFromReview = async(dataFromChild) =>{
        await this.setState({
            showReadModal:dataFromChild.showReadModal,
            review:dataFromChild.review,
            isReloaded:dataFromChild.isReloaded
        })
        if(this.state.isReloaded){
            window.location.reload();
        }
    }
    ModalCloser = () => this.setState({showWriteModal:false});

    render(){
        let {unposted_list, myReviews} = this.state;
        
        
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            <div className='wait-myreview-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;Wait For Your Review</p>
                                <div className='travel-wrapper'>
                                    {unposted_list.length !== 0? unposted_list.map((tour,index) =>  <TravelList key={index} tour={tour} command='myreview' callbackFromParent={this.CallbackFromTravel}/>):<h5>Nothing to review</h5>}
                                    <div className='myreview-paging prev' onClick={this.prevlist}>
                                        <i className="fas fa-chevron-left" style={{color:"#abbff6"}}/>
                                    </div>
                                    <div className='myreview-paging next' onClick={this.nextlist}>
                                        <i className="fas fa-chevron-right" style={{color:"#abbff6"}}/>
                                    </div>
                                </div>
                                
                                <Modal show={this.state.showWriteModal} onHide={this.ModalCloser} centered={"true"} dialogClassName="review-write-modal">
                                    <Media.Body>
                                         <ReviewWrite email = {this.state.email}
                                                      tour = {this.state.tour}
                                                      callbackFromParent={this.CallbackFromTravel} /> 
                                    </Media.Body>
                                </Modal>  
                            </div>
                            <div className='done-myreview-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Reviews</p>
                                <div className='review-table'>
                                    <div className='review-table-row fixed-row'>
                                        <span class='fixed-title star'>Score</span>
                                        <span class='fixed-title thumb'>Title</span>
                                        <span class='fixed-title wdate'>Registered</span>
                                    </div>
                                        {myReviews.length !== 0? myReviews.map((review, index) => <ReviewForm key={index} review={review} callbackFromParent={this.CallbackFromReview}/>):<h5>No Results</h5>}
                                </div>
                                <Modal show={this.state.showReadModal} onHide={this.ModalCloser} centered={"true"} dialogClassName="review-write-modal">
                                    <Media.Body>
                                         <ReviewRead  email = {this.state.email}
                                                      review = {this.state.review}
                                                      callbackFromParent={this.CallbackFromReview} /> 
                                    </Media.Body>
                                </Modal>  
                            </div>

                        </div>
                    </div>
            </div>
        );
    }
}


export default MyReview;