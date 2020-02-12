import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from './UI/MyTravelList';

class MyTravel extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          email:this.props.location.state.users.email,
          status:"Let's make your travel plan with Travel&joy!",
          isChecked:false,
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
        fetch(`http://localhost:3002/mypage/travel`,{
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
          isChecked:this.state.isChecked,
          currentPage:1
        }
        this.setState({status:'No Results'});
        this.fetchHandler(parameters);
      }

      checkExpiryHandler = async(e) =>{
        console.log(this.state.isChecked);
        await this.setState({
          isChecked:!this.state.isChecked
        })
        console.log(this.state.isChecked);
        const parameters = {
          email:this.state.email,
          isChecked:this.state.isChecked,
          currentPage:1
        }
        this.fetchHandler(parameters);
      }

    render(){
        let{ list, isLoaded, email } = this.state
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
                            {isLoaded? list.length !== 0? list.map(tour =>  <TravelList key={tour.seq} tour={tour} />):<h5>{this.state.status}</h5> : <h1>Loading....</h1>}
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}


export default MyTravel;