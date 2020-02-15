import React from 'react';
import { withRouter } from 'react-router-dom';
class TravelListObj extends React.Component {
  goToDetail = (e) => {
    // console.log(e.target.dataset.seq);
    let seq = e.target.dataset.seq;
    this.props.history.push(`/travel/detail/${seq}`);
 
  }

  render() {
    const {seq, title, companyname, category, thumbnail, price} = this.props.tour;

    return(
      <div className='tour-list-obj card-container' data-seq={seq}
       onClick={this.goToDetail}>
        <div className='tour-thumbnail' data-seq={seq}>
          <img data-seq={seq}
           alt='이미지없다'
           src={require(`../../../uploads/${thumbnail}`)}/>
        </div>
        <div className='tour-infos' data-seq={seq}>
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

export default withRouter(TravelListObj);