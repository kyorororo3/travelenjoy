import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from './UI/MyTravelList';
import ReviewForm from './UI/MyReviewTableForm';
import { Modal, Media } from 'react-bootstrap';
import ReviewWrite from './UI/ReviewWriteModal';
import ReviewRead from './UI/ReviewReadModal';
import Pagination from './UI/Pagination';

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
            unpostedTotal:undefined,
            completedTotal:undefined,
            isLoaded:false
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
        fetch(`http://localhost:3002/mypage/review/length?command=unposted&email=${email}`)
            .then(res => res.json())
            .then(data => this.setState({
                unpostedTotal:data.length
            }, () =>{
                const {unpostedTotal} = this.state;
                if(unpostedTotal <= 3){
                    this.setState({next:false})
                }else{
                    this.setState({next:true})
                }
            })
        );
       
        fetch(`http://localhost:3002/mypage/review?command=completed&email=${email}&pageNumber=${0}`)
          .then(res => res.json())
          .then(data => this.setState({
              myReviews:data
        }))

        fetch(`http://localhost:3002/mypage/review/length?command=completed&email=${email}`)
        .then(res => res.json())
        .then(data => this.setState({
            isLoaded:true,
            completedTotal:data.length
        
        })
      );
    }
    
    
    shouldComponentUpdate(nextProps, nextState){
        return this.state !== nextState
    }

    

    prevBtnHandler = async (e) =>{
        
        await this.setState((prevState) => ({currentPage:prevState.currentPage - 6}))
        let {email, currentPage} = this.state;
        await fetch(`http://localhost:3002/mypage/review?command=unposted&email=${email}&currentPage=${currentPage}`)
          .then(res => res.json())
          .then(data => this.setState((prevState) =>({
            unposted_list: data,
            currentPage:currentPage +3
            }))
        );
        
        this.checkTotalFetcher(email, currentPage);
    }

    nextBtnHandler = async(e) =>{
       
        let {email, currentPage} = this.state;
       await fetch(`http://localhost:3002/mypage/review?command=unposted&email=${email}&currentPage=${currentPage}`)
          .then(res => res.json())
          .then(data => this.setState((prevState) => ({
            unposted_list: data,
            currentPage:prevState.currentPage + 3
            }))
        );

        this.checkTotalFetcher(this.state.email,this.state.currentPage);
    }

    checkTotalFetcher = (email,currentPage) =>{

        fetch(`http://localhost:3002/mypage/review/length?command=unposted&email=${email}`)
            .then(res => res.json())
            .then(data => this.setState({
                unpostedTotal:data.length
            }, async() =>{
                const {unpostedTotal} = this.state;
                if(unpostedTotal < 4) {
                    await this.setState({ prev:false, next:false })
                }else{
                    if(currentPage === 0){
                        console.log( 'if 1 : current가 0 이다 ' , currentPage)
                        await this.setState({ prev:false, next:true})

                    }else if(unpostedTotal <= currentPage){
                        console.log('if 2 : unpostedTotal이 current보다 작아졌다 ', unpostedTotal, currentPage);
                        await this.setState({ prev:true, next:false})
                    
                    }else{
                        console.log('if 3 : unpostedTotal이 current보다 아직 큰 상태', unpostedTotal, currentPage);
                        await this.setState({ prev:true, next:true})
                    }
                }
                
            })
        );
        console.log('unpostedTotal', this.state.unpostedTotal, 'current', this.state.currentPage);
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

    reviewPageFetcher = async(data) => {
        console.log('myTalk 으로 넘어온 페이지 수', data.pageNumber);
        const pageNum = data.pageNumber * 5; 
        const { email } = this.state;
        await fetch(`http://localhost:3002/mypage/review?command=completed&email=${email}&pageNumber=${pageNum}`)
        .then(res => res.json())
        .then(data => this.setState({
            myReviews:data
        })
        );
    }

    ModalCloser = () => this.setState({showWriteModal:false});

    render(){
        let {unposted_list, myReviews, prev, next, isLoaded, completedTotal} = this.state;
        
        
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
                                    {myReviews.length !== 0? myReviews.map(review => <ReviewForm review={review} callbackFromParent={this.CallbackFromReview}/>):<h5>No Results</h5>}
                                </div>
                                {isLoaded ? <Pagination listLength={completedTotal}
                                            pageFetcher={this.reviewPageFetcher}/> : ''}

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