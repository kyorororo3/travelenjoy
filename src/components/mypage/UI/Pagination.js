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
        const { listLength } = this.props;
        const { rowsPerPage } = this.state;

        this.setState({
            pageSize: this.getPageSize(listLength, rowsPerPage)
        }, () =>{
            console.log('props length', listLength, 'state ', rowsPerPage, 'pageSize : ', this.state.pageSize);
            this.startHandler(0, this.state.pageSize);
            this.endHandler(0, this.state.pageSize, listLength);
        })
    

    }
    
    shouldComponentUpdate(nextProps, nextState){
        return this.props !== nextProps || this.state !== nextState
    }

    getPageSize = (listLength, rowsPerPage) => {
        let totalPages = parseInt(listLength / rowsPerPage);
      
        if(parseInt(listLength % rowsPerPage) !== 0){
            totalPages++;
        }

        return totalPages;
    }

    pageHandler = async (e) => {
        
        this.setState({pageNumber:parseInt(e.target.dataset.page)}) 
        console.log('e check ', this.state.pageNumber );

        const {listLength} = this.props;
        const {rowsPerPage} = this.state;
        await this.setState({
            pageSize: this.getPageSize(listLength, rowsPerPage)
        }, () => {
           
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

    render() {
        const { pageNumber, pages} = this.state;
        return (
            <ul className="pagination">
               {pages.length !==0 &&
                    <li>
                        <a><i className="fas fa-arrow-alt-circle-left"></i></a>    
                    </li>
                }
                
                {pages.map(page  =>
                    <li key={page} className={page === pageNumber +1? 'page-number active' : 'page-number'}>
                        <a name='page' onClick={this.pageHandler} data-page={page-1} >{page}</a>
                    </li>
                )}
               {pages.length !==0 &&
                    <li>
                        <a><i className="fas fa-arrow-alt-circle-right"></i></a>    
                    </li>
                }
            </ul>
        );
    }
}


export default Pagination;