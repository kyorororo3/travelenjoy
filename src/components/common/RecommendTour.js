import React from 'react';
import {withRouter} from 'react-router-dom';

class RecommendTour extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isLogin : false,
            loginEmail : '',
            isScrap : false
        }
    }
    componentDidMount() {
        console.log('RecommendTour componentDidMount() 실행');
        fetch('http://localhost:3002/users/getUser',{
          credentials: 'include'
        })
        .then(res => res.json())
        .then(data => {
            if(data.email !== undefined){
                this.setState({isLogin: true, loginEmail : data.email}
                , () => {
                    fetch(`http://localhost:3002/main/isScrap?email=${this.state.loginEmail}&seq=${this.props.tour.seq}`)
                    .then(res => res.json())
                    .then(data => {
                      //  console.log(data);
                        this.setState({isScrap : data.msg})
                    })
                })
            }else{
                this.setState({isLogin: false, loginEmail : '', isScrap : false})
            }
        });
    }
    
    handleScrap = (event) => {
        event.preventDefault();
        if(!this.state.isLogin){
            alert('로그인이 필요합니다.');
            this.props.history.push('/login');
        }else{
            if(this.state.isScrap){
                //스크랩 해제
                fetch(`http://localhost:3002/main/deletetourScrap?email=${this.state.loginEmail}&seq=${this.props.tour.seq}`)
                .then(res => res.json())
                .then(data => {
                 //   console.log(data);
                    this.setState({isScrap : data.msg})
                })
            }else{
                fetch(`http://localhost:3002/main/tourScrap?email=${this.state.loginEmail}&seq=${this.props.tour.seq}`)
                .then(res => res.json())
                .then(data => {
                  //  console.log(data);
                    this.setState({isScrap : data.msg})
                })
            }
        }
    }

    numberFormat = (price) => {        
        return price.toLocaleString();      
    }

    handleOnClick = () => {
        this.props.history.push(`/travel/detail/${this.props.tour.seq}`);
    }

    render() {
        let {seq, category, title, price, score} = this.props.tour;
       
        return(      
            <div className='recommendtour'>
                <div className='thumbnail'>
                    <div className ='thumbnail-like' onClick={this.handleScrap}>
                        {this.state.isScrap?<i className="fas fa-heart" style={{color:"#fff"}} />:<i className="far fa-heart" style={{color:"#fff"}} />}
                    </div>
                    <img className='thumbnail-img' alt='이미지없음' src={require('../../resources/common/images/jeju.jpg')} onClick={this.handleOnClick} />
                </div>

                <div className='recommendtour-body' onClick={this.handleOnClick}>
                    <div className='recommendtour-body loc'>{category}</div>
                    <div className='recommendtour-body title'>{title}</div>
                    <div className='recommendtour-body tourprice'>{this.numberFormat(price)}원 / 1인</div>
                    <div className='recommendtour-body tourscore'><i className="fas fa-star" style={{opacity:"0.5"}}/>&nbsp;{score}</div>
                </div>  
            </div>
        )
     }
}
export default withRouter(RecommendTour);