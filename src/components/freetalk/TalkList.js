import React, {Component} from "react";
import Talk from "./Talk";
//게시물 리스트

class TalkList extends Component {

    state = {
        talkLength: 3,
        talkList: [
            {id: 1, title: '제목1', content: '내용1', email: '111', nickname: '1111', reg_date: '111'}
        ],
        list: []
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list')
            .then(res => res.json())
            .then(res => this.setState({list: res.list}))
    }

    _callApi = async () => {

    }

    addTalk = (data) => {
        const {info} = this.state;
        this.setState({
            list: this.state.list.concat({seq:66})
        })
    }

    writeTalk = () => {
        alert('sdfsdfsdfsdf');
    }

    render() {
        return (
            <div className="talk-list-wrap">

                <h2>여기부터 게시물들이 나갈겁니다</h2>
                {(this.state.list != null)?
                    this.state.list.map( (talk, i) => (
                        <Talk key={talk.seq}
                              seq={talk.seq}
                              title={talk.title}
                              content={talk.content}
                              email={talk.email}
                              nickname={talk.nickname}
                              reg_date={talk.reg_date}/>
                    )
                ):' '}

                <input className="btn-primary" type="button" value={"더보기"} onClick={this.addTalk}/>
            </div>
        );
    }
}

export default TalkList;