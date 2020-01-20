import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};
const defaultProps = {

};

class Home extends Component {

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

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;