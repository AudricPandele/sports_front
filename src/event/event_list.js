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
        <div className="row">
          <div className="col-md-12">

          {this.state.data.map((item) => {
            return <Eventitem
              name={item.name}
              id={item.id}
              sport={item.sport ? item.sport.name : ''}
              picture={item.sport ? item.sport.picture : ''}
              level={item.level ? item.level.value : ''}
              place={item.place}
              number_of_participants = {item.number_of_participants}
              date={item.date}
            />
          })}
          </div>
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
