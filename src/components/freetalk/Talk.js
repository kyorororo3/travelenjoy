import React, {Component} from "react";

//게시물

class Talk extends Component {

    state = {
        file: 'cat21.jpg',
        images: []
    }

    componentDidMount() {
        fetch('http://localhost:3002/freetalk/list/images?seq=' + this.props.seq)
            .then(res => res.json())
            .then(res => this.setState({images: res.images}))
            .then(res => this.setState({file: (this.state.images.length>0)?this.state.images[0].name_real:this.state.file}))
            .then(res => console.log("images : " + this.state.images))
    }

    _callApi = async () => {

    }

    render() {
        return (
            <div className="talk-wrap">
                <div className="talk-image-wrap">
                    <img src={require('../../resources/freetalk/image/' + this.state.file)}/>
                    <div className={"talk-image-files"} hidden={"true"}>
                        {(this.state.images != null)?
                            this.state.images.map( (image, i) => (
                                    <img key={image.seq}
                                         src={require('../../resources/freetalk/image/' + image.name_real)}/>
                                )
                            ):' '}
                    </div>
                </div>
                <div className="talk-text-wrap">
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