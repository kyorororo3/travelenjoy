import React from 'react';

class ChatMsgMe extends React.Component {
  render() {
    const {msg, isread, wdate} = this.props.chat
    return(
      <div className='chat-msg'>
        {isread === 1 && <div className='isread'>읽지 않음</div>}
        <p className='me'>{msg}</p>
      </div>
    )
  }
}

export default ChatMsgMe