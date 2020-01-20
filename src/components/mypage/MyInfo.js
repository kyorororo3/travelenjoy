import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {

};
const defaultProps = {

};

class Info extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                <div className='body-wrapper box'>
                    <div className='body-info-container'> 
                        My information is here

                    </div>
                </div>
            </div>
        );
    }
}

Info.propTypes = propTypes;
Info.defaultProps = defaultProps;

export default Info;