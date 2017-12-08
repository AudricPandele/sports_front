import React, { Component } from 'react'
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

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
        <div className="col-sm-6 col-sm-offset-3">
          <div className="row">
            <div className="card col-12">
              <div>
                <span className="cardDate">
                  <Moment format="DD/MM">
                    {this.props.data.date}
                  </Moment>
                </span>
                <img className="card-img-top" src={this.props.data.sport.picture} alt="Card image cap"/>
                <span className="sportBadge">{this.props.data.level.value}</span>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item text-center"><h2>{this.props.data.name}</h2></li>
                {this.state.user ? (
                  this.state.user.participants.map((item)=>{
                    return (
                      <li className="list-group-item">
                        <div className="row">
                          <div className="col-8">
                            <Link to={'user/'+item.user.id}>
                              <img src={item.user.photo} className="profilePic mr-2" />
                              {item.user.name}
                            </Link>
                          </div>
                          <div className="col-4">
                            {item.status.name != "En attente" ? (
                              <span className="badge badge-info float-right">{item.status.name}</span>
                            ):(
                              <div className="h-100">
                                <button type="button" className="btn btn-outline-success h-100" onClick={() =>{ this.updateStatus(2 , item.id) }}>
                                  <i className="material-icons">done</i>
                                </button>
                                <button type="button" className="btn btn-outline-danger ml-2 h-100" onClick={() =>{ this.updateStatus(3 , item.id) }}>
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
              </ul>
              <div className="card-body">
                <a href="#" className="card-link text-danger">Annuler</a>
              </div>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}

export default EventCard;
