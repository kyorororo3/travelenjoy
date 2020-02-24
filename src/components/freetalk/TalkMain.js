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
            currentUser: '',
            keyword: '',
            talkLength: 9,
            list: []
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

    getKeyword = () => {
        return this.state.keyword;
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
            case "my": currentPage = <TalkList currentUser={this.getCurrentUser} reloadMain={this.reloadMain} getKeyword={this.getKeyword} keyword={this.state.keyword} mainList={this.state.list}/>;
            break;
            default: currentPage = <TalkList currentUser={this.getCurrentUser} reloadMain={this.reloadMain} getKeyword={this.getKeyword} keyword={this.state.keyword} mainList={this.state.list}/>
            break;
        }

        return (
            <div className="container">
                {/*<TalkSearch handleSearch={this.handleSearch}/>*/}
                <div className="talk-list-wrap">
                    {currentPage}
                    <TalkWriteBtn currentUser={this.getCurrentUser}
                                  reloadMain={this.reloadMain}
                                  />
                </div>
            </div>
        );
    }
}

export default TalkMain;