import React, {Component} from "react";

//게시물

class TalkSearch extends Component {

    constructor(props) {
        super(props);
        this.state = {
            keyword : (props.keyword === '')?'':props.keyword
        }
    }

    handleOnchange = (e) => {
        e.preventDefault();
        this.props.handleSearch(e.target.value);
    }

    render() {
        return (
            <div className="talk-search-wrap">
                <div className="main-text">이야기를 검색해 보세요.</div>
                <div className='talk-search-form-wrap'>
                    <form className='talk-search-form' action='/talk' autoComplete='off'
                          onSubmit={this.handleSearch}>
                        <input className='talk-search-input' type='text' name='keyword'
                               placeholder='검색어 입력' value={this.state.keyword}
                               onChange={this.handleOnchange}
                        />
                        <input className='btn-search' type='submit' value=''/>
                    </form>
                </div>
            </div>
        );
    }
}

export default TalkSearch;