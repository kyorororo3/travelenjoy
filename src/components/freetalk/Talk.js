import React, {Component} from "react";

//게시물

class Talk extends Component {

    state = {
        file: 'cat1.jpg'
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    render() {
        return (
            <div className="talk-wrap">
                <p>요게 하나에요</p>
                <div className="talk-image-wrap">
                <img src={require('../../resources/freetalk/image/' + this.state.file)}/>
                </div>
                <div className="talk-text-wrap">
                    <div>No : {this.props.seq}</div>
                    <div>Title : {this.props.title}</div>
                    <div>Content : {this.props.content}</div>
                    <div>Email : {this.props.email}</div>
                    <div>Nickname : {this.props.nickname}</div>
                    <div>reg_date : {this.props.reg_date}</div>
                </div>
            </div>
        );
    }
}

export default Talk;