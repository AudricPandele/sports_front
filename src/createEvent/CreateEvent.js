import React, { Component } from 'react';
import axios from 'axios';
import Select from './../account/select.js';
import Menu from './../home/menu.js';
import { Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';
import Place from './inputPlace.js';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Event extends Component {
    constructor() {
        super();

        this.state = {
            name: null,
            description: null,
            number_of_participants: null,
            place: null,
            owner: null,
            date: null,
            sports: [],
            levels: [],
            newSport: null,
            newLevel: null,
            redirect: null,
            city: null,
        }
    }

    getSports = () => {
      const cookies = new Cookies();
      const token = cookies.get('sport_token');

      axios.get('http://localhost:1337/sport',
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response) => {
        this.setState({
          sports: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    getLevels = () => {
      const cookies = new Cookies();
      const token = cookies.get('sport_token');

      axios.get('http://localhost:1337/level',
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response) => {
        this.setState({
          levels: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    componentDidMount() {
      const cookies = new Cookies();
      this.setState({ user_id : cookies.get('sport_id') });
      this.getSports()
      this.getLevels()
    }

    createEvent = () => {
      const cookies = new Cookies();
      const token = cookies.get('sport_token');

      axios.post('http://localhost:1337/event', {
          name: this.state.name,
          description: this.state.description,
          number_of_participants: this.state.number_of_participants,
          place: this.state.place,
          date: this.state.date,
          owner: this.state.user_id,
          sport: this.state.newSport,
          level: this.state.newLevel,
          status: 1,
          city: this.state.city
        },
        {
          crossdomain: true ,
          headers: {
             'Authorization': 'Bearer '+token
          }
        })
        .then((response) => {
          console.log(response);
          this.setState({redirect : true});
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    handleSportChange = (sport) => {
      this.setState({
        newSport: sport
      })
      console.log('sport changed')
    }

    handleLevelChange = (level) => {
      this.setState({
        newLevel: level
      })
      console.log('lvl changed')
    }

    change = (e) =>{
        switch (e.target.name) {
          case "name":
            this.setState({name: e.target.value})
            break;
          case "description":
            this.setState({description: e.target.value})
            break;
          case "number_of_participants":
            this.setState({number_of_participants: e.target.value})
            break;
          case "date":
            this.setState({date: e.target.value})
            break;
          default: break;
        }
      }

    onChangePlace = (e) => {
      this.setState({place: e})
      geocodeByAddress(e)
      .then((results) => {
        results.map((item)=>{
          item.address_components.map((info)=>{
            if(info.types[0] === 'locality')
              this.setState({city : info.long_name});
          })
        })
      })
      .catch(error => console.error(error))
    }

    render () {
        if(this.state.redirect)
          return (<Redirect to='/home'/>);
        return (
            <div>
               <Menu active="createEvent"/>
               <div className="col-sm-6 col-sm-offset-3">
                <div className="card text-center">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-sm-12">
                        <h3>Créez votre évènement</h3>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-left col-sm-8 col-sm-offset-2">

                        <div className="row">
                          <div className="col-sm-6">
                            {!this.state.sports ? (
                              <p>loading</p>
                            ) : (
                              <Select
                                icon="directions_bike"
                                label="Sport"
                                data={this.state.sports}
                                onSelectChange={this.handleSportChange}/>
                            )}
                          </div>
                          <div className="col-sm-6">
                            {!this.state.levels ? (
                              <p>loading</p>
                            ) : (
                              <Select
                                icon="swap_vert"
                                label="Niveau"
                                data={this.state.levels}
                                onSelectChange={this.handleLevelChange}/>
                            )}
                          </div>
                        </div>
                        <br/>
                        <div className="col-auto">
                          <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon"><i className="little-icon material-icons">directions_run</i></div>
                            <input type="text" className="form-control" id="inputName" placeholder="Nom" name="name" onChange={this.change}/>
                          </div>
                        </div>
                        <br/>

                        <div className="col-auto">
                          <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon"><i className="little-icon material-icons">create</i></div>
                            <input type="text" className="form-control" id="inputDescription" placeholder="Description" name="description" onChange={this.change}/>
                          </div>
                        </div>
                        <br/>

                        <div className="col-auto">
                          <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon"><i className="little-icon material-icons">supervisor_account</i></div>
                            <input type="number" className="form-control" id="inputNumber_of_participants" placeholder="Combien de personnes ?" name="number_of_participants" onChange={this.change}/>
                          </div>
                        </div>
                        <br/>

                        <div className="col-auto">
                          <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon"><i className="little-icon material-icons">insert_invitation</i></div>
                            <input type="date" className="form-control" id="inputDate" placeholder="Date" name="date" onChange={this.change}/>
                          </div>
                        </div>
                        <br/>

                        <div className="col-auto">
                          <div className="input-group mb-2 mb-sm-0">
                            <div className="input-group-addon"><i className="little-icon material-icons">location_on</i></div>
                            <Place place={this.onChangePlace}/>
                          </div>
                        </div>
                      </div>
                    </div>

                    <button
                      className="btn btn-primary"
                      onClick={this.createEvent}
                      style={{marginBottom: '10px', marginTop: '20px'}}>
                      Créer
                    </button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Event
