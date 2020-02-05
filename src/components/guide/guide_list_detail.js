import React, { Component } from 'react';

class GuideDetail extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        let seq = this.props.match.params.seq;
        fetch(`http://localhost:3002/guide/tourDetail?seq=${seq}`)
        .then(res => res.json())
        .then(data => console.log(data))
    }

    render(){
        return(
            <div>디테일</div>
        )
    }
}

export default GuideDetail;