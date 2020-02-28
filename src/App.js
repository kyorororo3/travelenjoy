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
import TravelReservation from './components/travel/reservation/travelreservation';
import TravelReservationComplete from './components/travel/reservation/travelreservation_complete';
import TalkMain from './components/freetalk/TalkMain';
import TalkWrite from "./components/freetalk/TalkWrite";
import Member_Account from './components/account/memberaccount';
import Guide_Account from './components/account/guideaccount';
import Guide_Main from './components/guide/guide';
import Guide_Make from './components/guide/guide_make';
import Guide_Tour_List from './components/guide/guide_tour_list';
import Guide_List_Detail from './components/guide/guide_list_detail';
import Guide_Question from './components/guide/guide_question';
import MypageSidebar from './components/mypage/MySidebar';
import MypageHome from './components/mypage/Mypage';
import MypageCalendar from './components/mypage/MyCalendar';
import MypageInfo from './components/mypage/MyInfo';
import MypageReview from './components/mypage/MyReview';
import MypageScrap from './components/mypage/MyScrap';
import MypageTalk from './components/mypage/MyTalk';
import MypageTravel from './components/mypage/MyTravel';



class AppTest extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLogin: false, isGuide:''}
  }

  componentDidMount() {
    fetch('http://localhost:3002/users/getUser',{
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if(data.email !== undefined){
          this.setState({isLogin: true, isGuide: data.auth})
        }else{
          this.setState({isLogin: false})
        }
      });
  }
 
  isAuth = (result) => {
    this.setState({isLogin: result.login , isGuide : result.auth })
  }


  render() {
    console.log('App.js ' , this.state.isLogin);
    console.log('App.js-isguide ' , this.state.isGuide);
   
    return(
      <div className="app-wrapper">
        <Router>
          <Header isAuth={this.state.isLogin} getLogout={this.isAuth} isGuide={this.state.isGuide}/>
          <div className="contents-wrapper">        
            <Switch>  {/* Switch: 불필요한 트래픽 방지. 해당 컴포넌트만 불러오게 해준다. */}
              <Route exact path='/' component={Home} />
              {/* <Provider store={store}>
              <Route path='/login' render={props => <Login getLogin = {this.isAuth} />}  />
              </Provider> */}
              <Route path='/login' render={props => <Login getLogin = {this.isAuth}  getAuth = {this.guideHome} getInfo = {this.getMemberInfo} />}  />

              {/* <Route path='/login' render={props => <Login getLogin = {this.isAuth}  />}  /> */}

              <Route exact path='/account' component={Account} />
              <Route path='/account/member' component={Member_Account} />
              <Route path='/account/guide' component={Guide_Account} />
              <Route exact path='/travel' component={TravelMain} />
              <Route path='/travel/detail/:seq' component={TravelDetail} />
              <Route path='/travel/city' component={TravelCity} />
              <Route exact path='/travel/reservation' component={TravelReservation} />
              <Route path='/travel/reservation/complete' component={TravelReservationComplete} />
              <Route path='/talk' component={TalkMain} />
              <Route path='/talk/write' component={TalkWrite} />
              <Route exact path='/mypage' component={MypageHome}/>
              {/* <Route path='/mypage/calendar' component={MypageCalendar}/>
              <Route path='/mypage/travel' component={MypageTravel}/>
              <Route path='/mypage/scrap' component={MypageScrap}/>
              <Route path='/mypage/review' component={MypageReview}/>
              <Route path='/mypage/talk' component={MypageTalk}/>
              <Route path='/mypage' component={MypageInfo}/> */}
              <Route exact path='/guide' component={Guide_Main}></Route>
              <Route path='/guide/make' component={Guide_Make}></Route>
              <Route path='/guide/list' component={Guide_Tour_List}></Route>
              <Route path='/guide/question' component={Guide_Question}></Route>
              <Route path='/guide/detail/:seq' component={Guide_List_Detail}></Route>
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