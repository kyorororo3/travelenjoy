import React, {Component} from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//새 게시물 작성

class TalkWrite extends Component {

    constructor(props) {
        super(props)
        this.state = { text: '' } // You can also pass a Quill Delta here
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        this.setState({ text: value })
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    render() {
        return (
            <div className="talk-write-wrap">
                <p>게시물 작성합시다 ㅎㅎ</p>
                <ReactQuill value={this.state.text}
                            onChange={this.handleChange} />
            </div>
        );
    }
}

export default TalkWrite;