import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Menu from './../home/menu.js';
import SportsList from './sports_list.js';

class Account extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');

    axios.get('http://localhost:1337/user/'+user_id)
    .then((response) => {
      this.setState({
        data: response.data.user
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu active="account"/>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="card text-center">
              <div className="card-header">
                Account information
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12">
                    <h3 className="card-title">{this.state.data.name}</h3><br/>
                  </div>
                </div>
                <div className="row">
                  <div className="text-left col-sm-4 col-sm-offset-4">
                    <label>Email : {this.state.data.email}</label><br/>
                    <label>Gender : {this.state.data.gender}</label><br/>
                    <label>Birthday : {this.state.data.birthday}</label><br/>
                  </div>
                </div>
                <a href="#" className="btn btn-primary">Save changes</a>
                <div className="row">
                  <div className="col-sm-12" style={{marginBottom: '10px'}}>
                    <h3 className="card-title">My sports</h3><br/>
                    {!this.state.data.sportList ? (
                      <div>
                        Chargement
                      </div>
                    ) : (
                      <SportsList data={this.state.data.sportList}/>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default Account;