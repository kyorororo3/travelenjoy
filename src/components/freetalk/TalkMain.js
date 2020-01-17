import React, {Component} from "react";
import TalkList from "./TalkList";

//게시판 메인 컴포넌트

class TalkMain extends Component {

    state = {
        list: []
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    render() {
        return (
            <div class="talk-main-wrap">
                {this.state.list}
                <h1>여기가 자유게시판 메인입니다.</h1>
                <TalkList/>
            </div>
        );
    }
}

export default TalkMain;