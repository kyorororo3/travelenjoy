import React, { Component } from 'react';
import CmtForm from './UI/MyCmtTableForm';
import TalkList from './UI/MyTalkList';
import Pagination from './UI/Pagination';

class MyTalk extends Component {

    constructor(props){
        super(props);
      
        this.state = {
            email:this.props.location.state.users.email,
            post_lists:[],
            cmt_lists:[],
            postPage:0,
            prev:false,
            next:true,
            postTotal:undefined,
            cmtTotal:undefined
        }
    }
    
    componentDidMount(){
        const {email, postPage} = this.state;

        fetch(`http://localhost:3002/mypage/talk/post?email=${email}&postPage=${postPage}`)
        .then(res => res.json())
        .then(data => this.setState({
            post_lists:data,
            postPage:3
        }))

        fetch(`http://localhost:3002/mypage/talk/post/length?email=${email}`)
        .then(res => res.json())
        .then(data => this.setState({
            postTotal:data.length
        }, () =>{
            const {postTotal} = this.state;
            if(postTotal <= 3){
                this.setState({next:false})
            }else{
                this.setState({next:true})
            }
        })
    );
        fetch(`http://localhost:3002/mypage/talk/comment?email=${email}`)
        .then(res => res.json())
        .then(data => this.setState({
            cmt_lists:data
        })
        );

        fetch(`http://localhost:3002/mypage/talk/comment/length?email=${email}`)
        .then(res => res.json())
        .then(data => this.setState({
            cmtTotal:data.length
        })
        );
        console.log('cmtTotal check', this.state.cmtTotal);
    }

    shouldComponentUpdate(nextProps, nextState){
        return this.state !== nextState
    }

    

    prevBtnHandler = async (e) =>{
        
        await this.setState((prevState) => ({postPage:prevState.postPage - 6}))
        let {email, postPage} = this.state;
        await fetch(`http://localhost:3002/mypage/talk/post?email=${email}&postPage=${postPage}`)
          .then(res => res.json())
          .then(data => this.setState({
            post_lists: data,
            postPage:postPage + 3
            })
        );
        
        this.checkpostTotalFetcher(email, postPage);
    }

    nextBtnHandler = async(e) =>{
       
        let {email, postPage} = this.state;
       await fetch(`http://localhost:3002/mypage/talk/post?email=${email}&postPage=${postPage}`)
          .then(res => res.json())
          .then(data => this.setState((prevState) => ({
            post_lists: data,
            postPage:prevState.postPage + 3
            }))
        );

        this.checkpostTotalFetcher(this.state.email,this.state.postPage);
    }

    checkpostTotalFetcher = (email,postPage) =>{

        fetch(`http://localhost:3002/mypage/talk/post/length?email=${email}`)
            .then(res => res.json())
            .then(data => this.setState({
                postTotal:data.length
            }, async() =>{
                const {postTotal} = this.state;
                if(postTotal < 4) {
                    await this.setState({ prev:false, next:false })
                }else{
                    if(postPage === 0){
                        console.log( 'if 1 : current가 0 이다 ' , postPage)
                        await this.setState({ prev:false, next:true})

                    }else if(postTotal <= postPage){
                        console.log('if 2: postTotal이 current보다 작아졌다 ', postTotal, postPage);
                        await this.setState({ prev:true, next:false})
                    
                    }else{
                        console.log('if 3 : postTotal이 current보다 아직 큰 상태', postTotal, postPage);
                        await this.setState({ prev:true, next:true})
                    }
                }
                
            })
        );
        console.log('postTotal', this.state.postTotal, 'current', this.state.postPage);
    }

    cmtPageFetcher = (pageNumber) => {
        pageNumber = pageNumber * 5;
        const { email } = this.state;
        fetch(`http://localhost:3002/mypage/talk/comment?email=${email}&pageNumber=${pageNumber}`)
        .then(res => res.json())
        .then(data => this.setState({
            cmt_lists:data
        })
        );
    }

    render(){
     
        const { cmt_lists, post_lists, prev, next, cmtTotal } = this.state;

        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                           
                           <div className='mypost-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Posts</p>
                                {post_lists.length !==0 ? post_lists.map(talk => <TalkList key={talk.seq} talk={talk} user={this.props.location.state.users} /> ): <h5>Let's Post:D </h5>}
                                {prev && <div className='mytalk-paging prev' onClick={this.prevBtnHandler}>
                                    <i className="fas fa-chevron-left" style={{color:"#abbff6"}}/>
                                </div>}
                                {next && <div className='mytalk-paging next' onClick={this.nextBtnHandler}>
                                    <i className="fas fa-chevron-right" style={{color:"#abbff6"}}/>
                                </div>}
                           </div>
                           <div className='mycomment-wrapper'>
                                <p className='talk-title'><i class="fas fa-pencil-alt"></i>&nbsp;My Comments</p>
                                <div className='cmt-table'>
                                    <div className='cmt-table-row fixed-row'>
                                        <span className='fixed-title cmt-content'>Content</span>
                                        <span className='fixed-title cmt-reg-date'>Registered</span>
                                    </div>
                                    {cmt_lists.length !== 0? cmt_lists.map(cmt => <CmtForm cmt={cmt}/>):<h5>Let's Leave Comments!</h5>}
                                </div>
                                <Pagination listLength={cmtTotal} pageFetcher={this.cmtPageFetcher}  />
                           </div>

                        </div>
                    </div>
            </div>
        );
    }
}


export default MyTalk;