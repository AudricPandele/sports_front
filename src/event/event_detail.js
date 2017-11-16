import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios'
import ListUser from '../user/listUser';

class Eventdetail extends Component {

  constructor(){
    super();
    this.state = {
      id: null,
      name: null,
      level: null,
      number_of_participants: null,
      place: null,
      description: null,
      data : null,
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
        description: response.data.description,
        data : response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="card col-12 col-sm-12 col-md-4 col-sm-offset-1">
          <div>
            <span className="cardDate">27/11</span>
            <img className="card-img-top" src="http://guinee7.com/wp-content/uploads/2017/11/football.jpg" alt="Card image cap"/>
            <span className="sportBadge">{this.state.level}</span>
          </div>
          <div className="card-body">
            <h2 className="card-title text-center">{this.state.name}</h2>
            <p className="card-text">{this.state.place}</p>
            <p>{this.state.description}</p>
            <button className="btn btn-card">Postuler</button>
          </div>
        </div>
        {this.state.data && <ListUser data={this.state.data.participants}/>}
      </div>
    );
  }
}

export default Eventdetail;
