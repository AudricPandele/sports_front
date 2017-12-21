import React, { Component } from 'react';
import Menu from '../home/menu';
import axios from 'axios'
import ListUser from '../user/listUser';
import Cookies from 'universal-cookie';
import Eventitem from './event_item'

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
      isFull : false,
      postule : null,
      me : null,
      hour:null,
      minutes:null,
    }
  }

  componentDidMount(){
    this.getvalue();
  }
  getvalue = () =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    const me = cookies.get('sport_id');

    axios.get('http://31.36.123.215:1337/event/'+this.props.match.params.id,
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
        description : response.description,
        participants : response.data.participants,
        owner : response.data.owner,
        date : response.data.date,
        picture: response.data.sport.picture,
        me: me,
        hour:response.data.hour,
        minutes:response.data.minutes


      });
      this.checkParticipants(response.data.participants)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  checkParticipants = (data) => {
    let number_of_participants = 0
    let postule = false
    if(this.state.owner.id == this.state.me)
      postule = true
    data.map((participant)=>{
      if(participant.status.id == '2')
        number_of_participants++
      if(participant.user.id == this.state.me)
        postule = true
    });
    this.setState({
      isFull : (number_of_participants - 1) > this.state.number_of_participants,
      postule : postule
    })
  }

  postule = () =>{
    const cookies = new Cookies();
    const id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.post('http://31.36.123.215:1337/group',{
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
        <div className="card col-12 col-sm-12 col-md-6 col-sm-offset-1 p-0">
        {this.state.picture?(
          <Eventitem
            name={this.state.name}
            id={this.state.id}
            sport={this.state.sport ? this.state.sport : ''}
            picture={this.state.sport ? this.state.picture : ''}
            level={this.state.level ? this.state.level : ''}
            place={this.state.place}
            number_of_participants = {this.state.number_of_participants}
            date={this.state.date}
            description={this.state.description}
            owner={this.state.owner.name}
            owner_id={this.state.owner.id}
            hour={this.state.hour}
            minutes={this.state.minutes}
          />
        ):(null)}
        {
            !this.state.isFull ? (
              !this.state.postule ? (
                <button className="btn btn-primary" onClick={this.postule}>Postuler</button>
              ) : (
                <button className="btn btn-primary disabled">Postuler</button>
              )
            ):(<button className="btn btn-primary disabled">Plus de place</button>)
        }
        </div>
        {this.state.participants && <ListUser data={this.state.participants} owner={this.state.owner}/>}
      </div>
    );
  }
}

export default Eventdetail;
