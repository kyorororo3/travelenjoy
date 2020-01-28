import React, { Component } from 'react';
import '../../resources/travel/css/travellist.css';


class MyTravel extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='mypage-body'>
                    <div className='body-wrapper box'>
                        <div className='body-info-container'> 
                            <form>
                                <select className='category-selection'>
                                    <option>title</option>
                                    <option>location</option>
                                    <option>date</option>
                                </select>
                                <input type='text' name='search' className='search-input'/>
                                <button className='basic-btn'>search</button>
                            </form>
                            <div className='list-container'>
                                <div className='tour-list-obj card-container'>
                                    <div className='tour-thumbnail'>
                                        <div>썸네일 자리</div>
                                    </div>
                                    <div className='tour-infos'>
                                        <div className='rows tour-category'></div>
                                        <div className='rows tour-title'></div>
                                        <div className='rows'>
                                        <div className='tour-price'>원</div>
                                        <div className='tour-nickname'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
    }
}


export default MyTravel;