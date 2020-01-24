import React, { Component } from 'react';


class MyHistory extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            My History is here. My major is Korean History

                        </div>
                    </div>
            </div>
        );
    }
}


export default MyHistory;