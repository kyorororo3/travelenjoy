import React, {Component} from "react";

class getJsonArr extends Component {

    state = {
        info: [
            {id:1, content:'1111'},
            {id:2, content:'2222'}
        ],
        infoArr: ['infoA', 'infoB', 'infoC']
    }

    componentDidMount() {
        this._callApi()
            .then(res => this.setState({info: res.list}))
            .catch(err => console.log(err));
    }

    _callApi = async () => {
        const resp = await fetch("http://localhost:3002/api/routes/index")
        const body = (await resp).json();
        return body;
    }

    render() {
        const { info } = this.state;
        const itemList = info.map(
            (item, i) => (
                <li key={i}>{item.content}</li>
            )
        )

        return (
            <div className="getJsonArr">
                <p>json arr</p>
                <p>서버 URI : </p>
                <p>결과</p>
                {JSON.stringify(this.state.info)}
                <br/>
                {itemList}
            </div>
        );
    }
}

export default getJsonArr;