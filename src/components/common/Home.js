import React from 'react';
import '../../resources/common/css/home.css';

import Slider from '../common/Slider';
import RecommendTour from '../common/RecommendTour';
import RecommendTalk from '../common/RecommendTalk';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tourlistStart : 0,
      tourlist : [],
      talklistStart : 0,
      talklist : []
    }
  }

  componentDidMount(){
    fetch(`http://localhost:3002/main/recommend/tourlist?start=0`)
    .then(res => res.json())
    .then(data => {
      this.setState({tourlist : data})
    })

    fetch(`http://localhost:3002/main/recommend/talklist?start=0`)
    .then(res => res.json())
    .then(data => {
      this.setState({talklist : data})
    })
  }

  nextlist = () => {
    if(document.getElementById('recommendlist-row-tour').classList.contains('slide-in-left')){
      document.getElementById('recommendlist-row-tour').classList.remove('slide-in-left')
    }
    if(!document.getElementById('recommendlist-row-tour').classList.contains('slide-in-right')){
      document.getElementById('recommendlist-row-tour').classList.add('slide-in-right');
    }else{
      document.getElementById('recommendlist-row-tour').classList.remove('slide-in-right');
      void document.getElementById('recommendlist-row-tour').offsetWidth;
      document.getElementById('recommendlist-row-tour').classList.add('slide-in-right');
    }
    this.setState({tourlistStart : this.state.tourlistStart + 4}
    , () => {
      fetch(`http://localhost:3002/main/recommend/tourlist?start=${this.state.tourlistStart}`)
      .then(res => res.json())
      .then(data => {
        this.setState({tourlist : data})
        document.getElementsByClassName('recommendtourbtn prevlist')[0].style.display = "block";
        if(this.state.tourlistStart >= 8){
          document.getElementsByClassName('recommendtourbtn nextlist')[0].style.display = "none";
        }else{
          document.getElementsByClassName('recommendtourbtn nextlist')[0].style.display = "block";
        }
      })
    }) 
  }
  
  prevlist = () => {
    if(document.getElementById('recommendlist-row-tour').classList.contains('slide-in-right')){
      document.getElementById('recommendlist-row-tour').classList.remove('slide-in-right')
    }
    if(!document.getElementById('recommendlist-row-tour').classList.contains('slide-in-left')){
      document.getElementById('recommendlist-row-tour').classList.add('slide-in-left');
    }else{
      document.getElementById('recommendlist-row-tour').classList.remove('slide-in-left');
      void document.getElementById('recommendlist-row-tour').offsetWidth;
      document.getElementById('recommendlist-row-tour').classList.add('slide-in-left');
    }
    this.setState({tourlistStart : this.state.tourlistStart - 4}
    , () => {
      fetch(`http://localhost:3002/main/recommend/tourlist?start=${this.state.tourlistStart}`)
      .then(res => res.json())
      .then(data => {
        this.setState({tourlist : data})       
        if(this.state.tourlistStart <= 0){
          document.getElementsByClassName('recommendtourbtn prevlist')[0].style.display = "none";
        }else{
          document.getElementsByClassName('recommendtourbtn nextlist')[0].style.display = "block";
        }
      })
    })
  }

  handleReadMore = () => {
    if(!document.getElementById('recommendlist-row-talk').classList.contains('fade-in')){
      document.getElementById('recommendlist-row-talk').classList.add('fade-in');
    }else{
      document.getElementById('recommendlist-row-talk').classList.remove('fade-in');
      void document.getElementById('recommendlist-row-talk').offsetWidth;
      document.getElementById('recommendlist-row-talk').classList.add('fade-in');
    }
    this.setState({talklistStart : this.state.talklistStart + 10 }
      , () => {
        fetch(`http://localhost:3002/main/recommend/talklist?start=${this.state.talklistStart}`)
        .then(res => res.json())
        .then(data => {
          let before_talklist = this.state.talklist;
          let after_talklist = before_talklist.concat(data);
          this.setState({talklist : after_talklist})       
          if(this.state.talklistStart >= 10){
            document.getElementsByClassName('readmore-btn')[0].style.display = "none";
          }
        })
      })
  }

  render() {
    let {tourlist, talklist} = this.state;

    return (
      <div className='container'>
        <div className='home-wrapper'>

          <Slider/>

          <div className='recommendlist-wrapper'>
          <div className='home-subtitle'>이런 여행 어떠세요? 👀</div>
            <div id='recommendlist-row-tour' className='recommendlist-row'>
              {tourlist.map(tour => <RecommendTour  key={tour.seq} tour={tour} />)}
            </div>

            <div className='recommendtourbtn prevlist' onClick={this.prevlist}>
              <i className="fas fa-chevron-left" style={{color:"#abbff6"}}/>
            </div>
            <div className='recommendtourbtn nextlist' onClick={this.nextlist}>
              <i className="fas fa-chevron-right" style={{color:"#abbff6"}}/>
            </div>
          </div>

          <div className='recommendlist-wrapper'>
          <div className='home-subtitle'>실시간 인기글 💬</div>
            <div id='recommendlist-row-talk' className='recommendlist-row'>
              {talklist.map(talk => <RecommendTalk key={talk.seq} talk={talk} />)} 
            </div>         
            <div className='readmore-btn' onClick={this.handleReadMore}></div>
          </div>

        </div> 
      </div>   
    )
  }
}

export default Home;