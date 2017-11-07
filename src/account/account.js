import React, { Component } from 'react';
import Menu from '../home/menu';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Account extends Component {

  constructor(){
    super();
    this.state = {
      name: null,
      email: null,
      firstName: null,
      lastName: null,
      birthday: null,
      gender: null,
      id: null,
      del: false
    }
  }

  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    const id = cookies.get('sport_id');
    const url = 'http://localhost:1337/user/'+id;
    console.log(url);
    axios.get(url)
    .then((response) => {
      console.log(response);
      this.setState({
        name : response.data.name,
        email : response.data.email,
        firstName : response.data.firstname,
        lastName : response.data.lastname,
        birthday: response.data.birthday,
        gender : response.data.gender,
        id : response.data.id
      });
    })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu />
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Mon compte</h4>
              <p className="card-text">
                Nom : {this.state.lastName}<br/>
                Prénom : {this.state.firstName}<br/>
                Pseudo : {this.state.name}<br/>
                Date de naissance : {this.state.birthday}<br/>
                Sexe : {this.state.gender}<br/>
              </p>
              <a href="#" className="card-link">Modifier</a>
              <a href="#" className="card-link text-danger">Supprimer</a>
            </div>
          </div>
      </div>
    );
  }
}

export default Account;
