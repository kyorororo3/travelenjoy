import React from 'react';

class Tourdetail extends React.Component {
  render() {
    let seq = this.props.match.params.seq;  // url path로 보내진 파라미터 받아옴.

    return(
      <div className='tour-detail-wrapper'>
        <h2>detail component</h2>
        {seq}
      </div>
    )
  }
}

export default Tourdetail