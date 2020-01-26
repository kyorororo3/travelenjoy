import React, {Component} from "react";
import '../../resources/freetalk/css/free_talk.css'

//게시물

class Talk extends Component {

    state = {
        file: 'cat19.jpg',
        images: [],
        likes: 0,
        comments: 0
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
            .then(res => console.log("images : " + this.state.images))
        fetch('http://localhost:3002/freetalk/list/likes?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({likes: res.likes}))
    }

    _callApi = async () => {

    }

    handleHover = (e) => {
        console.log('handle hover');
    }

    render() {
        return (
            <div className="talk-wrap">
                <div className="talk-image-wrap" onMouseOver={this.handleHover}>
                    <div className={"talk-image-description"}>
                        <i className={"far fa-heart"}/> {this.state.likes}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <i className="far fa-comment-dots"/> {this.state.comments}
                    </div>
                    <img src={require('../../resources/freetalk/image/talk/' + this.state.file)}/>

                    <div className={"talk-image-files"} style={{display:'none'}}>
                        {(this.state.images.length > 0)?
                            this.state.images.map( (image, i) => (
                                    <img key={image.seq}
                                         src={require('../../resources/freetalk/image/talk/' + image.name_real)}/>
                                ))
                            :' '}
                    </div>
                </div>
                <div className="talk-text-wrap" style={{display:'none'}}>
                {/*<div className="talk-text-wrap">*/}
                    <div>No : {this.props.seq}</div>
                    <div>Title : {this.props.title}</div>
                    <div>Content : {this.props.content}</div>
                    <div>Email : {this.props.email}</div>
                    <div>Nickname : {this.props.nickname}</div>
                    <div>reg_date : {this.props.reg_date}</div>
                </div>
            </div>
        );
    }
}

export default Talk;