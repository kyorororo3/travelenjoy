import React, {Component} from "react";
import axios from 'axios';

function sendData(data) {
    fetch('http://localhost:3002/api/free/save/1', {
        method: 'post',
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then(obj => {
            console.log(obj);
            if(obj.NAME !== undefined) {
                alert("post data ok");
            }else {
                alert("post data err");
            }
        });
}

class Write extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        sendData({
            title: e.target.title.value,
            content: e.target.content.value,
            email: "admin",
            nickname: "admin nick",
        })
    }

    render() {
        return (
            <div className="write-new-post-wrap">
                <form onSubmit={this.handleSubmit}>
                    <input name="title" type="text" placeholder="제목"/>
                    <textarea name="content"></textarea>
                    <input type="submit"/>
                </form>
            </div>
        );
    }
}

export default Write;