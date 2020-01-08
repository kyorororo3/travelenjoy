import React, {Component} from "react";

class PostMenu extends Component {

    state = {
        info: "게시물 목록 하단 메뉴."
    }
    
    render() {
        return (
            <div className="post-menu-wrap">
                <p>{this.state.info}</p>
                <p>홈</p>
                <p>검색</p>
                <p>추가</p>
                <p>좋아요</p>
                <p>프로필</p>
            </div>
        );
    }
}

export default PostMenu;