import React from 'react';
import '../../../resources/travel/css/modal.scss';

class TravelDetailModal extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="Modal-overlay" />
        <div className="Modal">
          <p className="title">Modal Title</p>
          <div className="content">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vel tempora nulla, non molestiae dicta ducimus. Et unde laborum eveniet ex quod doloribus quae, aliquam beatae atque, vero assumenda rem quo?
            </p>
          </div>
          <div className="button-wrap">
            <button type='button' onClick={this.props.handleModal}> 나가기 </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default TravelDetailModal;