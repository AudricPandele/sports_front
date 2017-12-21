import React, { Component } from 'react'
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';
import Eventitem from './event_item';

class EventCard extends Component {

  constructor(){
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    this.getValue();
  }

  componentWillReceiveProps(newProps){
    this.getValue();
  }

  getValue = () =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.get('http://31.36.123.215:1337/event/'+this.props.data.id,
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

  updateStatus = (value, id) =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

     axios.put('http://31.36.123.215:1337/group/'+id,{
       status : value
     },
     {
       crossdomain: true ,
       headers: {
          'Authorization': 'Bearer '+token
       }
     })
     .then((response) => {
       this.props.onChangeStatus(true);
     })
     .catch(function (error) {
       console.log(error);
     });
  }

  render() {
    if(this.props.data){
      return(
        <div>
          <Eventitem
                name={this.props.data.name}
                id={this.props.data.id}
                sport={this.props.data.sport ? this.props.data.sport.name : ''}
                picture={this.props.data.sport ? this.props.data.sport.picture : ''}
                level={this.props.data.level ? this.props.data.level.value : ''}
                place={this.props.data.place}
                number_of_participants = {this.props.data.number_of_participants}
                date={this.props.data.date}
                owner={this.props.data.owner.name}
                owner_id={this.props.data.owner.id}
                key={'Eventitem'+this.props.data.id}
              />

          <ul className="list-group list-group-flush card">
            {this.state.user ? (
              this.state.user.participants.map((item)=>{
                return (
                  <li className="list-group-item">
                    <div className="row">
                      <div className="col-7">
                        <Link to={'user/'+item.user.id}>
                          <img src={item.user.photo} className="profilePic mr-2" />
                          {item.user.name}
                        </Link>
                      </div>
                      <div className="col-5">
                        {item.status.name != "En attente" ? (
                          <span className="badge badge-info float-right">{item.status.name}</span>
                        ):(
                          <div className="h-100">
                            <button type="button" className="btn btn-outline-success " onClick={() =>{ this.updateStatus(2 , item.id) }}>
                              <i className="material-icons">done</i>
                            </button>
                            <button type="button" className="btn btn-outline-danger ml-2" onClick={() =>{ this.updateStatus(3 , item.id) }}>
                              <i className="material-icons">clear</i>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })
            ):(
              ''
            )}
            <div className="card-body">
              <a href="#" className="card-link text-danger">Annuler</a>
            </div>
          </ul>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default EventCard;
