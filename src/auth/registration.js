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
          if(response.status === 200){
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
      default :
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
          <h3>Créez votre compte</h3>
          <div className="col-auto">
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-addon"><i className="little-icon material-icons">face</i></div>
              <input className="form-control" type="text" placeholder="Nom" required autoComplete='off' onChange={this.change} name="lastname" />
            </div>
          </div>
          <br/>

          <div className="col-auto">
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-addon"><i className="little-icon material-icons">face</i></div>
              <input className="form-control" type="text" placeholder="Prénom" required autoComplete='off' onChange={this.change} name="firstname" />
            </div>
          </div>
          <br/>

          <div className="col-auto">
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-addon"><span className="little-at">@</span></div>
              <input className="form-control" type="email" placeholder="Adresse email" required autoComplete='off' onChange={this.change} name="email"/>
            </div>
          </div>
          <br/>

          <div className="col-auto">
            <div className="input-group mb-2 mb-sm-0">
              <div className="input-group-addon"><i className="little-icon material-icons">lock</i></div>
              <input className="form-control" type="password" placeholder="Mot de passe" required onChange={this.change} name="password"/>
            </div>
          </div>
          <br/>

          <button className="form-btn sx log-in" type="button" onClick={this.changeForm} >Connexion</button>
          <button className="form-btn dx" type="button" onClick={this.register}>Inscription</button>
        </form>
      </div>
    );
  }
}

export default Registration;
