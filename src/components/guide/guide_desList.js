import React, { Component } from 'react';
import Des_List from './guide_desListForm';

class DesList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { desData } = this.props;
        return (desData.map((data,i) => {
            return (<Des_List key={i} desData={data} />)
        }))

    }
}

export default DesList;