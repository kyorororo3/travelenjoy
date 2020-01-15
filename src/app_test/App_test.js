import React from 'react';
import Header from '../components/common/Header';
import Contents from './Contents_test';
import Login from './Login_test';
import Account from './Account_test';
import Home from './Home_test';
import Footer from './Footer_test';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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