import React, { Component } from 'react';
import Eventitem from './event_item'
import axios from 'axios'

class Eventlist extends Component {

  constructor(){
    super();
    this.state = {
      data: null,
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1337/event')
    .then((response) => {
      this.setState({ data : response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if(this.state.data){
      return (
        <div className="row mr-0">

          {this.state.data.map((item) => {
            return <Eventitem
              name={item.name}
              id={item.id}
              sport={item.sport ? item.sport.name : ''}
              level={item.level ? item.level.value : ''}
              place={item.place}
              number_of_participants = {item.number_of_participants}
            />
          })}
        </div>
      );
    }
    else{
      return (
        <div>Chargement ... </div>
      );
    }
  }
}

export default Eventlist;
