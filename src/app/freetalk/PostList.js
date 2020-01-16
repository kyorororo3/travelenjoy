import React, {Component} from "react";

class PostList extends Component {

    state = {
        info: [
            {id:1, title: '11', content:'1111', email:'111', nickname: '1111', reg_date: '111'}
        ],
        string_info: []
    }

    componentDidMount() {
        this._callApi()
            .then(res => this.setState({info: res.list}))
            //.then(res => this.setState({aaa: res.list.RowDataPacket}))
            .catch(err => console.log(err))
            //.then(res => console.log())
    }

    _callApi = async () => {
        const resp = await fetch("http://localhost:3002/api/free/get/all")
        const body = (await resp).json();
        return body;
    }

    render() {
        return (
            <div className="post-list-wrap">
                {this.state.info}
                <p>여러 포스트를 보여주마</p>
            </div>
        );
    }
}

export default PostList;