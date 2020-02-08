import React from 'react'

class Guide_Question_Obj extends React.Component {

  render() {
    const {seq, guide, client} = this.props.question
    return(
      <div className='question-obj-wrapper' data-seq={seq} onClick={this.props.handleClick}>
        <div data-seq={seq}>채팅방 : room{seq}</div>
        <div data-seq={seq}>문의자 : {client}</div>
      </div>
    )
  }
}

export default Guide_Question_Obj