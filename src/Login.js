import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class Login extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to Sports</h1>
        </header>
        <button className="btn btn-info">Login with Facebook</button>
      </div>
    );
  }
}

export default Login;
