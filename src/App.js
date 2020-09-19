import React, { Suspense, lazy } from 'react';
import './App.css';
import PostBuilder from './PostBuilder';
import { AppWrapper } from './style';
import { Route, Redirect, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
// import Explore from './Explore';
import Notification from './Notification';
import { PostLoader } from './Loader';
import uuid from 'uuid/index';
import Navbar from './Navbar';
import Settings from './Settings';
import Profile from './Profile';
import LoginContainer from './User/Login';
import RegisterContainer from './User/Register';
import LogoutContainer from './User/Logout';

const Explore = lazy(() => import('./Explore'));

const App = ({ location }) => {

  const [ posts, setPosts ] = React.useState([
    {
      post: [
        {
            type: 'title',
            content: 'Using lorem in Atom Editor',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ** sunt ** in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem _ ipsum _ dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        }
      ],
      dateCreated: new Date(),
      id: uuid(),
    },
    {
      post: [
        {
            type: 'title',
            content: 'Javascript',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ** sunt ** in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem _ ipsum _ dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        },
        {
          type: 'code',
          content: {
            file: 'index.js',
            text: 'const name = (e) => console.log(e)'
          },
          id: uuid()
      }
      ],
      dateCreated: new Date(),
      id: uuid(),
    },
    {
      post: [
        {
            type: 'title',
            content: 'Making Git Work Efficiently in Development',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ** sunt ** in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem _ ipsum _ dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        }
      ],
      dateCreated: new Date(),
      id: uuid(),
    },
    {
      post: [
        {
            type: 'title',
            content: 'Get Started With Reactjs',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, ** sunt ** in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        },
        {
            type: null,
            content: 'Lorem _ ipsum _ dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
            id: uuid()
        }
      ],
      dateCreated: new Date(),
      id: uuid(),
    }
  ]);

  const makePost = (post) => {
    if (post && post.length > 1) {
      const postData = {
        post,
        dateCreated: new Date(),
        id: uuid()
      }
      setPosts((state) => [...state, postData]);
      return <Redirect from="/build" to="/home" />
    }
    return { error: "invalid post" }
  }

  const { pathname } = location;
  return (
    <AppWrapper>
      { pathname === '/login' || pathname === '/register' || <Navbar location={location}></Navbar> }
      <Switch>
        <Route exact path="/">
          <Redirect from={"/"} to={"/home"} />
        </Route>
        <Route path="/home" component={Home} />
        {/*<Route path="/explore" render={({ match }) => <Explore posts={posts} match={match} />} />*/}
        <Route path="/explore" render={({ match }) => (
          <Suspense fallback={PostLoader}>
            <Explore posts={posts} match={match} />
          </Suspense>
        )} />
        <Route path="/profile" component={Profile} />
        <Route path="/settings" component={Settings} />
        <Route path="/notification" component={Notification} />
        <Route path="/build" render={({ match }) => <PostBuilder makePost={makePost} />} />
        <Route path="/login" component={LoginContainer} />
        <Route path="/register" component={RegisterContainer} />
        <Route path="/logout" component={LogoutContainer} />
        <Route path="*">
          <Redirect from={"/"} to={"/home"} />
        </Route>
      </Switch>
    </AppWrapper>
  );
}

export default withRouter(App);
