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
      actu: null,
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

    axios.get('http://localhost:1337/event/'+this.props.data.id,
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

  deleteEvent = (e) =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    axios.delete('http://localhost:1337/event/'+e.target.id,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((data)=>{
      this.props.onChangeStatus(true);
    })
  }

  updateStatus = (value, id) =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

     axios.put('http://localhost:1337/group/'+id,{
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
        <div className="col-4">
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
          {
            this.props.owner === "true" ? (
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
                    <button className="btn btn-danger" data-toggle="modal" data-target={"#confirmModal"+this.props.data.id}>
                      <i className="material-icons">delete_forever</i>
                    </button>

                    <div class="modal fade" id={"confirmModal"+this.props.data.id} tabindex="-1" role="dialog" aria-hidden="true">
                      <div class="modal-dialog" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Voulez-vous supprimer l'événement {this.props.data.name}?</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                          </div>
                          <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                            <button id={this.props.data.id} type="button" class="btn btn-danger" onClick={this.deleteEvent}>Supprimer</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </ul>
            ):(null)
          }

        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default EventCard;
