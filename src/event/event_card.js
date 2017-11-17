import React, { Component } from 'react'
import Moment from 'react-moment';
import axios from 'axios';
import { Link } from 'react-router-dom';

class EventCard extends Component {

  constructor(){
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    axios.get('http://localhost:1337/event/'+this.props.data.id)
    .then((response) => {
      this.setState({user : response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if(this.props.data){
      return(
        <div className="col-sm-6 col-sm-offset-3 mt-5">
          <div className="row">
            <div className="card col-12">
              <div>
                <span className="cardDate">
                  <Moment format="DD/MM">
                    {this.props.data.date}
                  </Moment>
                </span>
                <img className="card-img-top" src="http://guinee7.com/wp-content/uploads/2017/11/football.jpg" alt="Card image cap"/>
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
                              <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/User_man_male_profile_account_person_people.png" className="profilePic" />
                              {item.user.name}
                            </Link>
                          </div>
                          <div className="col-4">
                            {item.status.name != "En attente" ? (
                              <span className="badge badge-info float-right">{item.status.name}</span>
                            ):(
                              <div>
                                <button type="button" className="btn btn-success">Valider</button>
                                <button type="button" className="btn btn-danger ml-5">Refuser</button>
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