import React from 'react';
import Login from './Login_test';
import Account from './Account_test';
import Home from './Home_test';
import { BrowserRouter as Route, Switch } from 'react-router-dom';

class Contents extends React.Component {

  render() {
    // var index = this.props.controller;
    // var component = null;

    // if(index === 'main') component = null
    // else if(index === 'login') component = <Login handleLogin={this.handleLogin}/>
    // else if(index === 'account') component = <Account handleAccount={this.handleAccount}/>

    return(
      <div className="contents-wrapper">
        <Switch>  {/* Switch: 불필요한 트래픽 방지. 해당 컴포넌트만 불러오게 해준다. */}
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/account' component={Account} />
        </Switch>
      </div>
    )
  }
}

export default Contents;