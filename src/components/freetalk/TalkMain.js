import React, {Component} from "react";
import TalkList from "./TalkList";
import Write from "./TalkWrite";
import TalkWriteBtn from "./TalkWriteBtn";
import '../../resources/freetalk/css/free.css';
import TalkSearch from "./TalkSearch";

//게시판 메인 컴포넌트

class TalkMain extends Component {
    state = {
        mode: 'talk-list'
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    changeMode = (str) => {
        this.setState({mode: str})
    }

    render() {
        let currentMode = this.state.mode;
        let currentPage = null;
        switch (currentMode) {
            case "write": currentPage = <Write/>;
            break;
            case "my": currentPage = <TalkList/>;
            break;
            default: currentPage = <TalkList/>
            break;
        }

        return (
            <div className="container">
                <TalkSearch/>
                <div className="talk-list-wrap">
                    {currentPage}
                    <TalkWriteBtn/>
                </div>
            </div>
        );
    }
}

export default TalkMain;