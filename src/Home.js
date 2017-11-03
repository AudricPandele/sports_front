import React, { Component } from 'react';
import Check from './auth/Check'
import Menu from './home/menu.js';

class Home extends Component {
  render() {
    return (
      <div>
        <Check />
        <Menu />
      </div>
    );
  }
}

export default Home;
