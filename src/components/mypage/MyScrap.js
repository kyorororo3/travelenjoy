
import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from './UI/MyTravelList';

class MyScrap extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            email:this.props.location.state.users.email,
            status:"Let's scrap travels with Travel&joy!",
            list: [],
            isFull:false,
            currentPage:0,
            total: undefined
        }
    }

    componentDidMount() {
        const parameters = {
            email:this.state.email,
            currentPage:0
          }
          this.fetchListHandler(parameters);
          this.fetchLengthHandler(parameters);
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state !== nextState
      }

    //list 조회하는 fetch handler
    fetchListHandler = (parameters) =>{
        fetch(`http://localhost:3002/mypage/scrap`,{
            body:JSON.stringify(parameters),
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            method:'post'
        })
            .then(res => res.json())
            .then(data => this.setState({
            list: data,
            isFull: false,
            currentPage:6
            })
        );
    }

    // list length 조회하는 fetch handler 
    fetchLengthHandler = async (parameters) =>{
        fetch(`http://localhost:3002/mypage/scrap/length`,{
          body:JSON.stringify(parameters),
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          method:'post'
        })
          .then(res => res.json())
          .then(data => this.setState({
              total:data.length
            }, () =>{
                console.log('checking total', this.state.total);
              const {total, currentPage} = this.state;
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
            currentPage:0
        }
        this.setState({status:'No Results'});
        this.fetchListHandler(parameters);
        this.fetchLengthHandler(parameters);
    }
     //더보기 페이징 
    ReadMoreHandler = async(e) => {
        const parameters = {
        search:this.state.search, 
        keyword:this.state.keyword, 
        email:this.state.email,
        currentPage:this.state.currentPage
        }
        fetch(`http://localhost:3002/mypage/scrap`,{
        body:JSON.stringify(parameters),
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        method:'post'
        })
            .then(res => res.json())
            .then(data => this.setState({
                list: this.state.list.concat(data),
                isFull: false,
                currentPage:this.state.currentPage + 6
            }, () =>{
                const {total, currentPage} = this.state
                console.log('변화를 봅세 ', total, currentPage);
                if(total <= currentPage){
                this.setState({
                    isFull: true
                })
                }
            })
        );
        
    }

    render(){
        let{ list, isFull } = this.state
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                        <form className='tour-search-form'  onSubmit={this.SearchHandler}>
                            <select className='category-selection' name='search'>
                                <option>title</option>
                                <option>location</option>
                            </select>
                            <input type='text' name='keyword' className='search-input'/>
                            <input type='submit' className='basic-btn' value='search'/>
                        </form> 
                        <div className='travel-wrapper'>
                            {list.length !== 0? list.map(tour =>  <TravelList key={tour.seq+tour.wdate} tour={tour} />):<h5>{this.state.status}</h5>}
                        </div>
                            {!isFull && <button type='button'  className='read-more-btn' onClick={this.ReadMoreHandler}>MORE</button>}
                    </div>
                </div>
            </div>
        );
    }
}



export default MyScrap;