import React, {Component} from "react";
import Talk from "./Talk";
//게시물 리스트

class TalkList extends Component {

    state = {
        talkLength: 9,
        list: []
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list')
            .then(res => res.json())
            .then(res => this.setState({list: res.list}))
            .then(res => this.setState({talkLength: this.state.list.length}))
    }

    addTalk = (data) => {
        fetch('http://localhost:3002/freetalk/list?seq=' + (this.state.talkLength + 1))
            .then(res => res.json())
            .then(res => this.setState({list: this.state.list.concat(res.list)}))
            .then(res => this.setState({talkLength: this.state.list.length}))
    }

    writeTalk = () => {
        alert('sdfsdfsdfsdf');
    }

    handleHover = () => {
        console.log('handle hover');
    }

    render() {
        return (
            <div className="talk-list-wrap">
                {(this.state.list != null)?
                    this.state.list.map( (talk, i) => (
                        <Talk key={talk.seq}
                              seq={talk.seq}
                              title={talk.title}
                              content={talk.content}
                              email={talk.email}
                              nickname={talk.nickname}
                              reg_date={talk.reg_date}
                              />
                    )
                ):' '}
                <div className="talk-list-function-wrap">
                    <input className="btn-primary" type="button" value={"더보기"} onClick={this.addTalk}/>
                </div>
            </div>
        );
    }
}

export default TalkList;