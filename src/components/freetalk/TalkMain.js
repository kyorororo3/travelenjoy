import React, {Component} from "react";
import TalkList from "./TalkList";
import Write from "./TalkWrite";
import TalkWriteBtn from "./TalkWriteBtn";
import '../../resources/freetalk/css/free.css';
import TalkSearch from "./TalkSearch";

//게시판 메인 컴포넌트

class TalkMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'talk-list',
            currentUser: ''
        }
        fetch('http://localhost:3002/users/getUser',{
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => {
                    if(data.email !== undefined)
                        this.setState({currentUser : JSON.stringify(data)})
                }
            );
    }

    getCurrentUser = () => {
        return this.state.currentUser;
    }

    componentDidMount() {

    }

    _callApi = async () => {

    }

    reloadMain = () => window.location.reload();

    changeMode = (str) => {
        this.setState({mode: str})
    }

    render() {
        let currentMode = this.state.mode;
        let currentPage = null;
        switch (currentMode) {
            case "write": currentPage = <Write/>;
            break;
            case "my": currentPage = <TalkList currentUser={this.getCurrentUser}/>;
            break;
            default: currentPage = <TalkList currentUser={this.getCurrentUser}/>
            break;
        }

        return (
            <div className="container">
                <TalkSearch/>
                <div className="talk-list-wrap">
                    {currentPage}
                    <TalkWriteBtn currentUser={this.getCurrentUser} reloadMain={this.reloadMain}/>
                </div>
            </div>
        );
    }
}

export default TalkMain;