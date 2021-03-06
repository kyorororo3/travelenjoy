import React from 'react';
import socketio from 'socket.io-client';
import '../../../resources/travel/css/modal.scss';
import ChatMsgMe from './chat_msg_me';
import ChatMsgYou from './chat_msg_you';

class TravelDetailModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: socketio.connect('http://localhost:4000'),
      seq: undefined,
      msg_list: []
    }
  }

  handleSendMsg = (e) => {
    e.preventDefault();
    
    const {seq, socket} = this.state;
    socket.emit('sendmsg', {
        seq: seq,
        writer: this.props.client,
        msg: e.target.msg.value
      }
    )

    e.target.msg.value = '';
  }
  
  handleRecvMsg = () => {
    // alert('receive message 실행');
    const {msg_list, socket} = this.state;
    socket.on('sendmsg', (data) => {
      // alert(data.msg);
      msg_list.push(data);
      this.setState({
        msg_list : msg_list
      })
    })
  }

  handleLeave = () => {
    const {seq, socket} = this.state;
    socket.emit('leave', {
      seq: seq
    })

    this.props.handleModal();
  }

  handleJoin = () => {
    this.state.socket.on('join', data => {
      alert(data.msg);
      const {msg_list} = this.state;
      msg_list.map(msg => {
        msg.isread = 0
      });

      this.setState({
        msg_list : msg_list
      })
    })
  }

  componentDidMount() {

    fetch('http://localhost:3002/tour/question/chatroom', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({guide: this.props.guide, client: this.props.client})
    })
      .then(res => res.json())
      .then(result => {
        this.setState({
          seq: result.seq
        }, () => {
          const {socket, seq} = this.state;
          socket.emit('join', `room${seq}`);

          fetch('http://localhost:3002/tour/question/chatmsg', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({seq: seq, email: this.props.client})
          })
            .then(res => res.json())
            .then(result => {
              this.setState({msg_list: result})
              this.handleRecvMsg();
              this.handleJoin();
            });
        })
      });

    
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  render() {
    const {msg_list} = this.state;
    return (
      <React.Fragment>
        <div className="Modal-overlay" />
        <div className="Modal">
          <p className="title">1:1 채팅문의</p>
          <div className="content">
            {msg_list.map(obj => {
              if(obj.writer === this.props.client) return <ChatMsgMe chat={obj}/>
              else return <ChatMsgYou chat={obj}/>
            })}
          </div>
          <div className='chat-send'>
            <form onSubmit={this.handleSendMsg}>
              <input type='text' name='msg' autoComplete='off'/>
              <input type='submit' value='전송' />
            </form>
          </div>
          <div className="button-wrap">
            <button type='button' onClick={this.handleLeave}> 나가기 </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default TravelDetailModal;