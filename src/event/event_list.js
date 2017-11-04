import React, { Component } from 'react';
import Eventitem from './event_item'
import axios from 'axios'

class Eventlist extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
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
    return (
      <div className="row">

        {this.state.data.map((item) => {
          return <Eventitem
            name={item.name}
            id={item.id}
          />
        })}
      </div>
    );
  }
}

export default Eventlist;
