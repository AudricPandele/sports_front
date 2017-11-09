import React, { Component } from 'react';
import Check from './auth/Check'
import Menu from './home/menu.js';
import Eventlist from './event/event_list';

class Home extends Component {
  render() {
    return (
      <div>
        <Check />
        <Menu  active="home"/>
        <Eventlist />

      </div>
    );
  }
}

export default Home;
