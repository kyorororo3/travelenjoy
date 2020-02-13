import React, { Component } from 'react';


class MyHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            travel_count : 0,
            scrap_count : 0,
            post_count : 0,
            comment_count : 0
        }

    }

    componentWillMount(){
        
    }
    componentDidMount(){
        fetch('http://localhost:3002/users/getUser',{
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            if(data.email !== undefined)
            fetch(`http://localhost:3002/mypage/home?email=${data.email}`)
            .then(res => res.json())
            .then(data => this.setState({
                travel_count : data.travel_count,
                scrap_count : data.scrap_count,
                post_count : data.post_count,
                comment_count : data.comment_count
              })
            );
            }
          );
      
    }
    render(){
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                        <div className='count-box-wrapper'>
                            <div className='count-box-container'>
                                <p className='count-title'>My Travels</p>
                                <p className='count-number'>{this.state.travel_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Scraps</p>
                                <p className='count-number'>{this.state.scrap_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Posts</p>
                                <p className='count-number'>{this.state.post_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Comments</p>
                                <p className='count-number'>{this.state.comment_count}</p>
                            </div>
                        </div>
                        <div className='my-news-container'>
                            <div className='news-title'>
                                <p><i class="fas fa-bell"></i> My News</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyHome;