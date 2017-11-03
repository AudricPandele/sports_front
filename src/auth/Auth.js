import React, { Component } from 'react';
import Login from './Login.js';
import Registration from './registration'
import CreateEvent from './createEvent'

class Auth extends Component {
  render() {
    return (
      <div>
        <Registration />
        <CreateEvent />
      </div>
    );
  }
}

export default Auth;
