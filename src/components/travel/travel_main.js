import React from 'react';

// CSS
import '../../resources/travel/css/travellist.css';

// Components
import TravelSearch from './list/travellist_search';
import TravelList from './list/travellist';

class TravelMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isSearched: false,
      search: undefined
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handelInfiniteScroll);
  }

  handleSearchState = (_search) => {
    this.setState({
      isSearched: true,
      search: _search
    })
  }

  handelInfiniteScroll = () => {
    // console.log('스크롤');
    let { clientHeight, clientTop, scrollHeight, scrollTop, offsetHeight, offsetTop } = document.documentElement;
    // console.log('ch : ' + clientHeight);
    // console.log('ct : ' + clientTop);
    // console.log('sh : ' + (scrollHeight - 261));
    // console.log('st : ' + scrollTop);
    // console.log('oh : ' + offsetHeight);
    // console.log('st : ' + offsetTop);
    if(scrollTop + clientHeight >= scrollHeight - 261) {
      console.log('스크롤의 끝');
      window.removeEventListener('scroll', this.handelInfiniteScroll);
    }
  }

  render() {
    var { search, isSearched } = this.state;
    
    return(
      <div className='container'>
        <TravelSearch isSearched={this.handleSearchState}/>
        <TravelList search={search} isSearched={isSearched} />
      </div>
    )
  }
}

export default TravelMain