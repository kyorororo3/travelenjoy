import React, { Component } from 'react';

import DetailDes from './guide_de_desValue';

class GuideDeDes extends Component {
    constructor(props){
        super(props);
            this.state={
                deslist : this.props
            }
    }
    render(){
        console.log("de_des.js!! " , this.props)
        console.log("de_des.state.js!! " , this.state.deslist)
        const { des } = this.state.deslist;
        return(
            <div>
                
            {des.map((list,i) => <DetailDes key={i} list={list} />)}
                
            </div>   
        )
    }
}

export default GuideDeDes;