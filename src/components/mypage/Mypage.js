import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import '../../resources/mypage/css/mypage.css';


//components
import Sidebar from './MySidebar';
import Home from './MyHome';
import Calendar from './MyCalendar';
import Travel from './MyTravel';
import Talk from './MyTalk';
import Review from './MyReview';
import Info from './MyInfo';
import Scrap from './MyScrap';

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
                <div className='mypage-heading'>My Page</div>
                <Sidebar users={this.state.users}/>
                <Switch>
        <Route exact path='/mypage' exact render={() => <Home users={this.state.users}/> }/>
                    <Route path='/mypage/calendar' component={Calendar} />
                    <Route path='/mypage/travel' component={Travel}/>
                    <Route path='/mypage/scrap' component={Scrap}/>
                    <Route path='/mypage/talk' component={Talk}/>
                    <Route path='/mypage/review' component={Review}/>
                    <Route path='/mypage/info' component={Info}/>
                </Switch>
                
                </Router>        
            </div>
        );
    }
}


export default Mypage;