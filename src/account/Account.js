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

  getData = () => {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');

    axios.get('http://localhost:1337/user/'+user_id)
    .then((response) => {
      this.setState({
        data: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getData()
  }

  updateList = () => {
    this.getData()
  }

  render() {
    return (
      <div>
        <Menu active="account"/>

        {!this.state.data ? (
          <p>Loading</p>
        ) : (
          <div className="row">
            <div className="col-sm-6 col-sm-offset-3">
              <div className="card text-center">
                <div className="card-header">
                  Informations du compte
                </div>
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-12">
                      <h3>{this.state.data.name}</h3><br/>
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
                      <h3>Mes sports</h3>
                      {!this.state.data.sportList ? (
                        <div>
                          Chargement
                        </div>
                      ) : (
                        <SportsList
                          data={this.state.data.sportList}
                          onListUpdate={this.updateList}/>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    );
  }
}

export default Account;
