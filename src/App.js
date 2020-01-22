import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// CSS
import './resources/common/css/contents.css';

// Components
import Header from './components/common/Header';
import Login from './components/login/login';
import Account from './components/account/account';
import Home from './components/common/Home';
import Footer from './components/common/Footer';
import TravelMain from './components/travel/travel_main';
import TravelDetail from './components/travel/detail/traveldetail';
import TravelCity from './components/travel/list/travellist_city';
import TalkMain from './components/freetalk/TalkMain';
import TalkWrite from "./components/freetalk/TalkWrite";
import Member_Account from './components/account/memberaccount';
import Guide_Account from './components/account/guideaccount';


import MypageHome from './components/mypage/Mypage';

class AppTest extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLogin: false}
  }

  componentDidMount() {
    fetch('http://localhost:3002/users/getUser',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.email !== undefined)
          this.setState({isLogin: true})
        }
      );
  }
 
  isAuth = (result) => {
    this.setState({isLogin: result})
    console.log('App.js ' , this.state.isLogin);
  }

  render() {
    return(
      <div className="app-wrapper">
        <Router>
          <Header isAuth={this.state.isLogin} getLogout = {this.isAuth}/>
          <div className="contents-wrapper">        
            <Switch>  {/* Switch: 불필요한 트래픽 방지. 해당 컴포넌트만 불러오게 해준다. */}
              <Route exact path='/' component={Home} />
              {/* <Route path='/login' isLogin={this.isAuth} component={Login} /> */}
              <Route path='/login' render={props => <Login getLogin = {this.isAuth} />}  />
              <Route exact path='/account' component={Account} />
              <Route path='/account/member' component={Member_Account} />
              <Route path='/account/guide' component={Guide_Account} />
              <Route exact path='/travel' component={TravelMain} />
              <Route path='/travel/detail/:seq' component={TravelDetail} />
              <Route path='/travel/city' component={TravelCity} />
              <Route path='/talk' component={TalkMain} />
              <Route path='/talk/write' component={TalkWrite} />
              <Route exact path='/mypage' component={MypageHome}/>
            </Switch>
          </div>
        </Router>
        {/* <Contents handleController={this.handleController} controller={this.state.controller} /> */}
        <Footer></Footer>
      </div>
    )
  }
}

export default AppTest;