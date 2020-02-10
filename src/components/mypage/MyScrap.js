
import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';
import TravelList from '../travel/list/travellist_obj';
import MySearchForm from './UI/MySearchForm';

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
                        <MySearchForm />
                        <div className='travel-wrapper'>
                            {isLoaded? list.length !== 0? list.map(tour =>  <TravelList key={tour.seq} tour={tour} />):<h5>Let's scrap travelling plans with Travel&joy!</h5> : <h1>Loading....</h1>}
                        </div>
                        </div>
                    </div>
            </div>
        );
    }
}



export default MyScrap;