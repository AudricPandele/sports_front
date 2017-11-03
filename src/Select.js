import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';

class Select extends Component {
  constructor(props){
    super(props);
  }
  render() {
    console.log(this.props);
    return (
      <select></select>
    );
  }
}

export default Select;
