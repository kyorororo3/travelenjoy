import React from 'react';
import { withRouter } from 'react-router-dom';
class TravelListObj extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    this.props.history.push(`/travel/detail/${seq}`);
 
  }

  render() {
    const {seq, title, companyname, category, thumbnail, price, avg} = this.props.tour;
    const round_avg = Math.round(avg * 10) / 10;
    return(
      <div className='tour-list-obj card-container' data-seq={seq}
       onClick={this.goToDetail}>
        <div className='tour-thumbnail' data-seq={seq}>
          <img data-seq={seq}
           src={require('../../../resources/travel/images/nyang.jpg')}
          //  src={require(`../../../uploads/${thumbnail}`)}
          />
        </div>
        <div className='tour-infos' data-seq={seq}>
          <div className='rows tour-category' data-seq={seq}>[{category}]</div>
          <div className='rows tour-title' data-seq={seq}>{title}</div>
          <div className='rows' data-seq={seq}>
            <div className='tour-price' data-seq={seq}>{price}원/1인</div>
            <div className='avg-inactive' data-seq={seq}>
              <div className='avg-active' data-seq={seq}
                style={{width: 15 * round_avg + "px"}}></div>
            </div>
          </div>
          <div className='rows tour-company' data-seq={seq}>
            {companyname}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(TravelListObj);