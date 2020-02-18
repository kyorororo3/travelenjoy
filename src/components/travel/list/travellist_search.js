import React from 'react';

class TravelSearch extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      location: [],
      show: false
    }
  }
  
  handleFocus = () => {
    this.setState({show: true})
  }

  handleHide = () => {
    document.getElementsByTagName('body')[0].addEventListener('click', e => {
      const _class = e.target.className;
      if(_class === 'tour-search-input'
          || _class === 'autocomplete-li') return;
      this.setState({show: false})
    })
  }

  handleAutocomplete = (e) => {
    let keyword = e.target.value;

    fetch(`http://localhost:3002/tour/list/autocomplite?keyword=${keyword}`)
      .then(res => res.json())
      .then(rows => {
        this.setState({
          location: rows
        })
      })
  }

  handleSearch = (e) => {
    e.preventDefault();
    const searched_location = e.target.location.value;
    this.props.isSearched(searched_location);
  }

  handleClick = (e) => {
    const {loc} = e.target.dataset;
    this.props.isSearched(loc);
    document.getElementsByClassName('tour-search-input')[0].value=loc;
    this.setState({show: false});
  }

  render() {
    const {location, show} = this.state;
    this.handleHide();

    return(
      <div className='tour-search-wrapper'>
        <div className='main-text'>
          어디로 떠나고 싶으신가요?
        </div>
        <div className='tour-search-form-wrapper'>
          <form className='tour-search-form' action='/' autoComplete='off' 
            onSubmit={this.handleSearch}>
            <input className='tour-search-input' type='text' name='location' 
             placeholder='여행지를 입력해주세요' 
             onChange={this.handleAutocomplete} 
             onFocus={this.handleFocus}
            />
            <input className='btn-search' type='submit' value=''/>
          </form>
        </div>
        <div className='tour-search-autocomplete-wrapper'>
          {show && 
            <ul className='tour-search-autocomplete'>
              {location.map((data, index) => 
                <li key={index} onClick={this.handleClick} data-loc={data.location} className='autocomplete-li'>
                  <i className="fas fa-map-marker-alt"></i> {data.location}, {data.country}
                </li>
              )}
            </ul>}
        </div>
      </div>
    )
  }
}

export default TravelSearch