import React from 'react';

class ChatMsgYou extends React.Component {
  render() {
    const {msg, isread, wdate} = this.props.chat
    return(
      <div className='chat-msg'>
        <p className='you'>{msg}</p>
      </div>
    )
  }
}

export default ChatMsgYou