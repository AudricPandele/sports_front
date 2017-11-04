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
    if(id == null && token == null){
      this.setState({result : true});
    }
  }

  render() {
    if(this.state.result != null){
      return(<Redirect to='/login' />);
    }
    else{
      return (
        <div>
        </div>
      );
    }
  }
}

export default Check;
