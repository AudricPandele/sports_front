import React, { Component } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class EventHistory extends Component {
  constructor(){
    super();
    this.state = {
      user: null,
    }
  }

  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    axios.get('http://localhost:1337/user/'+this.props.user,
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

  render() {
    if(this.state.user){
      return(
          <div className="card">
            <div className="card-body">
              <img src={this.state.user.photo} className="profilePic mr-2" />
              {this.state.user.name}
            </div>
            <ul className="list-group list-group-flush">
              {this.state.user.events.map((item) => {
                return(
                  <Link to={"/event/"+item.id}>
                    <li className="list-group-item">
                      {item.name} le <Moment format="DD/MM/YYYY">{item.date}</Moment> à {item.place}
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
      );
    }
    else {
      return (<p>chargement</p>)
    }
  }
}

export default EventHistory;
