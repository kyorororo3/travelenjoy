import React from 'react';

class TravelSearch extends React.Component {

  handleAutocomplite = (e) => {
    
  }

  render() {
    return(
      <div className='tour-search-wrapper'>
        <div className='main-text'>
          어디로 떠나고 싶으신가요?
        </div>
        <div className='tour-search-form-wrapper'>
          <form className='tour-search-form' action='/' autoComplete='off' 
            onSubmit={this.props.handleSearch}>
            <input className='tour-search-input' type='text' name='location' placeholder='여행지를 입력해주세요' />
            <input className='btn-search' type='submit' value=''/>
          </form>
        </div>
        <div className='tour-search-autocomplite-wrapper'>
          <ul className='tour-search-autocomplite'>
            <li><i className="fas fa-map-marker-alt"></i> 지역1</li>
            <li><i className="fas fa-map-marker-alt"></i> 지역2</li>
            <li><i className="fas fa-map-marker-alt"></i> 지역3</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default TravelSearch