import React, { Component } from 'react';
import Eventitem from './event_item';
import Toggle from './toggle';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './styles/style.css';

class Eventlist extends Component {

  constructor(){
    super();
    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    this.getInterests()
  }

  getInterests = () => {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.get(
      'http://localhost:1337/user/'+user_id+'/interests',
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
  	    }
      })
    .then((response) => {
      this.setState({ data : response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getAllEvents = () => {
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/event',
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.setState({ data : response.data });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  displayAppropriateEvents = (e) => {
    if (e.isChecked) {
      this.getAllEvents()
    }else{
      this.getInterests()
    }
  }

  render() {
    if(this.state.data){
      return (
          <div className="col-md-12">
            <div className="row">
              <div className="col-sm-12">
                <Toggle onToggleChange={this.displayAppropriateEvents}/>
              </div>
            </div>

          {this.state.data.map((item) => {
            return (
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
                description={item.description}
                key={'Eventitem'+item.id}
              />
            </div>
          )})}
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
