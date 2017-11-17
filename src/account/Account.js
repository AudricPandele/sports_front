import React, { Component } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Menu from './../home/menu.js';
import SportsList from './sports_list.js';
import ListOpinion from '../opinion/list_opinion';
import EventHistory from '../event/event_history'

class Account extends Component {
  constructor(){
    super();
    this.state = {
      data: [],
      user_id : null,
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
    const cookies = new Cookies();
    this.setState({ user_id : cookies.get('sport_id') });
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
          <div>
            <div className="col-sm-6 col-sm-offset-3">
              <div className="card text-center">
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

            {!this.state.user_id ? (
              null
            ):(
                <div className="col-sm-6 col-sm-offset-3 mt-5">
                  <EventHistory
                    user={this.state.user_id}
                  />
                </div>
            )}

            <div className="col-sm-6 col-sm-offset-3 mt-5">
              <ListOpinion
                recipient={this.props.match.params.id}
              />
            </div>
          </div>
        )}

      </div>

    );
  }
}

export default Account;
