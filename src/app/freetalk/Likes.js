import React, {Component} from "react";

class Write extends Component {

    state = {
        info: "내 좋아요 목록"
    }

    render() {
        return (
            <div className="post-likes-wrap">
                <h2>내 좋아요 목록</h2>
            </div>
        );
    }
}

export default Write;