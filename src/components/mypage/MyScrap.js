
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
            isLoaded: false
        }
    }

    componentDidMount() {
        const parameters = {
            search:'', 
            keyword:'', 
            email:this.state.email,
            currentPage:''
          }
          this.fetchHandler(parameters);
    }
    
    fetchHandler = (parameters) =>{
        fetch(`http://localhost:3002/mypage/scrap`,{
          body:JSON.stringify(parameters),
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          method:'post'
        })
          .then(res => res.json())
          .then(data => this.setState({
            list: data,
            isLoaded: true
            })
          );
    }

    SearchHandler = (e) =>{
        e.preventDefault();
        const parameters = {
            search:e.target.search.value,
            keyword:e.target.keyword.value,
            email:this.state.email,
            currentPage:1
        }
        this.setState({status:'No Results'});
        this.fetchHandler(parameters);
    }

    render(){
        let{ list, isLoaded, email } = this.state
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
                            {isLoaded? list.length !== 0? list.map(tour =>  <TravelList key={tour.seq+tour.wdate} tour={tour} />):<h5>${this.state.status}</h5> : <h1>Loading....</h1>}
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}



export default MyScrap;