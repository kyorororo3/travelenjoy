import React from 'react';
import { withRouter } from 'react-router-dom';

class TravelSearch extends React.Component {
  
  handleLink = (e) => {
    const {loc} = e.target.dataset;
    this.props.history.push(`/travel/city?category=${loc}`);
  }
  
  handleFocus = () => {
    const el_ul = document.getElementsByClassName('tour-search-autocomplete')[0];
    el_ul.style.display = 'block';
  }
  handleBlur = () => {
    const el_ul = document.getElementsByClassName('tour-search-autocomplete')[0];
    el_ul.style.display = 'none';
  }

  handleAutocomplete = (e) => {
    const el_ul = document.getElementsByClassName('tour-search-autocomplete')[0];
    let keyword = e.target.value;

    if(keyword !== '') {
      fetch(`http://localhost:3002/tour/autocomplite?keyword=${keyword}`)
        .then(res => res.json())
        .then(rows => {
          while ( el_ul.hasChildNodes() ) {
            el_ul.removeChild( el_ul.firstChild ); 
          }
          rows.map((data) => {
            let el_li = document.createElement('li');
            el_li.setAttribute('data-loc', data.location);
            el_li.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}, ${data.country}`;
            el_ul.appendChild(el_li);

            el_li.addEventListener('click', this.handleLink);
          });
          el_ul.style.display = 'block';
        });
    }else {
      el_ul.style.display = 'none';
    }
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
            <input className='tour-search-input' type='text' name='location' 
             placeholder='여행지를 입력해주세요' 
             onChange={this.handleAutocomplete} 
             onFocus={this.handleFocus}
             onBlur={this.handleBlur}/>
            <input className='btn-search' type='submit' value=''/>
          </form>
        </div>
        <div className='tour-search-autocomplete-wrapper'>
          <ul className='tour-search-autocomplete'>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(TravelSearch)