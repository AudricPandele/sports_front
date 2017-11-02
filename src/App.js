import React, { Component } from 'react';
import Login from './auth/Login.js';
import Registration from './auth/registration'

class App extends Component {
  render() {
    return (
      <div>
        <Login />
        <Registration />
      </div>
    );
  }
}

export default App;
