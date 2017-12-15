import React, { Component } from 'react';
import Menu from '../home/menu';
import Eventitem from './event_item';
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
    this.setState({actualise : this.state.actualise + 1});
  }

  render() {
    return (
      <div>
        <Menu active="myEvent"/>
        { this.state.user ? (
          this.state.user.events.map((item)=>{
            return(
              <div className="col-12 col-lg-4 mb-5" key={item.id}>
                <Eventitem
                  name={item.name}
                  id={item.id}
                  sport={item.sport ? item.sport.name : ''}
                  picture={item.sport ? item.sport.picture : ''}
                  level={item.level ? item.level.value : ''}
                  place={item.place}
                  number_of_participants = {item.number_of_participants}
                  date={item.date}
                  owner={item.owner.name}
                  owner_id={item.owner.id}
                  key={'Eventitem'+item.id}
                />
            </div>
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
