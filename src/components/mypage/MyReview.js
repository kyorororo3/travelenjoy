import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from '../travel/list/travellist_obj';
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
            review:[]
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
    

    CallbackFromTravel = (dataFromChild) =>{
        this.setState({
            showWriteModal:dataFromChild.showWriteModal,
            tour:dataFromChild.tour
        })
    }

    CallbackFromReview = (dataFromChild) =>{
        this.setState({
            showReadModal:dataFromChild.showReadModal,
            review:dataFromChild.review
        })
    }
    ModalCloser = () => this.setState({showWriteModal:false});

    render(){
        let {unposted_list, myReviews} = this.state;
        const command = 'myreview';
        
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            <div className='wait-myreview-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;Wait for your review</p>
                                <div className='travel-wrapper'>
                                    {unposted_list.length !== 0? unposted_list.map(tour =>  <TravelList key={tour.seq} tour={tour} command={command} callbackFromParent={this.CallbackFromTravel}/>):<h5>Nothing to review</h5>}
                                </div>
                                <Modal show={this.state.showWriteModal} onHide={this.ModalCloser} centered={"true"} dialogClassName="review-write-modal">
                                    <Media.Body>
                                         <ReviewWrite email = {this.state.email}
                                                      tour = {this.state.tour}
                                                      review = {this.state.review}
                                                      callbackFromParent={this.CallbackFromTravel} /> 
                                    </Media.Body>
                                </Modal>  
                            </div>
                            <div className='done-myreview-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Reviews</p>
                                <div className='review-table'>
                                    {myReviews.length !== 0? myReviews.map(review => <ReviewForm key={review.seq} review={review} callbackFromParent={this.CallbackFromReview}/>):<h5>Nothing to review</h5>}
                                </div>
                                <Modal show={this.state.showReadModal} onHide={this.ModalCloser} centered={"true"} dialogClassName="review-write-modal">
                                    <Media.Body>
                                         <ReviewRead  email = {this.state.email}
                                                      tour = {this.state.tour}
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