import React from 'react';

// component
import GuideHeader from './guide_Header';
import Guide_Question_Obj from './guide_question_obj';
import Guide_Modal from './guide_modal';

class Guide_Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_list: [],
      modal: false,
      seq: undefined,
      email: this.props.location.state.users
    }
  }

  handleModal = () => {
    this.setState({
      modal: false
    })
  }

  handleClick = (e) => {
    this.setState({
      seq: e.target.dataset.seq,
      modal: true
    })
  }

  componentDidMount() {
    fetch(`http://localhost:3002/guide/questionList?email=${this.props.location.state.users.email}`)
      .then(res => res.json())
      .then(result => this.setState({chat_list: result}))
  }

  render() {
    const {chat_list, modal, seq} = this.state;
    return(
      <div className='container'>
        <GuideHeader users={this.state.email}/>
        {chat_list.map(obj => {
          return <Guide_Question_Obj key={obj.seq} handleClick={this.handleClick} question={obj}/>
        })}
        {modal && <Guide_Modal
                    handleModal={this.handleModal}
                    email={this.props.location.state.users.email}
                    seq={seq} />}
      </div>
    )
  }
}

export default Guide_Question