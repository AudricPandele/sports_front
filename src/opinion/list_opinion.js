import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class ListOpinion extends Component {

  constructor(){
    super();
    this.state = {
      data: null,
    }
  }

  getValue = () =>{
    axios.get('http://localhost:1337/opinion/'+this.props.recipient)
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
                  <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/User_man_male_profile_account_person_people.png" className="profilePic" />
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
