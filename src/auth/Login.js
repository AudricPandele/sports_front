import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
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
            const cookies = new Cookies();
            cookies.set('sport_token',response.data.token ,{path: '/', httpOnly : true});
            cookies.set('sport_id',response.data.user.id ,{path: '/'});
            this.setState({
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
    if (this.state.redirect) {
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
          <input type="email" placeholder="Insert eMail" autoComplete='off' onChange={this.change} required name="email" />
          <input type="password" placeholder="Insert Password" onChange={this.change} required name="password" />
          <div>{this.state.errorMessage}</div>
          <button className="form-btn sx back" type="button" onClick={this.changeForm} >Back</button>
          <button className="form-btn dx" type="button" onClick={this.login} >Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
