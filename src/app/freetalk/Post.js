import React, {Component} from "react";

class Post extends Component {

    state = {
        info: "기본값입니다."
    }
    
    render() {
        return (
            <div className="post-wrap">
                <p>{this.state.info}</p>
                <p>기본게시물</p>
                <p>사진</p>
                <p>코멘트</p>
                <p>해시태그</p>
            </div>
        );
    }
}

export default Post;