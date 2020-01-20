import React, {Component} from "react";

class Main extends Component {

    render() {
        return (
            <div className="main-wrap">
                <h1>메인페이지</h1>
                <a href={"/post"}>게시글목록</a>
                <br/>
                <a href="/my">마이페이지</a>
            </div>
        );
    }
}

export default Main;