import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../../resources/mypage/css/mypage.css';


//components
import Sidebar from './MySidebar';
import Home from './MyHome';
import Calendar from './MyCalendar';
import Travel from './MyTravel';
import History from './MyHistory';


class Mypage extends Component {

    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className='container'>
                <Router>
                <div className='mypage-heading'>마이페이지 홈</div>
                <Sidebar/>
                <Switch>
                    <Route exact path='/mypage' component={Home} />
                    <Route path='/mypage/calendar' component={Calendar} />
                    <Route path='/mypage/travel' component={Travel}/>
                    <Route path='/mypage/history' component={History}/>
                </Switch>
                
                </Router>        
            </div>
        );
    }
}


export default Mypage;