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

class Login extends Component {
  constructor(){
    super();
    this.state = {
      password: null,
      email: null,
      errorMessage: null,
      redirect: false,
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
            this.setState({redirect: true})
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

  render() {
    const { redirect } = this.state;

    if (redirect) {

      return (
        <Redirect to='/home' />
      );
    }
    return (
      <div className="container">
        <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <div className="form-group col-md-12">
            <label>Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email" onChange={this.change}/>
          </div>
          <div className="form-group col-md-12">
            <label>Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" name="password" onChange={this.change}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={this.login}>Submit</button>
        </div>
      </div>
    );
  }
}

export default Login;
