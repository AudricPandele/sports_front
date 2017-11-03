import React, { Component } from 'react';
import { Switch, Route} from 'react-router-dom'
import axios from 'axios'

class Event extends Component {
    constructor() {
        super();
        this.state = {
            name: null,
            description: null,
            number_of_participants: null,
            place: null,
            owner: null,
            sport: null,
            level: null
        }
    }

    createEvent = () => {
        axios.post('http://localhost:1337/event', {
            name: this.state.name,
            description: this.state.description,
            number_of_participants: this.state.number_of_participants,
            place: this.state.place,
            sport: this.state.sport,
            level: this.state.level
          })
        console.log(this.state)
    }

    change = (e) =>{
        switch (e.target.name) {
          case "name":
            this.setState({name: e.target.value})
            console.log("yo2")
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
          case "sport":
            this.setState({sport: e.target.value})
            break;
          case "level":
            this.setState({level: e.target.value})
            break;
        }
      }

    render () {
        return (
            <div className="container">
            <div className="mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <h2>Créer un evenement</h2>
              <div className="form-group col-md-12">
                <label >Nom de l'event</label>
                <input type="text" className="form-control" id="inputName" placeholder="Nom de l'évènement" name="name" onChange={this.change}/>
              </div>
              <div className="form-group col-md-12">
                <label >Description</label>
                <input type="text" className="form-control" id="inputDescription" placeholder="Description" name="description" onChange={this.change}/>
              </div>
              <div className="form-group col-md-12">
                <label >Nombre de participants</label>
                <input type="number" className="form-control" id="inputNumber_of_participants" placeholder="combien êtes vous ?" name="number_of_participants" onChange={this.change}/>
              </div>
              <div className="form-group col-md-12">
                <label >Place</label>
                <input type="text" className="form-control" id="inputPlace" placeholder="Ou c'est lol ?" name="place" onChange={this.change}/>
              </div>
              <div className="form-group col-md-12">
                <label >Sport</label>
                <input type="text" className="form-control" id="inputSport" placeholder="C'est quel sport magueule ?" name="sport" onChange={this.change}/>
              </div>
              <div className="form-group col-md-12">
                <label >Level</label>
                <input type="text" className="form-control" id="inputLevel" placeholder="Niveau de jeu" name="level" onChange={this.change}/>
              </div>

            <button type="submit" className="btn btn-primary" onClick={this.createEvent}>Créer</button>
          </div>
          </div>
        );
    }
}

export default Event
