import React, {Component} from "react";

class Post extends Component {

    state = {
        info: "기본값입니다."
    }

    render() {
        return (
            <div className="post-list-wrap">
                <p>{this.state.info}</p>
                <p>여러 포스트를 보여주마</p>
            </div>
        );
    }
}

export default Post;