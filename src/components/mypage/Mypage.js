import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../../resources/mypage/css/mypage.css';


//components
import Sidebar from './MySidebar';
import Home from './MyHome';
import Calendar from './MyCalendar';
import Travel from './MyTravel';
import History from './MyHistory';
import Info from './MyInfo';

class Mypage extends Component {

    constructor(props){
        super(props);
        this.state = {users: []}
    }

    componentDidMount() {
        fetch('http://localhost:3002/users/getUser',{
          credentials: 'include'
        })
          .then(res => res.json())
          .then(data => {
            if(data.email !== undefined)
              this.setState({users : data})
            }
          );
    }


    render(){
        return(
            <div className='container'>
                <Router>
                <div className='mypage-heading'>마이페이지 홈</div>
                <Sidebar users={this.state.users}/>
                <Switch>
                    <Route exact path='/mypage' component={Home} />
                    <Route path='/mypage/calendar' component={Calendar} />
                    <Route path='/mypage/travel' component={Travel}/>
                    <Route path='/mypage/history' component={History}/>
                    <Route path='/mypage/info' component={Info}/>
                </Switch>
                
                </Router>        
            </div>
        );
    }
}


export default Mypage;