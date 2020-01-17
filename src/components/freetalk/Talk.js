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
                <div>No : {this.props.id}</div>
                <div>Title : {this.props.title}</div>
                <div>Content : {this.props.Content}</div>
                <div>Email : {this.props.Email}</div>
                <div>Nickname : {this.props.Nickname}</div>
                <div>reg_date : {this.props.reg_date}</div>
            </div>
        );
    }
}

export default Talk;