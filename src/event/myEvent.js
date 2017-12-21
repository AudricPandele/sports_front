import React, { Component } from 'react';
import Menu from '../home/menu';
import Eventitem from './event_item';
import EventCard from './event_card';
import Cookies from 'universal-cookie';
import axios from 'axios';

class MyEvent extends Component {

  constructor(){
    super();
    this.state = {
      user: null,
      actualise : null,
      groups : null,
    }
  }

  componentDidMount(){
    this.getUserInfo()
    this.getEventParticipate()
  }

  getEventParticipate = () =>{
    console.log('ok');
      const cookies = new Cookies();
      const id = cookies.get('sport_id');
      const token = cookies.get('sport_token');

      axios.get('http://localhost:1337/group/user/'+id,
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response)=>{
        this.setState({groups : response.data})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getUserInfo = () => {
    const cookies = new Cookies();
    const id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.get('http://31.36.123.215:1337/user/'+id,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.setState({user : response.data});

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ChangeStatus = (value) =>{
    this.getUserInfo()
  }

  render() {
    return (
      <div>
        <Menu active="myEvent"/>
        <div className="row">
          <div className="col-sm-12">
        { this.state.user ? (
          this.state.user.events.map((item)=>{
            return(
              <EventCard data={item}
                onChangeStatus={this.ChangeStatus}
                owner="true"
              />
            );
          })
        ):(
            <div> Chargement </div>
        )}

        {
          this.state.groups ? (
            this.state.groups.map((item)=>{
              return(
                <EventCard data={item.event}
                  onChangeStatus={this.ChangeStatus}
                  owner="false"
                />
              )
            })
          ):(
            null
          )
        }
        </div>
      </div>
    </div>
    );
  }
}

export default MyEvent;
