import React, { Component } from 'react';



class TravelSearchForm extends Component {
    static defaultProps = {
        isChecked:false
    }


    //검색하는 handler
    SearchHandler = (e) =>{
        e.preventDefault();
        const search_group = {
            search:e.target.search.value,
            keyword:e.target.keyword.value         
        }

        this.props.isSearched(search_group);     
    }


    //이미 참여한 여행을 제외하는 checkbox handler 
    checkExpiryHandler = (e) =>{
       this.props.isChecked(true);
    }   

    render(){
        const {requireCheck} = this.props;

        return(
            <form className='tour-search-form'  onSubmit={this.SearchHandler}>
                {requireCheck && <div className='check-group '>
                    <input className='check-deadline' type='checkbox'  onChange={this.checkExpiryHandler} />
                    <span className='check-title'>&nbsp;show upcoming travel plans only</span>
                </div>}
              <select className='category-selection' name='search'>
                  <option>title</option>
                  <option>location</option>
              </select>
              <input type='text' name='keyword' className='search-input'/>
              <input type='submit' className='basic-btn' value='search'/>
          </form> 
        );
    }
}


export default TravelSearchForm;