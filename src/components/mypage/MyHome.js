import React, { Component } from 'react';


class MyHome extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                        Mypage contents(body) will be here

                    </div>
                </div>
            </div>
        );
    }
}

export default MyHome;