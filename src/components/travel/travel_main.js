import React from 'react';

// CSS
import '../../resources/travel/css/travellist.css';

// Components
import TravelSearch from './list/travellist_search';
import TravelList from './list/travellist';
import TicketList from './list/ticketlist'

class TravelMain extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoaded: false
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handelInfiniteScroll);

    // fetch('http://localhost:3002/tour/list')
    //   .then(res => res.json())
    //   .then(data => this.setState({
    //     list: data,
    //     isLoaded: true
    //     })
    //   );
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

  handleSearch = (e) => {
    e.preventDefault();
    // const searched_location = e.target.location.value;
    // // alert(searched_location);

    // fetch(`http://localhost:3002/tour/location?loc=${searched_location}`)
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data);
    //     if(data.isLoc) {
    //       alert('/city로 이동합니다.');
    //       this.props.history.push(`/travel/city?category=${searched_location}`);
    //     }else if(!data.isLoc) {
    //       alert('검색 결과 리스트를 갱신합니다.');
    //       fetch(`http://localhost:3002/tour/list?search=${searched_location}`)
    //         .then(res => res.json())
    //         .then(search_list => {
    //           this.setState({
    //             list: search_list
    //           })
    //         })
    //     }
    //   })

  }

  render() {
    var { list, isLoaded } = this.state;
    
    return(
      <div className='container'>
        <TravelSearch handleSearch={this.handleSearch}/>
        {/* <TravelList travel_list={list} isLoaded={isLoaded}/> */}
        <TravelList />
      </div>
    )
  }
}

export default TravelMain