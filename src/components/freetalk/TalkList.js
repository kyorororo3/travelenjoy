import React, {Component} from "react";
import Talk from "./Talk";
import TalkSearch from "./TalkSearch";

//게시물 리스트

class TalkList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            talkLength: 9,
            list: [],
            currentUser: '',
            keyword: ''
        }
    }


    componentDidMount() {
        // alert('키워드 : ' + this.props.keyword)
        window.addEventListener("scroll", this.handleScroll);
        // fetch('http://localhost:3002/freetalk/list?keyword=' + this.state.keyword)
        this.setTalk(this.state.keyword)
    }

    setTalk = (keyword) => {
        fetch('http://localhost:3002/freetalk/list?keyword=' + keyword)
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
        fetch('http://localhost:3002/freetalk/list?seq=' + (this.state.talkLength + 1) + '&keyword=' + this.state.keyword)
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
            fetch('http://localhost:3002/freetalk/list?seq=' + (this.state.talkLength + 1) + '&keyword=' + this.state.keyword)
                .then(res => res.json())
                .then(res => {
                    if(res.list === undefined){
                        console.log('list undefined!')
                        return;
                    }
                    console.log(JSON.stringify(res.list))
                    console.log('list isnot undefined! ' + this.state.talkLength)
                    this.setState({list: this.state.list.concat(res.list)})
                    this.setState({talkLength: this.state.list.length})
                })
                .then(res => this.setState({talkLength: this.state.list.length}))
        }
    };

    handleDeleteOneItemFromList = () => {
        this.deleteOneItem();
    }

    async deleteOneItem() {
        if(this.state.list.length > 0 )
            this.setState({list: this.state.list.splice(1, (this.state.list.length -1) )})
    }

    handleSearch = (keyword) => {
        console.log('keyword : ' + keyword)
        this.setState({keyword: keyword});
        this.setTalk(keyword);
    }

    render() {
        return (
            <div className="talk-list-wrap">
                <TalkSearch handleSearch={this.handleSearch}/>
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
                              reloadMain={this.props.reloadMain}
                              deleteOneFromList={this.handleDeleteOneItemFromList}
                        />
                    )
                ):' '}
            </div>
        );
    }
}

export default TalkList;