import React, { Component } from 'react';


class MySearchForm extends Component {
    

    SearchHandler = (e) =>{
        e.preventDefault();
    }


    render(){
        return(
            <div className='search-form-wrapper'>
              <form className='tour-search-form' action='/' autoComplete='off' onSubmit={this.SearchHandler}>
                  <select className='category-selection' name='search'>
                      <option>title</option>
                      <option>location</option>
                  </select>
                  <input type='text' name='keyword' className='search-input'/>
                  <button className='basic-btn'>search</button>
              </form>  
              <div className='tour-search-autocomplete-wrapper'>
                  <ul className='tour-search-autocomplete'>
                  </ul>
              </div>
           </div>
        );
    }
}


export default MySearchForm;