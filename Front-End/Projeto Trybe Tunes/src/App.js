import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Fragment } from 'react/cjs/react.production.min';
import Album from './pages/Album';
import Login from './pages/Login';
import Search from './pages/Search';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();
    this.onLoginSuccess = this.onLoginSuccess.bind(this);
    this.state = {
      isLogon: false,
    };
  }

  onLoginSuccess() {
    this.setState({ isLogon: true });
  }

  render() {
    const { isLogon } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={
              (props) => (isLogon
                ? <Redirect to="/search" />
                : <Login { ...props } onLoginSuccess={ this.onLoginSuccess } />)
            }
          />
          <Route exact path="/search">
            <Header />
            <Search />
          </Route>
          <Route
            exact
            path="/album/:id"
            render={
              (props) => (
                <Fragment>
                  <Header />
                  <Album { ...props } id={ props.match.params.id } />
                </Fragment>)
            }
          />
          <Route exact path="/favorites">
            <Header />
            <Favorites />
          </Route>
          <Route exact path="/profile">
            <Header />
            <Profile />
          </Route>
          <Route exact path="/profile/edit">
            <Header />
            <ProfileEdit />
          </Route>
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
