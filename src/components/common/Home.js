import React from 'react';
import '../../resources/common/css/home.css';

import Slider from '../common/Slider';
import RecommendTour from '../common/RecommendTour';
import RecommendTalk from '../common/RecommendTalk';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    }
  }


  render() {


    return (
      <div className='container'>
        <div className='home-wrapper'>

          <Slider/>
          
          <RecommendTour/>
         
          <RecommendTalk />
          
        </div> 
      </div>   
    )
  }
}

export default Home;