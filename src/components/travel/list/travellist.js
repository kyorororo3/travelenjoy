import React from 'react';

// Components
import TravelListObj from './travellist_obj';

class TravelList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoaded: false,
      isFull: false,
      list: undefined,
      start: 0,
      total: undefined
    }
  }
  
  handleMoreRead = () => {
      const {isSearched, search} = this.props;
      const {list, start, total} = this.state;

      let url = `http://localhost:3002/tour/list?start=${start}`;
      if(isSearched) {
        url += `&search=${search}`;
      }
      fetch(url)
      .then(res => res.json())
      .then(data =>  {
        this.setState({
          list: list.concat(data),
          start: this.state.start + 12
        }, () => {
          const {total, start} = this.state
          if(total <= start) {
            this.setState({
              isFull: true
            })
          }
        });
      })
  }

  componentDidMount() {
    fetch(`http://localhost:3002/tour/list?start=0`)
    .then(res => res.json())
    .then(data => this.setState({
        list: data,
        isLoaded: true,
        start: this.state.start + 12
      })
    );

    fetch(`http://localhost:3002/tour/list/length`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          total: data.length
        }, () => {
          const{total, start} = this.state;
          if(total <= start) {
            this.setState({
              isFull: true
            })
          }
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    // console.log(JSON.stringify(nextProps));
    const {isSearched, search} = nextProps;

    if(isSearched) {
      fetch(`http://localhost:3002/tour/list?start=0&search=${search}`)
        .then(res => res.json())
        .then(data => this.setState({
            list: data,
            start: 12,
            isFull: false
          })
        );

      fetch(`http://localhost:3002/tour/list/length?search=${search}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            total: data.length
          }, () => {
            const{total, start} = this.state;
            if(total <= start) {
              this.setState({
                isFull: true
              })
            }
          });
        })
    }
  }

  render() {
    let { list, isLoaded, isFull } = this.state
    // console.log(list);
    return(
      <div className='travel-list-wrapper'>
        <div className='sub-title-text'>
          Travel <span>&</span>Joy Guide Tour
        </div>
        <div className='travel-lists'>
          {isLoaded && list.map(tour => <TravelListObj key={tour.seq} tour={tour} />)}
        </div>
        <div className='more-btn' style={{textAlign: "center", marginBottom: 20 + "px"}}>
          {!isFull && <button type='button' id='more-btn' className='btn-m' onClick={this.handleMoreRead}>MORE</button>}
        </div>
      </div>
    )
  }
}

export default TravelList