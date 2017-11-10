import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios'

class Eventdetail extends Component {

  constructor(){
    super();
    this.state = {
      id: null,
      name: null,
      level: null,
      number_of_participants: null,
      place: null,
      description: null
    }
  }

  componentDidMount(){
    this.setState({id : this.props.match.params.id});
    axios.get('http://localhost:1337/event/'+this.props.match.params.id)
    .then((response) => {
      var level = "NC";
      var sport = "NC";
      if(response.data.level){
        level = response.data.level.value;
      }
      if(response.data.sport){
        sport = response.data.sport.name
      }
      this.setState({
        name : response.data.name ,
        level : level,
        number_of_participants: response.data.number_of_participants,
        place: response.data.place,
        sport: sport,
        description: response.data.description
      });
      console.log(this.state);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="row">
          <div className="card col-sm-12 col-md-10 offset-md-1">
            <div className="card-body">
              <h4 className="card-title">{this.state.name} - {this.state.level}</h4>
              <p className="card-text">
                Nombre de participants : {this.state.number_of_participants}<br/>
                Lieux : {this.state.place}<br/>
                Sport : {this.state.sport}<br/>
                <i>{this.state.description}</i>
              </p>
              <a href="#" className="btn btn-primary">Postuler</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventdetail;
