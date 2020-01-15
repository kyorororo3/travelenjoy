import React from 'react';
<<<<<<< HEAD
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from './Header_test';
// import Contents from './Contents_test';
=======
import Header from '../components/common/Header';
import Contents from './Contents_test';
>>>>>>> hyeyeon
import Login from './Login_test';
import Account from './Account_test';
import Home from './Home_test';
import Footer from './Footer_test';
import Tourlist from '../app/tour/tourlist';
import Tourdetail from '../app/tour/tourdetail';

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
              <Route exact path='/tour' component={Tourlist} />
              <Route path='/tour/detail/:seq' component={Tourdetail} />
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