import React, { Component } from 'react';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            listLength : 10,  //전체 글 수
            pageNumber : 0,  //현재 페이지
            pageSize : 0, // 한페이지당 페이지 수
            rowsPerPage: 5, //한 페이지에 표시할 글 수 
            // totalPages: 0, // 총 페이지 수 
            startIndex: 0,
            endIndex: 0,
            pages:[],
            pageNumber:0
         };
    }


    componentDidMount(){
        console.log('pagination componentDidMount 들어옴')
        console.log('props check', this.props.listLength);
        const { listLength,  rowsPerPage } = this.state;
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

    
    pageHandler = async (e) => {
        let pageNum = e.target.page;
        console.log('이리로 오는가',pageNum);
        const {listLength} = this.props;
        const {rowsPerPage} = this.state;
        await this.setState({
            pageSize: this.getPageSize(listLength, rowsPerPage)
        }, () => {
            this.startHandler(this.state.pageNumber, this.state.pageSize);
            this.endHandler(this.state.pageNumber, this.state.pageSize, listLength);
            this.props.pageFetcher({pageNumber:this.state.pageNumber});
        })
    }

    getPageSize = (listLength, rowsPerPage) => {
        console.log('pagination getPageSize 들어옴')
        let totalPages = listLength / rowsPerPage;
        if((listLength % rowsPerPage) !== 0){
            totalPages++;
        }
        console.log('pagination getPageSize totalPage 들어옴', totalPages);
        return totalPages;
    }

    startHandler = async (pageNumber, pageSize) => {
        console.log('pagination startHandler 들어옴')
        const startIndex = ((pageNumber + 1) / pageSize) * pageSize;
        await this.setState({
            startIndex:startIndex
        }); 
    }

    
    endHandler = async (pageNumber, pageSize, listLength) => {
        console.log('pagination endHandler 들어옴')
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
        for(let i = start+1 ; i <= end ; i++){
            pages.push(i);
            console.log('pages check',pages);
        }
        await this.setState({
            startIndex:start,
            endIndex:end,
            pages:pages
        })
    }

    getPageNumber = () =>{
        return this.state.pageNumber
    }

    render() {
        const { startIndex, endIndex, pageNumber, listLength, pages} = this.state;
        return (
            <ul className="pagination">
               
                    <li>
                        <a  {...startIndex > 1 && `onClick='${this.pageHandler}`}><i className="fas fa-arrow-alt-circle-left"></i></a>    
                    </li>
              
                {pages.map(page  =>
                    <li key={page} className={page === pageNumber + 1 ? 'page-number active' : 'page-number'}>
                        <a name='page' onClick={this.pageHandler} value={page} >{page}</a>
                    </li>
                )}
                    <li>
                    <a  {...endIndex < listLength && `onClick='${this.pageHandler}`}><i className="fas fa-arrow-alt-circle-right"></i></a>    
                    </li>
            </ul>
        );
    }
}


export default Pagination;