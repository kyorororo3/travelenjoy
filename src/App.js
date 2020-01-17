import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


import Header from './components/common/Header';
import Login from './components/login/login';
import Account from './components/account/account';
import Home from './components/common/Home';
import Footer from './components/common/Footer';
import TravelList from './components/travel/travellist';
import TravelDetail from './components/travel/traveldetail';
import TalkMain from './components/freetalk/TalkMain';

class AppTest extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   controller: 'main'  // 자바 컨트롤러의 command 같은 개념
    // }
  }

  // header에서 선택한 메뉴로 Contents를 변경하기 위함
  // handleController = (selected) => {
  //   this.setState({
  //     controller: selected
  //   })
  // }

  render() {
    return(
      <div className="app-wrapper">
        <Router>
          <Header />
          <div className="contents-wrapper">
            <Switch>  {/* Switch: 불필요한 트래픽 방지. 해당 컴포넌트만 불러오게 해준다. */}
              <Route exact path='/' component={Home} />
              <Route path='/login' component={Login} />
              <Route path='/account' component={Account} />
              <Route exact path='/travel' component={TravelList} />
              <Route path='/travel/detail/:seq' component={TravelDetail} />
              <Route path='/talk' component={TalkMain} />
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