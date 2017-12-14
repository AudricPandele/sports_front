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
      me : null,
      isFriend : false,
      token : null
    }
  }

  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    const id = cookies.get('sport_id');
    this.setState({
      me : id,
      token : token
    })

    axios.get('http://localhost:1337/user/'+this.props.user,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.setState({user : response.data});
      this.checkFriend()
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  addFriend = () =>{
    axios.post('http://localhost:1337/user/'+this.state.me+'/friends/',{
      id : this.props.user,
    },
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+this.state.token
      }
    })
    .then((response)=>{
      this.setState({isFriend : true})
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  checkFriend = () =>{
    axios.get('http://localhost:1337/user/'+this.state.me, {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+this.state.token
      }
    })
    .then((response)=>{
      response.data.friends.map((friend)=>{
        if(friend.id == this.state.user.id)
          this.setState({isFriend: true})
      });
    })
  }

  render() {
    if(this.state.user){
      return(
          <div className="card">
            <div className="card-body">
              <img src={this.state.user.photo} className="profilePic mr-2" />
              {this.state.user.name}
              {this.state.user.id != this.state.me ? (
                !this.state.isFriend ? (<button className="btn btn-primary float-right" onClick={this.addFriend}><i className="material-icons">person_add</i></button>)
                : (<div className="btn btn-success float-right"><i className="material-icons">person</i></div>)
              ):null}
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
