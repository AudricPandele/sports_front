import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios'

class Check extends Component {

  constructor(){
    super();
    this.state = {
      result: null
    }
  }

  componentDidMount(){
    const cookies = new Cookies();
    const token = cookies.get('sport_token');
    const id = cookies.get('sport_id');
    axios.get('http://localhost:1337/user/'+id, {
    })
    .then((response) => {
      this.setState({result : true});
    })
    .catch(function (error) {
      console.log(error);
  });
  }

  render() {
    return (
      <div>
            {!this.state ? (
              <Redirect to='/' />
            ) : (
              <div>
                
              </div>
            )}
      </div>
    );
  }
}

export default Check;
