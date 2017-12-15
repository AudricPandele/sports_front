import React, { Component } from 'react';
import Eventitem from './event_item';
import Toggle from './toggle';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './styles/style.css';
import ReactQueryParams from 'react-query-params';
import { RingLoader } from 'react-spinners';

class Eventlist extends Component {

  constructor(){
    super();
    this.state = {
      data: null,
      city : null
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((success)=>{
      const latitude = success.coords.latitude
      const longitude = success.coords.longitude
      const key = 'AIzaSyDdfLDEUo2_Z6_UuZrVSuWKF-GsX93zyjs'
      const latlng = `${latitude},${longitude}`

      fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?key=${key}&latlng=${latlng}`)
        .then((res) => res.json())
        .then((json) => {
          if (json.status !== 'OK') {
            throw new Error(`Geocode error: ${json.status}`);
          }
          json.results[0].address_components.map((item)=>{
            if(item.types[0] === 'locality')
              this.setState({city : item.long_name})
          })
          this.getInterests()
        })
    },
    (error)=>{
      console.log(error);
    })
  }

  getInterests = () => {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');
    const token = cookies.get('sport_token');

    axios.get(
      'http://localhost:1337/user/'+user_id+'/interests/'+this.state.city,
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
      return (
        !this.state.data ? (
          <div className="center-div">
            <p>Localisation ...</p>
            <RingLoader
              className="text-center"
               color={'#2F5A75'}
             />
          </div>
        ) : (
          <div>
          <div className="col-sm-12 navbar navbar-light bg-light">
            <Toggle onToggleChange={this.displayAppropriateEvents}/>
          </div>
          <div className="col-md-12">
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
        </div>
        )
    );
  }
}

export default Eventlist;
