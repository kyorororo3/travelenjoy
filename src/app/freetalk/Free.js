import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import PostList from "./PostList"
import Write from "./Write";
import Likes from "./Likes"
import {FreeConstants} from "./FreeConstants";
import './resources/css/free.css'

// Each logical "route" has two components, one for
// the sidebar and one for the main area. We want to
// render both of them in different places when the
// path matches the current URL.

// We are going to use this route config in 2
// spots: once for the sidebar and once in the main
// content section. All routes are in the same
// order they would appear in a <Switch>.
const routes = [
    {
        path: FreeConstants.URL_POST,
        exact: true,
        sidebar: () => <div>home!</div>,
        main: () => <PostList/>
    },
    {
        path: FreeConstants.URL_POST_WRITE,
        sidebar: () => <div>작성</div>,
        main: () => <Write/>
    },
    {
        path: FreeConstants.URL_POST_LIKES,
        sidebar: () => <div>좋아요</div>,
        main: () => <Likes/>
    }
];

export default function SidebarExample() {
    return (
        <Router>
            <div id="post-main-wrap">
                <div id="post-content-wrap" style={{ flex: 1, padding: "10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </div>
                <div id="bottom-menu-wrap">
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li>
                            <a href={"/"}>메인으로</a>
                        </li>
                        <li>
                            <Link to={FreeConstants.URL_POST}>게시글목록</Link>
                        </li>
                        <li>
                            <Link to={FreeConstants.URL_POST_WRITE}>작성</Link>
                        </li>
                        <li>
                            <Link to={FreeConstants.URL_POST_LIKES}>좋아요</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </Router>
    );
}