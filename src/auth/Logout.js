import React, { Component } from 'react';
import Cookies from 'universal-cookie'
import { Redirect } from 'react-router-dom';

class Logout extends Component {

  componentWillMount() {
    const cookies = new Cookies();
    cookies.remove("sport_token");
    cookies.remove("sport_id");
    console.log(cookies.get('sport_id'));
  }
  render() {
    return (
      <Redirect to = '/login' />
    );
  }
}

export default Logout;
