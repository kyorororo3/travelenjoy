import React from 'react';
import socketio from 'socket.io-client';
import '../../resources/travel/css/modal.scss';

class Guide_Modal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: socketio.connect('http://localhost:4000'),
      msg_list: []
    }
  }

  handleSendMsg = (e) => {
    e.preventDefault();
    
    const {socket} = this.state;
    const {seq} = this.props;
    
    socket.emit('sendmsg', {
        seq: seq,
        writer: this.props.email,
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

  componentDidMount() {
    const {socket} = this.state;
    const {seq} = this.props;
    socket.emit('join', `room${seq}`);
    
    fetch('http://localhost:3002/tour/question/chatmsg', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({seq: seq})
    })
      .then(res => res.json())
      .then(result => {
        this.setState({msg_list: result})
        this.handleRecvMsg();
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
          <p className="title">Modal Title</p>
          <div className="content">
            {msg_list.map(obj => {
              if(obj.writer === this.props.email) return <p className='me'>{obj.msg}</p>
              else return <p className='you'>{obj.msg}</p>
            })}
          </div>
          <div className='chat-send'>
            <form onSubmit={this.handleSendMsg}>
              <input type='text' name='msg'/>
              <input type='submit' value='전송' />
            </form>
          </div>
          <div className="button-wrap">
            <button type='button' onClick={this.props.handleModal}> 나가기 </button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default Guide_Modal;