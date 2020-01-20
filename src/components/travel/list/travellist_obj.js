import React from 'react';
import { withRouter } from 'react-router-dom';

class TravelListObj extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    this.props.history.push(`/travel/detail/${seq}`);
  }

  render() {
    const {seq, title, nickname, category, thumbnail, min_people, max_people, price} = this.props.tour

    return(
      <div className='tour-list-obj card-container' data-seq={seq}
       onClick={this.goToDetail}>
        <div className='tour-thumbnail' data-seq={seq}>
          <div>썸네일 자리</div>
        </div>
        <div className='tour-infos' data-seq={seq}>
          <div className='rows tour-category' data-seq={seq}>[{category}]</div>
          <div className='rows tour-title' data-seq={seq}>{title}</div>
          <div className='rows'>
            <div className='tour-price' data-seq={seq}>{price}원</div>
            <div className='tour-nickname' data-seq={seq}>{nickname}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TravelListObj);