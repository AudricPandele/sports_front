import React, { Component } from 'react';
import Menu from '../home/menu';
import axios from 'axios'
import ListUser from '../user/listUser';
import Cookies from 'universal-cookie';
import Moment from 'react-moment';

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
      participants : null,
      sport: null,
      owner : null,
      date: null,
      picture: null,
    }
  }

  componentDidMount(){
    this.getvalue();
  }
  getvalue = () =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/event/'+this.props.match.params.id,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
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
        id: response.data.id,
        level: level,
        name : response.data.name,
        number_of_participants : response.data.number_of_participants,
        place : response.data.place,
        sport : sport,
        participants : response.data.participants,
        owner : response.data.owner,
        date : response.data.date,
        picture: response.data.sport.picture

      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  postule = () =>{
    const cookies = new Cookies();
    const id = cookies.get('sport_id');
    const token = cookies.get('sport_token');
    
    axios.post('http://localhost:1337/group',{
      event : this.state.id,
      user : id,
      status : 1
    },
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.getvalue();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="card col-12 col-sm-12 col-md-6 col-sm-offset-1">
          <div>
            <span className="cardDate">
            <Moment format="DD/MM">
              {this.state.date}
            </Moment>
            </span>
            <img className="card-img-top" src={this.state.picture} alt={this.state.sport}/>
            <span className="sportBadge">{this.state.level}</span>
          </div>
          <div className="card-body">
            <h2 className="card-title text-center">{this.state.name}</h2>
            <p className="card-text">{this.state.place}</p>
            <p>{this.state.description}</p>
            <button className="btn btn-card" onClick={this.postule}>Postuler</button>
          </div>
        </div>
        {this.state.participants && <ListUser data={this.state.participants} owner={this.state.owner}/>}
      </div>
    );
  }
}

export default Eventdetail;
