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
      end: 12,
      total: undefined
    }
  }
  
  handleMoreRead = () => {
    this.setState({
      start: this.state.start + 12,
      end: this.state.end + 12
    }, () => {
      const {list, start, end, total} = this.state;
      fetch(`http://localhost:3002/tour/list?start=${start}&end=${end}`)
      .then(res => res.json())
      .then(data =>  {
        this.setState({
          list: list.concat(data)
        });
      })
      // console.log(end);
      if(total <= end) {
        this.setState({
          isFull: true
        })
      }
    })
  }

  componentDidMount() {
    fetch(`http://localhost:3002/tour/list?start=0&end=12`)
    .then(res => res.json())
    .then(data => this.setState({
        list: data,
        isLoaded: true
      })
    );

    fetch(`http://localhost:3002/tour/list/length`)
      .then(res => res.json())
      .then(data => {
        this.setState({
          total: data.length
        }, () => {
          const{total, end} = this.state;
          if(total <= end) {
            this.setState({
              isFull: true
            })
          }
        })
      });
  }

  componentWillReceiveProps(nextProps) {
    console.log(JSON.stringify(nextProps));
    const {isSearched, search} = nextProps;

    if(isSearched) {
      fetch(`http://localhost:3002/tour/list?start=0&end=12&search=${search}`)
        .then(res => res.json())
        .then(data => this.setState({
            list: data
          })
        );

      fetch(`http://localhost:3002/tour/list/length?search=${search}`)
        .then(res => res.json())
        .then(data => {
          this.setState({
            total: data.length
          }, () => {
            const{total, end} = this.state;
            if(total <= end) {
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
    console.log(list);
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