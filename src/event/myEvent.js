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
    this.setState({actualise : this.state.actualise + 1});
  }

  render() {
    return (
      <div>
        <Menu active="myEvent"/>

        <div className="col-md-12">
        { this.state.user ? (
          this.state.user.events.map((item)=>{
            return(
              <div className="col-12 col-lg-4 mb-5" key={item.id}>
                <EventCard data={item}
                  onChangeStatus={this.ChangeStatus}
                />
              </div>
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
