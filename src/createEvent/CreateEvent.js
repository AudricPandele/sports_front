import React, { Component } from 'react';
import axios from 'axios';
import Select from './../account/select.js';
import Menu from './../home/menu.js';
import { Link , Redirect} from 'react-router-dom';
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
      axios.get('http://localhost:1337/sport')
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
      axios.get('http://localhost:1337/level')
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
        })
        .then((response) => {
          console.log(response);
          alert("Évènement créé !");
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
        }
      }

    render () {
        const { data } = this.state
        if(this.state.redirect)
          return (<Redirect to='/home'/>);
        return (
            <div>
               <Menu active="createEvent"/>

               <div className="row">
                 <div className="col-sm-6 col-sm-offset-3">
                   <div className="card text-center">
                     <div className="card-header">
                       Créer un evenement
                     </div>
                     <div className="card-block">
                       <div className="row">
                         <div className="col-sm-6 col-sm-offset-3">
                           <input type="text" className="form-control" id="inputName" placeholder="Nom de l'évènement" name="name" onChange={this.change}/>
                         </div>
                         <div className="col-sm-6 col-sm-offset-3">
                           <input type="text" className="form-control" id="inputDescription" placeholder="Description" name="description" onChange={this.change}/>
                         </div>
                         <div className="col-sm-6 col-sm-offset-3">
                           <input type="number" className="form-control" id="inputNumber_of_participants" placeholder="combien êtes vous ?" name="number_of_participants" onChange={this.change}/>
                         </div>
                         <div className="col-sm-6 col-sm-offset-3">
                           <input type="text" className="form-control" id="inputPlace" placeholder="Lieu" name="place" onChange={this.change}/>
                         </div>
                         <div className="col-sm-6 col-sm-offset-3">
                           <input type="date" className="form-control" id="inputDate" placeholder="Date" name="date" onChange={this.change}/>
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
                           <div className="col-sm-3">
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
                           onClick={this.createEvent}>
                           Créer l'évènement
                         </button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Event
