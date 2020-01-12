import React, {Component} from "react";
import PostMenu from "./PostMenu";

class Post extends Component {

    state = {
        info: "기본값입니다."
    }

    render() {
        return (
            <div className="post-wrap">
                <a href="/">메인으로</a>
                <p>{this.state.info}</p>
                <p>기본게시물</p>
                <p>사진</p>
                <p>코멘트</p>
                <p>해시태그</p>
                <PostMenu/>
            </div>
        );
    }
}

export default Post;