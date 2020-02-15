import React from 'react'

class Guide_Question_Obj extends React.Component {

  render() {
    const {seq, guide, client} = this.props.question
    return(
        <tbody>
          <tr>
            <td data-seq={seq}>{seq}</td>
            <td data-seq={seq}>{client}</td>
            <td><input type="button" value='chat' className='qa-button' data-seq={seq} onClick={this.props.handleClick}></input></td>
          </tr>
        </tbody>
    )
  }
}

export default Guide_Question_Obj