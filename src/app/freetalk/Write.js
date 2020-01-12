import React, {Component} from "react";

class Write extends Component {

    state = {
        info: "새 게시물 작성"
    }

    render() {
        return (
            <div className="write-new-post-wrap">
                <form>
                    <input type="text" placeholder={"제목"}/>
                    <textarea></textarea>
                    <input type={"submit"}/>
                </form>
            </div>
        );
    }
}

export default Write;