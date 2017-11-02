import React, { Component } from 'react';
import Login from './Login.js';
import Registration from './registration'

class Auth extends Component {
  render() {
    return (
      <div>
        <Login />
        <Registration />
      </div>
    );
  }
}

export default Auth;
