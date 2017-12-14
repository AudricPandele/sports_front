import React, { Component } from 'react';
import axios from 'axios';
import Select from './../account/select.js';
import Menu from './../home/menu.js';
import { Redirect} from 'react-router-dom';
import Cookies from 'universal-cookie';

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
          status: 1
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
          case "place":
            this.setState({place: e.target.value})
            break;
          case "date":
            this.setState({date: e.target.value})
            break;
          default: break;
        }
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
                        <h3>Create your event</h3><br/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-left col-sm-4 col-sm-offset-4">
                        <input type="text" className="w100" id="inputName" placeholder="Event name" name="name" onChange={this.change}/>
                        <input type="text" className="w100" id="inputDescription" placeholder="Description" name="description" onChange={this.change}/>
                        <input type="number" className="w100" id="inputNumber_of_participants" placeholder="How many ?" name="number_of_participants" onChange={this.change}/>
                        <input type="text" className="w100" id="inputPlace" placeholder="Location" name="place" onChange={this.change}/>
                        <input type="date" className="w100" id="inputDate" placeholder="Date" name="date" onChange={this.change}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-sm-3 col-sm-offset-3">
                        {!this.state.sports ? (
                          <p>loading</p>
                        ) : (
                          <Select
                            data={this.state.sports}
                            onSelectChange={this.handleSportChange}/>
                        )}
                      </div>
                      <div className="col-sm-3 ">
                        {!this.state.levels ? (
                          <p>loading</p>
                        ) : (
                          <Select
                            data={this.state.levels}
                            onSelectChange={this.handleLevelChange}/>
                        )}
                      </div>
                    </div>
                    <button
                      className="btn btn-primary"
                      onClick={this.createEvent}
                      style={{marginBottom: '10px', marginTop: '20px'}}>
                      Créer l'évènement
                    </button>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Event
