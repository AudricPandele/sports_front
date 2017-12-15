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

  updateProfil = () => {
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    const user_id = cookies.get('sport_id');


    axios.put('http://localhost:1337/user/'+user_id, {
        gender: this.state.data.gender,
        birthday: this.state.data.birthday,
      },
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response) => {
        this.getData()
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleSexeChange = (e) => {

    this.setState({
      data:{
        ...this.state.data,
        gender: e.target.value
      }
    })
    console.log(this.state);
  }
  handleBirthdayChange = (e) => {
    this.setState({
      data:{
        ...this.state.data,
        birthday: e.target.value
      }
    })
  }

  getData = () => {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/user/'+user_id,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
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
                      <h3 className="little-margin">{this.state.data.name}</h3>
                      {!this.state.data.friends ? (
                        <span>Vous ne suivez encore personne</span>
                      ) : (
                        <span>{this.state.data.friends.length} followings - 0 followers</span>
                      )}
                    </div>
                  </div><br/>
                  <div className="row">
                    <div className="text-left col-sm-6 col-sm-offset-3">
                      <div className="col-auto">
                        <div className="input-group mb-2 mb-sm-0">
                          <div className="input-group-addon"><i className="little-icon material-icons">email</i></div>
                          <input className="form-control" disabled type="email" value={this.state.data.email} name="email"/>
                        </div>
                      </div>
                      <br/>
                      <div className="col-auto">
                        <div className="input-group mb-2 mb-sm-0">
                          <div className="input-group-addon"><i className="little-icon material-icons">wc</i></div>
                          <select className="custom-select form-control" type="email" value={this.state.data.gender} name="gender" onChange={this.handleSexeChange}>
                            <option selected disabled>Homme ou femme ?</option>
                            <option value="1">Homme</option>
                            <option value="2">Femme</option>
                          </select>
                        </div>
                      </div>
                      <br/>
                      <div className="col-auto form-group">
                        <div className="input-group mb-2 mb-sm-0">
                          <div className="input-group-addon"><i className="little-icon material-icons">cake</i></div>
                          <input className="form-control" type="date" value={this.state.data.birthday} placeholder="Date de naissance" name="birthday" onChange={this.handleBirthdayChange}/>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary"
                    onClick={this.updateProfil}
                    style={{marginBottom: '10px', marginTop: '20px'}}>
                    Sauvegarder
                  </button>

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
