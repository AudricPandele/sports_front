import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

class Registration extends Component {

  constructor(){
    super();
    this.state = {
      firstname: null,
      lastname: null,
      password: null,
      email: null,
      errorMessage: null,
      redirect: false,
      redirectLog : null,
    }
  }

  testMail(email){
    var rgx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return rgx.test(email);
  }

  register = () =>{
    if(this.state.lastname != null && this.state.firstname != null && this.state.password != null && this.state.email != null){
      if(this.testMail(this.state.email)){
        this.setState({errorMessage : null});
        axios.post('http://localhost:1337/auth/signup', {
          firstname: this.state.firstname,
          lastname: this.state.lastname,
          name: this.state.lastname + ' '+ this.state.firstname,
          password: this.state.password,
          email: this.state.email
        })
        .then((response) => {
          console.log(response);
          if(response.status == 200){
            const cookies = new Cookies();
            cookies.set('sport_token',response.data.token ,{path: '/'});
            cookies.set('sport_id',response.data.id ,{path: '/'});
            this.setState({redirect: true});
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{
        this.setState({errorMessage : "Email is not Email"});
      }
    }
    else {
        this.setState({errorMessage : 'Required'});
    }
  }

  change = (e) =>{
    switch (e.target.name) {
      case "lastname":
        this.setState({lastname: e.target.value})
        break;
      case "firstname":
        this.setState({firstname: e.target.value})
        break;
      case "email":
        this.setState({email: e.target.value})
        break;
      case "password":
        this.setState({password: e.target.value})
        break;
    }

  }

  changeForm = () => {
    this.setState({redirectLog: 'login'});
    console.log(this.state);
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/home/' />
      );
    }

    const { redirectLog } = this.state;

    if (redirectLog) {

      return (
        <Redirect to='/login' />
      )
    }

    return (

      <div className="container">
        <form className="signUp">
          <h3>Create Your Account</h3>
          <input className="w100" type="text" placeholder="Lastname" required autoComplete='off' onChange={this.change} name="lastname" />
          <input className="w100" type="text" placeholder="Firstname" required autoComplete='off' onChange={this.change} name="firstname"/>
          <input className="w100" type="email" placeholder="eMail" required autoComplete='off' onChange={this.change} name="email"/>
          <input className="w100" type="password" placeholder="Password" required onChange={this.change} name="password"/>
          <button className="form-btn sx log-in" type="button" onClick={this.changeForm} >Log In</button>
          <button className="form-btn dx" type="button" onClick={this.register}>Sign Up</button>
        </form>
      </div>
    );
  }
}

export default Registration;
