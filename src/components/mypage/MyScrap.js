
import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from '../travel/list/travellist_obj';


class MyScrap extends Component {
    
    constructor(props) {
        super(props);
    
        this.state = {
            email:this.props.location.state.users.email,
            list: [],
            isLoaded: false
        }
        }
        componentDidMount() {
        fetch(`http://localhost:3002/mypage/scrap?email=${this.state.email}`)
            .then(res => res.json())
            .then(data => this.setState({
            list: data,
            isLoaded: true
            })
            );
        }

    render(){
        let{ list, isLoaded, email } = this.state
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                        <form>
                                <select className='category-selection'>
                                    <option>title</option>
                                    <option>location</option>
                                    <option>date</option>
                                </select>
                                <input type='text' name='search' className='search-input'/>
                                <button className='basic-btn'>search</button>
                        </form>
                        <div className='travel-wrapper'>
                            {isLoaded? list.map(tour =>  <TravelList key={tour.seq} tour={tour} />) : <h1>Loading....</h1>}
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}



export default MyScrap;