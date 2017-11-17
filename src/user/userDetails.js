import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

class userDetails extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    axios.get('http://localhost:1337/user/'+this.props.match.params.id)
    .then((response) => {
      this.setState({user : response.data});
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    if(this.state.user){
      return(
        <div>
          <Menu />
          <div className="col-sm-8 col-sm-offset-2">
            <div className="card">
              <div className="card-body">
                <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/User_man_male_profile_account_person_people.png" className="profilePic" />
                {this.state.user.name}
              </div>
              <ul className="list-group list-group-flush">
                {this.state.user.events.map((item) => {
                  return(
                    <Link to={"/event/"+item.id}>
                      <li className="list-group-item">
                          <span className="badge">{item.status.name}</span>
                        {item.name} le <Moment format="DD/MM/YYYY">{item.date}</Moment> à {item.place}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      );
    }
    else {
      return (<p>chargement</p>)
    }
  }
}

export default userDetails;
