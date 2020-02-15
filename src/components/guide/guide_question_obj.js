import React from 'react'

class Guide_Question_Obj extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      writer_info: undefined
    }
  }

  componentDidMount() {
    const {client} = this.props.question;
    fetch(`http://localhost:3002/tour/detail/review/writer?email=${client}`)
      .then(res => res.json())
      .then(result => this.setState({
        isLoaded: true,
        writer_info: result
      }));
  }

  render() {
    const {seq, guide} = this.props.question
    const {writer_info, isLoaded} = this.state

    return(
      // <div className='question-obj-wrapper' data-seq={seq} onClick={this.props.handleClick}>
      //   <div className='client-profile-img' data-seq={seq}>
      //     {isLoaded && <img data-seq={seq} src={require(`../../uploads/${writer_info.profile_img}`)}/>}
      //   </div>
      //   <div className='client-nickname' data-seq={seq}>
      //     {isLoaded && writer_info.nickname}
      //   </div>
      // </div>

        <tbody>
        <tr>
          <td data-seq={seq}>{seq}</td>
          <td data-seq={seq}>{isLoaded && writer_info.nickname}</td>
          <td><input type="button" value='chat' className='qa-button' data-seq={seq} onClick={this.props.handleClick}></input></td>
        </tr>
      </tbody>
    )
  }
}

export default Guide_Question_Obj