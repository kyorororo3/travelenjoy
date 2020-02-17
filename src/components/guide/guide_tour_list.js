import React, { Component } from 'react';
import GuideHeader from './guide_Header';
import List from './guide_tour_value';

import '../../resources/guide/css/guideAdmin.css';

class GuideList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            list: [],
            email: this.props.location.state.users,
            startNum: 0,
            totalList: 0,
            keyword: '',
            search: ''
        }
        this.preClick = this.preClick.bind(this);
        this.nextClick = this.nextClick.bind(this);
        this.searchClick = this.searchClick.bind(this);
        this.inputFormHandler = this.inputFormHandler.bind(this);
    }

    componentDidMount() {
        const email = this.props.location.state.users.email;
        let startNum = this.state.startNum;
        let category = this.state.keyword;
        let search = this.state.search;

        console.log("list.js ", this.props.location.state.users.email);
        fetch(`http://localhost:3002/guide//tourList?email=${email}&startNum=0&keyword=${category}&search=${search}`)
            .then(res => res.json())
            .then(data =>
                this.setState({
                    list: data,
                    totalList: data.length
                }))
    }

    inputFormHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    preClick = (e) => {
        e.preventDefault();
        //alert("이전");
        const email = this.props.location.state.users.email;
        let startNum = this.state.startNum - 10;
        let category = this.state.keyword;
        let search = this.state.search;

        this.setState({
            startNum: startNum
        })

        if (this.state.startNum <= 0) {
            alert("첫 페이지 입니다.");
            this.setState({
                startNum: 0
            })
        } else {
            fetch(`http://localhost:3002/guide/tourList?email=${email}&startNum=${startNum}&keyword=${category}&search=${search}`)
                .then(res => res.json())
                .then(data =>
                    this.setState({
                        list: data,
                        totalList: data.length
                    }))
        }
    }

    nextClick = (e) => {
        e.preventDefault();
        //alert("다음");
        //alert(this.state.totalList);
        if (this.state.totalList != 10) {
            alert("마지막 페이지 입니다.");
        } else {
            const email = this.props.location.state.users.email;
            let startNum = this.state.startNum + 10;
            let total = this.state.totalList;
            let category = this.state.keyword;
            let search = this.state.search;

            this.setState({
                startNum: startNum
            })

            fetch(`http://localhost:3002/guide/tourList?email=${email}&startNum=${startNum}&keyword=${category}&search=${search}`)
                .then(res => res.json())
                .then(data =>
                    this.setState({
                        list: data,
                        totalList: data.length
                    }))
        }
    }

    searchClick = (e) => {
        e.preventDefault();
        const email = this.props.location.state.users.email;
        let startNum = this.state.startNum;
        let category = this.state.keyword;
        let search = this.state.search;
        if(category === ""){
            alert("검색유형을 선택해 주세요");
        }else if(search === ""){
            alert("검색어를 입력해 주세요");
        }else{
        fetch(`http://localhost:3002/guide//tourList?email=${email}&startNum=0&keyword=${category}&search=${search}`)
            .then(res => res.json())
            .then(data =>
                this.setState({
                    list: data
                }))
        }
    }


    render() {
        const { list } = this.state
        return (
            <div className="container">
                <GuideHeader users={this.state.email} />
                <div className='list-title'>
                    <span className='list-title-span'>나의 투어 목록</span><img className='guide-tour-img' src={require('../../resources/guide/images/mylist.png')} />
                    <div className="all-search-div">
                        <div className="search-select-div">
                            <select name="keyword" onChange={this.inputFormHandler}>
                                <option value="">선택</option>
                                <option value="category">투어 지역</option>
                                <option value="title">투어 제목</option>
                            </select>
                        </div>
                        <div className="search-input-div">
                            <input type="text" name="search" onChange={this.inputFormHandler} placehodler="검색"></input>
                        </div>
                        <div className="search-btn-div">
                            <input type="button" className='search-btn' onClick={this.searchClick}></input>
                        </div>
                    </div>
                </div>
                <div className='list-table-div'>
                    <div className='list-table-row'>
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
                        return <List key={list.seq} list={list} users={this.state.email} />
                    })}
                </div>
                <div className='pageBtndiv'>
                    <div className='preBtndiv'>
                        <input type="button" className='preBtn' onClick={this.preClick} value="<" />
                    </div>
                    <div className='nextBtndiv'>
                        <input type="button" className='nextBtn' onClick={this.nextClick} value=">" />
                    </div>
                </div>
            </div>
        )
    }
}

export default GuideList;