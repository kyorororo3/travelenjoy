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
            isReloaded:false,
            currentPage:0,
            prev:false,
            next:true,
            total:undefined
        }
        this.checkTotalFetcher = this.checkTotalFetcher.bind(this);
    }
    componentDidMount() {
        const {email, currentPage} = this.state;
        fetch(`http://localhost:3002/mypage/review?command=unposted&email=${email}&currentPage=${currentPage}`)
          .then(res => res.json())
          .then(data => this.setState({
            unposted_list: data,
            currentPage:3
            })
        
        );
        fetch(`http://localhost:3002/mypage/review/length?email=${email}`)
            .then(res => res.json())
            .then(data => this.setState({
                total:data.length
            }, () =>{
                const {total} = this.state;
                if(total <= 3){
                    this.setState({next:false})
                }else{
                    this.setState({next:true})
                }
            })
        );
       
        fetch(`http://localhost:3002/mypage/review?command=completed&email=${email}`)
          .then(res => res.json())
          .then(data => this.setState({
              myReviews:data
          }))
          console.log('total check ', this.state.total , 'state check', this.state.prev, 'check', this.state.next );
    }
    
    
    shouldComponentUpdate(nextProps, nextState){
        return this.state !== nextState
    }

    checkTotalFetcher = async (email,currentPage) =>{

       await fetch(`http://localhost:3002/mypage/review/length?email=${email}`)
            .then(res => res.json())
            .then(data => this.setState({
                total:data.length
            }, async() =>{
                const {total} = this.state;
                if(currentPage <= 0 && total <= 3) {
                    await this.setState({ prev:false, next:false })
                }else{
                    if(currentPage <3){
                        await this.setState({ prev:false, next:true})
                    }else if(total <= currentPage){
                        console.log('여기들어왔니');
                        await this.setState({ prev:true, next:false})
                    }
                    else{
                        await this.setState({ prev:true, next:true})
                    }
                }
                
            })
        );
        console.log('total', this.state.total, 'current', this.state.currentPage);
    }
    

    prevBtnHandler = (e) =>{
      
        let {email, currentPage} = this.state;
        fetch(`http://localhost:3002/mypage/review?command=unposted&email=${email}&currentPage=${currentPage}`)
          .then(res => res.json())
          .then(data => this.setState({
            unposted_list: data,
            currentPage:currentPage - 3
            })
        );
        this.checkTotalFetcher(email,currentPage);
    }

    nextBtnHandler = (e) =>{
       
        let {email, currentPage} = this.state;
        fetch(`http://localhost:3002/mypage/review?command=unposted&email=${email}&currentPage=${currentPage}`)
          .then(res => res.json())
          .then(data => this.setState({
            unposted_list: data,
            currentPage:currentPage + 3
            })
        );

        this.checkTotalFetcher(email,currentPage);
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
        let {unposted_list, myReviews, prev, next} = this.state;
        
        
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            <div className='wait-myreview-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;Wait For Your Review</p>
                                <div className='travel-wrapper'>
                                    {unposted_list.length !== 0? unposted_list.map(tour =>  <TravelList key={tour.res_seq} tour={tour} command='myreview' callbackFromParent={this.CallbackFromTravel}/>):<h5>Nothing to review</h5>}
                                    {prev && <div className='myreview-paging prev' onClick={this.prevBtnHandler}>
                                        <i className="fas fa-chevron-left" style={{color:"#abbff6"}}/>
                                    </div>}
                                    {next && <div className='myreview-paging next' onClick={this.nextBtnHandler}>
                                        <i className="fas fa-chevron-right" style={{color:"#abbff6"}}/>
                                    </div>}
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