import React, {Component} from "react";

//게시물

class Talk extends Component {

    componentDidMount() {

    }

    _callApi = async () => {

    }

    render() {
        return (
            <div className="talk-main-wrap">
                <p>요게 하나에요</p>
                <div>No : {this.props.seq}</div>
                <div>Title : {this.props.title}</div>
                <div>Content : {this.props.content}</div>
                <div>Email : {this.props.email}</div>
                <div>Nickname : {this.props.nickname}</div>
                <div>reg_date : {this.props.reg_date}</div>
            </div>
        );
    }
}

export default Talk;