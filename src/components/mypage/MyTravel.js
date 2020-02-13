import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from './UI/MyTravelList';
import { Modal, Media } from 'react-bootstrap';
import ResModal from './UI/ResModal';

class MyTravel extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email:this.props.location.state.users.email,
          status:"Let's make your travel plan with Travel&joy!",
          isChecked:false,
          list: [],
          tour:[],
          currentPage:0,
          isFull: false,
          total: undefined
        }
      }
      componentDidMount() {
        const parameters = {
          search:'', 
          keyword:'', 
          email:this.state.email,
          startPage:this.state.startPage,
          currentPage:this.state.currentPage
        }
        this.fetchListHandler(parameters);
        this.fetchLengthHandler(parameters);
      
       
      }

      fetchListHandler = (parameters) =>{
        fetch(`http://localhost:3002/mypage/travel`,{
          body:JSON.stringify(parameters),
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          method:'post'
        })
          .then(res => res.json())
          .then(data => this.setState({
            list: data,
            isFull: false,
            currentPage:this.state.currentPage
          })
        );
        

      }
      
      fetchLengthHandler = (parameters) =>{
        fetch(`http://localhost:3002/mypage/travel/length`,{
          body:JSON.stringify(parameters),
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          method:'post'
        })
          .then(res => res.json())
          .then(data => this.setState({
              total:data.length
            },() =>{
              const {total, currentPage} = this.state;
              console.log('total제대로 오는가 체크', total);
              if(total <= currentPage){
                this.setState({
                  isFull:true
                })
              }
            })
          );
      }

      SearchHandler = (e) =>{
        e.preventDefault();
        const parameters = {
          search:e.target.search.value,
          keyword:e.target.keyword.value,
          email:this.state.email,
          isChecked:this.state.isChecked,
          startPage:this.state.startPage,
          currentPage:this.state.currentPage
        }
        this.setState({status:'No Results'});
        this.fetchListHandler(parameters);
        this.fetchLengthHandler(parameters);
      }

      checkExpiryHandler = async(e) =>{
        await this.setState({isChecked:!this.state.isChecked});

        const parameters = {
          email:this.state.email,
          isChecked:this.state.isChecked,
          startPage:this.state.startPage,
          currentPage:1
        }
        this.fetchListHandler(parameters);
        this.fetchLengthHandler(parameters);
      }

      CallbackFromTravel = (dataFromChild) =>{

        this.setState({
            showResModal:dataFromChild.showResModal,
            tour:dataFromChild.tour
        })
       }

       ModalCloser = () => this.setState({showResModal:false});

       ReadMoreHandler = async(e) => {
          await this.setState({currentPage:this.state.currentPage+6})
          const parameters = {
            search:this.state.search, 
            keyword:this.state.keyword, 
            email:this.state.email,
            startPage:this.state.startPage,
            currentPage:this.state.currentPage
          }
          fetch(`http://localhost:3002/mypage/travel`,{
            body:JSON.stringify(parameters),
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            method:'post'
          })
            .then(res => res.json())
            .then(data => this.setState({
              list: this.state.list.concat(data),
              isFull: false,
              currentPage:this.state.currentPage
            })
          );
          
          this.fetchLengthHandler(parameters);
       }

    render(){
        let{ list, isFull } = this.state
        return(
            <div className='mypage-body'>
              
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                          <form className='tour-search-form'  onSubmit={this.SearchHandler}>
                            <div className='check-group '>
                              <input className='check-deadline' type='checkbox'  onChange={this.checkExpiryHandler} />
                              <span className='check-title'>&nbsp;show upcoming travel only</span>
                            </div>
                              <select className='category-selection' name='search'>
                                  <option>title</option>
                                  <option>location</option>
                              </select>
                              <input type='text' name='keyword' className='search-input'/>
                              <input type='submit' className='basic-btn' value='search'/>
                          </form> 
                          <div className='travel-wrapper'>
                              {list.length !== 0? list.map(tour =>  <TravelList key={tour.seq+tour.reservation_number} tour={tour} command='mytravel' callbackFromParent={this.CallbackFromTravel}/>):<h5>{this.state.status}</h5>}
                          </div>
                             {!isFull && <button type='button'  className='read-more-btn' onClick={this.ReadMoreHandler}>MORE</button>}
                          <Modal show={this.state.showResModal} onHide={this.ModalCloser} centered={"true"} dialogClassName="reservation-modal">
                            <Media.Body>
                                <ResModal email = {this.state.email}
                                          tour = {this.state.tour}
                                          callbackFromParent={this.CallbackFromTravel} /> 
                            </Media.Body>
                          </Modal>  
                        </div>
                    </div>
            </div>
        );
    }
}


export default MyTravel;