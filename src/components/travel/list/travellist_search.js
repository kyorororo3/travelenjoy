import React from 'react';

class TravelSearch extends React.Component {
  render() {
    return(
      <div className='tour-search-wrapper'>
        <div className='main-text'>
          어디로 떠나고 싶으신가요?
        </div>
        <div className='tour-search-form-wrapper'>
          <form className='tour-search-form' action='/' autocomplete='off' 
            onSubmit={this.props.handleSearch}>
            <input type='text' name='location' placeholder='여행지를 입력해주세요' />
            <input className='btn-search' type='submit' value=''/>
          </form>
        </div>
      </div>
    )
  }
}

export default TravelSearch