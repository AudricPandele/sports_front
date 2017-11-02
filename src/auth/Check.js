import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class Check extends Component {
  render() {
    return (
      <Redirect to='/' />
    );
  }
}

export default Check;
