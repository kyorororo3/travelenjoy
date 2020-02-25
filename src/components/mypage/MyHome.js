import React, { Component } from 'react';
import MsgForm from './UI/MyMsgTableForm';
import Pagination from './UI/Pagination';

class MyHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            email:'',
            travel_count : 0,
            scrap_count : 0,
            post_count : 0,
            comment_count : 0,
            msg_lists:[],
            msgLength:0,
            isLoaded:false
        }

    }

    componentDidMount(){
        fetch('http://localhost:3002/users/getUser',{
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            if(data.email !== undefined)
            this.setState({email:data.email});

            fetch(`http://localhost:3002/mypage/home?email=${data.email}`)
            .then(res => res.json())
            .then(data => this.setState({
                travel_count : data.travel_count,
                scrap_count : data.scrap_count,
                post_count : data.post_count,
                comment_count : data.comment_count,
              })
            );
            
            fetch(`http://localhost:3002/mypage/home/msg?email=${data.email}&pageNumber=${0}`)
            .then(res => res.json())
            .then(data => this.setState({
                msg_lists:data
            }))

            fetch(`http://localhost:3002/mypage/home/msg/length?email=${data.email}`)
            .then(res => res.json())
            .then(data => this.setState({
                isLoaded:true,
                msgLength:data.length
            }))
            }
          );       
        }
        msgPageFetcher = async(data) => {
            console.log('myHome 으로 넘어온 페이지 수', data.pageNumber);
            const pageNum = data.pageNumber * 5; 
            const { email } = this.state;
            await    fetch(`http://localhost:3002/mypage/home/msg?email=${this.state.email}&pageNumber=${pageNum}`)
            .then(res => res.json())
            .then(data => this.setState({
                msg_lists:data
            })
            );
        }

    render(){
        const {travel_count, scrap_count, post_count, comment_count, msg_lists, msgLength, isLoaded} = this.state;
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                        <div className='count-box-wrapper'>
                            <div className='count-box-container'>
                                <p className='count-title'>My Travels</p>
                                <p className='count-number'>{travel_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Scraps</p>
                                <p className='count-number'>{scrap_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Posts</p>
                                <p className='count-number'>{post_count}</p>
                            </div>
                            <div className='count-box-container'>
                                <p className='count-title'>My Comments</p>
                                <p className='count-number'>{comment_count}</p>
                            </div>
                        </div>
                        <div className='msg-wrapper'>
                                <p className='msg-title'><i className="fas fa-bell"></i> My Messages</p>
                            <div className='msg-table'>
                                <div className='msg-table-row fixed-row'>
                                    <span className='fixed-title msg-icon'><i className="fas fa-envelope"></i></span>
                                    <span className='fixed-title msg-content'>Content</span>
                                    <span className='fixed-title msg-reg-date'>Registered</span>
                                </div>
                                {msg_lists.length !== 0? msg_lists.map(msg => <MsgForm msg={msg}/>):<h5>You don't have any messages</h5>}
                            </div>
                            {isLoaded ? <Pagination listLength={msgLength}
                                            pageFetcher={this.msgPageFetcher}
                                           /> : ''}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyHome;