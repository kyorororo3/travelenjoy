import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Post from "./app/freetalk/Post";
import PostMenu from "./app/freetalk/PostMenu";

import * as serviceWorker from './serviceWorker';
import {Router, Route} from 'react-router';


ReactDOM.render(
    // <App />,
    <Router>
        <Route path="/" component={App}>
            <Route path="post" component={Post}/>
            <Route path="post-menu" component={PostMenu}/>
        </Route>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
