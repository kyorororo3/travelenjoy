import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import '../../resources/guide/css/guideAdmin.css';

class TourValue extends Component {

    constructor(props){
        super(props);
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler = () => {
        //alert("디테일");
        let seq = this.props.list.seq;
        this.props.history.push({
            pathname:`/guide/detail/${seq}`,
            state: {users : this.props.users}
        })
    }

    render(){
        const {seq, category, title, thumbnail} = this.props.list
        return(            
                <div className='list-table-row'>
                    <div className='list-table-cell' onClick={this.clickHandler} style={{ cursor: 'pointer' }}> 
                        {category}
                    </div>
                    <div className='list-table-cell' onClick={this.clickHandler} style={{ cursor: 'pointer' }}>
                        <img className='List-thumbnail-img' src={require(`../../uploads/${thumbnail}`)}/>
                    </div>
                    <div className='list-table-cell' onClick={this.clickHandler} style={{ cursor: 'pointer' }}>
                        {title}
                    </div>
                </div>
     
        )
    }
}

export default withRouter(TourValue);