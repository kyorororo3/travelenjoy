import React, { Component } from 'react';
import GuideHeader from './guide_Header';
import List from './guide_tour_value';

import '../../resources/guide/css/guideAdmin.css';

class GuideList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: []
        }
    }

    componentDidMount() {
        const email = this.props.location.state.users.email;
        console.log("list.js ", this.props.location.state.users.email);
        fetch(`http://localhost:3002/guide/tourList?email=${email}`)
            .then(res => res.json())
            .then(data =>
                this.setState({
                    list: data
                }))
    }

    render() {
        const {list} = this.state
        return (
            <div className="container">
                <GuideHeader />
                <div className='list-title'>
                    <span className='list-title-span'>나의 투어 목록</span><img className='guide-tour-img' src={require('../../resources/guide/images/mylist.png')} />
                </div>
                <div className='list-table-div'>                   
                    <div className='list-table-row'>
                        <div className='list-table-cell'>
                            <input type='checkbox'></input>
                        </div>
                        <div className='list-table-cell'>
                            <span className='list-table-header'>투어 지역</span>
                        </div>
                        <div className='list-table-cell'>
                            <span className='list-table-header'>대표 사진</span>
                        </div>
                        <div className='list-table-cell'>
                            <span className='list-table-header'>투어 제목</span>
                        </div>                        
                    </div>
                    
                    {list.map(list => {
                        return <List key={list.seq} list={list} />
                    })}
                </div>                
            </div>
        )
    }
}

export default GuideList;