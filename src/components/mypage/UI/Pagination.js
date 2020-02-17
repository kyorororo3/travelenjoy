import React, { Component } from 'react';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            //listLength : 0,  //전체 글 수
            pageNumber : 0,  //현재 페이지
            pageSize : 0, // 한페이지당 페이지 수
            rowsPerPage: 5, //한 페이지에 표시할 글 수 
            // totalPages: 0, // 총 페이지 수 
            startIndex: 0,
            endIndex: 0,
            pages:[]
         };
    }

    componentDidMount(){
        console.log('pagination componentDidMount 들어옴')
        const { listLength } = this.props;
        const { rowsPerPage } = this.state;
        this.setState({
            pageSize: this.getPageSize(listLength, rowsPerPage)
        }, () =>{
            console.log('props length', listLength, 'state ', rowsPerPage);
            this.startHandler(1, this.state.pageSize);
            this.endHandler(1, this.state.pageSize, listLength);
        })

    }

    
    shouldComponentUpdate(nextProps, nextState){
        return this.props !== nextProps || this.state !== nextState
    }

    
    pageHandler = async (pageNumber) => {
        const {listLength} = this.props;
        const {rowsPerPage} = this.state;
        await this.setState({
            pageSize: this.getPageSize(listLength, rowsPerPage)
        }, () => {
            this.startHandler(pageNumber, this.state.pageSize);
            this.endHandler(pageNumber, this.state.pageSize, listLength);
            this.props.PageFetcher(pageNumber);
        })
    }

    getPageSize = (listLength, rowsPerPage) => {
        let totalPages = listLength / rowsPerPage;
        if((listLength % rowsPerPage) !== 0){
            totalPages++;
        }
        return totalPages;
    }

    startHandler = async (pageNumber, pageSize) => {
        const startIndex = ((pageNumber + 1) / pageSize) * pageSize;
        await this.setState({
            startIndex:startIndex
        }); 
    }

    
    endHandler = async (pageNumber, pageSize, listLength) => {
        let end =  (((pageNumber + 1) / pageSize) * pageSize) + pageSize; 
        let start = this.state.startIndex;
        if(end > listLength){
            end = listLength;
        }
        if((pageNumber + 1) % pageSize === 0){
            start = (((pageNumber + 1) / pageSize) * pageSize) - pageSize;
            end = pageNumber + 1; 
        }
        let pages = [];
        for(let i = start ; i < end ; i++){
            pages.concat(i);
        }
        await this.setState({
            startIndex:start,
            endIndex:end,
            pages:pages
        })
    }



    render() {
        const { startIndex, endIndex, pageNumber, listLength, pages} = this.state;
        return (
            <ul className="pagination">
                {startIndex > 1 &&
                    <li>
                        <a onClick={this.pageHandler(startIndex)}><i className="fas fa-arrow-alt-circle-left"></i></a>    
                    </li>
                }
                {pages.map((page, index) =>
                    <li key={index} className={page === pageNumber ? 'active' : ''}>
                        <a onClick={this.pageHandler(page)} >{page}</a>
                    </li>
                )}
                {endIndex < listLength &&
                    <li>
                    <a onClick={this.pageHandler(endIndex)}><i className="fas fa-arrow-alt-circle-right"></i></a>    
                    </li>
                }
            </ul>
        );
    }
}


export default Pagination;