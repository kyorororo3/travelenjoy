import React from 'react';
import { withRouter } from 'react-router-dom';

class MyTravelList extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    const command = this.props.command;
    console.log('command체크 ', command);
    if(command === 'myreview'){
      this.props.callbackFromParent({
        showWriteModal:true,
        tour:this.props.tour
      })
    }else if(command === 'mytravel'){
      console.log('command 잘 찾아왔다');
      this.props.callbackFromParent({
        showResModal:true,
        tour:this.props.tour
      })
    }else{
      this.props.history.push(`/travel/detail/${seq}`);
      window.location.reload();
    }
  }

  render() {
    const {seq, title, companyname, category, thumbnail, price, start_date} = this.props.tour;


    return(
      <div className='tour-list-obj card-container' data-seq={seq}
       onClick={this.goToDetail}>
        <div className='tour-thumbnail' data-seq={seq}>
          <img data-seq={seq}
           alt='이미지없다'
           src={require(`../../../uploads/${thumbnail}`)}/>
        </div>
        <div className='tour-infos' data-seq={seq}>
          <div className='tour-start_date' data-seq={seq}>{start_date}</div>
          <div className='rows tour-category' data-seq={seq}>[{category}]</div>
          <div className='rows tour-title' data-seq={seq}>{title}</div>
          <div className='rows' data-seq={seq}>
            <div className='tour-price' data-seq={seq}>{price}원/1인</div>
            <div className='tour-nickname' data-seq={seq}>{companyname}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(MyTravelList);