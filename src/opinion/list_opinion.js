import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Cookies from 'universal-cookie';

class ListOpinion extends Component {

  constructor(){
    super();
    this.state = {
      data: null,
    }
  }

  getValue = () =>{
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/opinion/'+this.props.recipient,
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

  componentDidMount(){
    this.getValue();
  }

  componentWillReceiveProps(newProps){
    this.getValue();
  }

  render() {
    return (
      <div>
        {this.state.data ? (
          this.state.data.map((item) => {
            return (
              <li className="list-group-item">
                <Link to={'/user/'+item.transmitter.id} >
                  <img src={item.transmitter.photo} className="profilePic mr-2" alt="Profile Picture"/>
                  <b>{item.transmitter.name} : </b>
                </Link>
                {item.message}
              </li>
            );
          })
        ):(
          <p>Chargement</p>
        )}
      </div>
    );
  }
}

export default ListOpinion;
