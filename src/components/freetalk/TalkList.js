import React, {Component} from "react";
import Talk from "./Talk";
//게시물 리스트

class TalkList extends Component {

    state = {
        talkLength: 9,
        list: [],
        currentUser: ''
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        fetch('http://localhost:3002/freetalk/list')
            .then(res => res.json())
            .then(res => this.setState({list: res.list}))
            .then(res => this.setState({talkLength: this.state.list.length}))
        this.setState({currentUser: this.props.currentUser})
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this.handleScroll);
    }

    addTalk = (data) => {
        fetch('http://localhost:3002/freetalk/list?seq=' + (this.state.talkLength + 1))
            .then(res => res.json())
            .then(res => this.setState({list: this.state.list.concat(res.list)}))
            .then(res => this.setState({talkLength: this.state.list.length}))
    }

    handleScroll = () => {
        const { innerHeight } = window;
        const { scrollHeight } = document.body;
        const scrollTop =
            (document.documentElement && document.documentElement.scrollTop) ||
            document.body.scrollTop;
        if (scrollHeight - innerHeight - scrollTop < 100) {
            console.log("Almost Bottom Of This Browser");
            fetch('http://localhost:3002/freetalk/list?seq=' + (this.state.talkLength + 1))
                .then(res => res.json())
                .then(res => this.setState({list: this.state.list.concat(res.list)}))
                .then(res => this.setState({talkLength: this.state.list.length}))
        }
    };

    render() {
        return (
            <div className="talk-list-wrap">
                {this.state.currentUser}
                {(this.state.list != null)?
                    this.state.list.map( (talk, i) => (
                        <Talk key={talk.seq}
                              seq={talk.seq}
                              title={talk.title}
                              content={talk.content}
                              email={talk.email}
                              nickname={talk.nickname}
                              reg_date={talk.reg_date}
                              current_user={this.state.currentUser}
                        />
                    )
                ):' '}
            </div>
        );
    }
}

export default TalkList;