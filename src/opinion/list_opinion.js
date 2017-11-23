import React, { Component } from 'react';
import axios from 'axios';
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
