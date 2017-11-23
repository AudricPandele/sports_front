import React, { Component } from 'react';
import Login from './Login.js';
import Registration from './registration';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class Auth extends Component {

  render() {

    const cookiesAuth = new Cookies();
    const user_id = cookiesAuth.get('sport_id');

    return (
      !user_id ? (
        <div>
          <Registration />
        </div>
      ) : (
        <Redirect to="/home"/>
      )
    );
  }
}

export default Auth;
