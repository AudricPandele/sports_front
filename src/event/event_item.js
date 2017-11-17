import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Eventitem extends Component {


  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <div>
            <span className="cardDate">
              <Moment format="DD/MM">
                {this.props.date}
              </Moment>
            </span>
            <img className="card-img-top" src={this.props.picture} alt="Card image cap"/>
            <span className="sportBadge">{this.props.level}</span>
          </div>
          <div className="card-body">
            <h2 className="card-title text-center">{this.props.name}</h2>
            <p className="card-text">{this.props.place}</p>
            <Link to={"../event/"+this.props.id} className="btn btn-card">Détails</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventitem;
