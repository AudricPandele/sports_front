import React, { Component } from 'react';
import axios from 'axios';

class Registration extends Component {

  constructor(){
    super();
    this.state = {
      firstname: null,
      lastname: null,
      password: null,
      email: null,
      errorMessage: null
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
        .then(function (response) {
          console.log(response);
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

  render() {
    return (
      <div className="container">
        <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
          <h2>Inscription</h2>
          <div className="form-group col-md-12">
            <label >Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" name="email" onChange={this.change}/>
          </div>
          <div className="form-group col-md-12">
            <label >Password</label>
            <input type="password" className="form-control" id="inputPassword4" placeholder="Password" name="password" onChange={this.change}/>
          </div>
          <div className="form-group col-md-12">
            <label >Lastname</label>
            <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" name="lastname" onChange={this.change}/>
          </div>
          <div className="form-group col-md-12">
            <label >Firstname</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" name="firstname" onChange={this.change}/>
        </div>
        <button type="submit" className="btn btn-primary" onClick={this.register}>Sign up</button>
      </div>
      </div>
    );
  }
}

export default Registration;
