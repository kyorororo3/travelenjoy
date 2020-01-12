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
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "40%",
                        background: "#f0f0f0"
                    }}
                >
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

                    <Switch>
                        {routes.map((route, index) => (
                            // You can render a <Route> in as many places
                            // as you want in your app. It will render along
                            // with any other <Route>s that also match the URL.
                            // So, a sidebar or breadcrumbs or anything else
                            // that requires you to render multiple things
                            // in multiple places at the same URL is nothing
                            // more than multiple <Route>s.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.sidebar />}
                            />
                        ))}
                    </Switch>
                </div>

                <div style={{ flex: 1, padding: "10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            // Render more <Route>s with the same paths as
                            // above, but different components this time.
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={<route.main />}
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

// import React from "react";
// import {BrowserRouter as Router, Link, Route} from "react-router-dom";
// import App from "../../App";
// import Post from "./Post";
// import PostMenu from "./PostMenu";
//
// export default function Free() {
//     return (
//         <Router>
//             <div>
//                 <ul>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/post">Post</Link></li>
//                     <li><Link to="/post-menu">PostMenu</Link></li>
//                 </ul>
//             </div>
//             <Route path="/" component={App}>
//                 <Route path="post" component={Post}>
//                     <Post/>
//                 </Route>
//                 <Route path="post-menu" component={PostMenu}>
//                     <PostMenu/>
//                 </Route>
//             </Route>
//         </Router>
//     );
// }

