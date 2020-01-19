import React, {Component} from "react";
import TalkList from "./TalkList";

//게시판 메인 컴포넌트

class TalkMain extends Component {
    state = {
        // mode: 'talk-list'
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    changeMode = (str) => {
        this.setState({mode: str})
    }

    render() {
        // let currentMode = this.state.mode;
        return (
            <div className="talk-main-wrap">
                {/*{currentMode})*/}
                <h1>여기가 자유게시판 메인입니다.</h1>
                <TalkList/>

                <input className="btn-primary" type="button" value={"글 목록"} onClick={() => this.changeMode('list')}/>
                <input className="btn-primary" type="button" value={"새 게시물 작성"} onClick={() => this.changeMode('write')}/>
                <input className="btn-primary" type="button" value={"내 글"} onClick={() => this.changeMode('my')}/>
                <a href={"/free/write"}>새 게시물 작성</a>
            </div>
        );
    }
}

export default TalkMain;