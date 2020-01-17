import React, {Component} from "react";
import Talk from "./Talk";
//게시물 리스트

class TalkList extends Component {

    state = {
        talkLength: 3,
        talkList: [
            {id:1, title: '제목1', content:'내용1', email:'111', nickname: '1111', reg_date: '111'}
        ],
        list: []
    }     

    componentDidMount() {
        fetch('http://localhost:3002/free/get/all')
            .then(res => res.json())
            .then(data => this.setState({
                    list: data,
                    isLoaded: true
                })
            );
    }

    _callApi = async () => {

    }

    addTalkToTalkList() {
        console.log('ok!');
        fetch('http://localhost:3002/free/get/alltest')
            .then(res => res.json())
            .then(data => this.setState({
                    list: data,
                    isLoaded: true
                })
            );
        console.log('ok!');
    }

    render() {
        return (
            <div class="talk-list-wrap">

                {this.state.list.map( (post, i) => (
                    <p>rr!! {post.id}</p>
                    )
                )}


                <h2>여기부터 게시물들이 나갈겁니다</h2>
                {this.state.talkList.map( (talk, i) => (
                        <Talk id={talk.id}
                            title={talk.title}
                            content={talk.content}
                            email={talk.email}
                            nickname={talk.nickname}
                            reg_date={talk.reg_date}/>
                    )
                )}

                <input class="btn-primary" type="button" value={"더보기"} onClick={this.addTalkToTalkList}/>
            </div>
        );
    }
}

export default TalkList;