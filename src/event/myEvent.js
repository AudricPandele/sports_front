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
      actualise : null
    }
  }

  componentDidMount(){
    this.getUserInfo()
  }

  getUserInfo = () => {
    const cookies = new Cookies();
    const id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/user/'+id,
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
        { this.state.user ? (
          this.state.user.events.map((item)=>{
            return(
              <EventCard data={item}
                onChangeStatus={this.ChangeStatus}
              />
            );
          })
        ):(
            <div> LOAD </div>
        )}
      </div>
    </div>
    );
  }
}

export default MyEvent;
