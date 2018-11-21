import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
// import './App.css';
import { AuthRoute, ProtectedRoute } from '../utils/route';
import LogIn from './Gateway/LogIn';
import SignUp from './Gateway/SignUp';

class App extends Component {
  render() {
    return (
      <Fragment>
        {/* <NavBar /> */}
        <Switch>
          <AuthRoute exact path="/signup" component={SignUp} />
          <AuthRoute exact path="/" component={LogIn} />
        </Switch>
      </Fragment>
    );
  }
}

export default App;

{/* <div className="App">
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Edit <code>src/App.js</code> and save to reload.
          </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
          </a>
  </header>
</div> */}