import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import logo from '../logo.svg';
import '../App.css';
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import Cookies from 'universal-cookie';
import '../styles/auth.css';


class Login extends Component {
  constructor(){
    super();
    this.state = {
      password: null,
      email: null,
      errorMessage: null,
      redirect: false,
      token: null,
      active: true,
      redirectReg: null,
    }
  }

  change = (e) =>{
    switch (e.target.name) {
      case 'email':
        this.setState({email: e.target.value});
        break;
      case 'password':
        this.setState({password: e.target.value});
        break;

    }
  }

  testMail(email){
    var rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rgx.test(email);
  }

  login = () =>{
    if(this.state.email != null && this.state.password != null){
        if(this.testMail(this.state.email)){
          axios.post('http://localhost:1337/auth/signin', {
            email : this.state.email,
            password : this.state.password
          })
          .then((response) => {
            const cookiesTOKEN = new Cookies();
            cookiesTOKEN.set('sport_token', response.data.token, {path: '/'});

            const cookiesID = new Cookies();
            cookiesID.set('sport_id', response.data.user.id, {path: '/'});

            this.setState({
              token: response.data.token,
              redirect: true
            })
          })
          .catch((error) => {
            this.setState({redirect: false})
            console.log(error);
          });
        }
        else{
          this.setState({errorMessage : "Email is not email"});
          console.log("mail");
        }
    }
    else {
        this.setState({errorMessage : 'Required'});
        console.log("required");
    }
  }

  changeForm = () => {
    this.setState({redirectReg: 'signup'});
    console.log(this.state);
  }


  render() {
    const { redirect } = this.state;
    if (redirect) {
      return (
        <Redirect to='/home/' />
      );
    }

    const { redirectReg } = this.state;
      if (redirectReg){
        return (
          <Redirect to = '/signup' />
        );
      }
    return (
      <div className="container">
        <form className="signUp">
          <h3>Welcome Back !</h3>
          <input type="email" placeholder="Insert eMail" autoComplete='off' onChange={this.change} required />
          <input type="password" placeholder="Insert Password" onChange={this.change} required />
          <div>{this.state.errorMessage}</div>
          <button className="form-btn sx back" type="button" onClick={this.changeForm} >Back</button>
          <button className="form-btn dx" type="submit" onClick={this.login} >Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
