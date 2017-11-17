import React, { Component } from 'react';
import Menu from '../home/menu';
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
    const cookies = new Cookies();
    const id = cookies.get('sport_id');
    axios.get('http://localhost:1337/user/'+id)
    .then((response) => {
      this.setState({user : response.data});

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  ChangeStatus = (value) =>{
    this.setState({actualise : this.state.actualise + 1});
  }

  render() {
    return (
      <div>
        <Menu />
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
    );
  }
}

export default MyEvent;
