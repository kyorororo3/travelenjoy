import React, {Component} from "react";

class PostMenu extends Component {

    state = {
        info: "게시물 목록 하단 메뉴."
    }
    
    render() {
        return (
            <div className="post-menu-wrap">
                <p>{this.state.info}</p>
                <ul>
                    <li>홈</li>
                    <li>검색</li>
                    <li><a href="">작성</a></li>
                    <li>좋아요</li>
                    <li>프로필</li>
                </ul>
            </div>
        );
    }
}

export default PostMenu;