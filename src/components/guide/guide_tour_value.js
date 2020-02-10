import React, { Component } from 'react';
import '../../resources/guide/css/guideAdmin.css';

class TourValue extends Component {

    constructor(props){
        super(props);
    }

    clickHandler(){
        alert("디테일");
    }

    render(){
        const {seq, category, title, thumbnail} = this.props.list
        return(            
                <div className='list-table-row'>
                    <div className='list-table-cell'>
                        <input type='checkbox'></input>
                    </div>
                    <div className='list-table-cell'>
                        {category}
                    </div>
                    <div className='list-table-cell'>
                        <img className='List-thumbnail-img' src={require(`../../uploads/${thumbnail}`)}/>
                    </div>
                    <div className='list-table-cell' onClick={this.clickHandler}>
                        {title}
                    </div>
                </div>
     
        )
    }
}

export default TourValue;