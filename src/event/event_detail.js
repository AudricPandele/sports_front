import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios'

class Eventdetail extends Component {

  constructor(){
    super();
    this.state = {
      id: null,
      name: null
    }
  }

  componentDidMount(){
    this.setState({id : this.props.match.params.id});
    axios.get('http://localhost:1337/event/'+this.props.match.params.id)
    .then((response) => {
      this.setState({ name : response.data.name });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Menu />
        <div className="row">
          <div className="card col-sm-12 col-md-10 offset-md-1">
            <div className="card-body">
              <h4 className="card-title">{this.state.name}</h4>
              <p className="card-text">Détails</p>
              <a href="#" className="btn btn-primary">Postuler</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventdetail;
