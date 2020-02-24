import React, { Component } from 'react';

class Pagination extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            pageNumber : 0,  //현재 페이지
            pageSize : 0, // 한페이지당 페이지 수
            rowsPerPage: 5, //한 페이지에 표시할 글 수 
            startIndex: 0,
            endIndex: 0,
            pages:[]
         };
    }

    componentDidMount(){
        console.log('pagination componentDidMount 들어옴')
        //this.getInitialPageHandler();
        console.log('pagination getPageSize 들어옴')

        const { listLength } = this.props;
        const { rowsPerPage } = this.state;

        console.log('listLength', listLength, 'rowsPerPage', rowsPerPage);

        let totalPages = parseInt(listLength / rowsPerPage);
        console.log('totalPages 나눗셈 계산 중 :',totalPages);
        if(parseInt(listLength % rowsPerPage) !== 0){
            totalPages++;
            console.log('totalPages 나머지가 0이 아니래 :',totalPages);
        }

        this.setState({
            pageSize: totalPages
        }, () =>{
            console.log('props length', listLength, 'state ', rowsPerPage, 'pageSize : ', this.state.pageSize);
            this.startHandler(0, this.state.pageSize);
            this.endHandler(0, this.state.pageSize, listLength);
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

   

    startHandler =  (pageNumber, pageSize) => {
        const startIndex = ((pageNumber + 1) / pageSize) * pageSize;
        Object.assign(this.state,{startIndex:startIndex}); 
       
    }

    
    endHandler = async (pageNumber, pageSize, listLength) => {
        console.log('pagination endHandler 들어옴')
        let end =  (((pageNumber + 1) / pageSize) * pageSize) + pageSize; 
        let start = this.state.startIndex;

        console.log('end : ', end, 'start : ', start) ; 

        if(end > listLength){
            end = listLength;
        }
        if((pageNumber + 1) % pageSize === 0){
            start = (((pageNumber + 1) / pageSize) * pageSize) - pageSize;
            end = pageNumber + 1; 
        }
        let pages = [];
        for(let i = start; i < end ; i++){
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