import React, { Component } from 'react';


class MySearchForm extends Component {
    
    render(){
        return(
            <form>
                <select className='category-selection'>
                    <option>title</option>
                    <option>location</option>
                    <option>date</option>
                </select>
                <input type='text' name='search' className='search-input'/>
                <button className='basic-btn'>search</button>
            </form>
        );
    }
}


export default MySearchForm;