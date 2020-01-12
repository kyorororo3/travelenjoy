import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Free from "./app/freetalk/Free";
import Post from "./app/freetalk/Post";
import Mypage from "./app/mypage/Mypage";
import Main from "./app/main/main"

function App() {
  return (
    <div className="App">
        <Router>
            <Route exact path="/" component={Main}/>
            <Route exact path="/post" component={Free}/>
            <Route exact path="/my" component={Mypage}/>
        </Router>
    </div>
  );
}

export default App;
