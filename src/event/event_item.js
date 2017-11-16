import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Eventitem extends Component {


  render() {
    return (
      <div className="col-11 col-xl-2 col-lg-3 col-md-4 mt-5 mx-auto">
        <div className="card">
          <div>
            <span className="cardDate">
              <Moment format="DD/MM">
                {this.props.date}
              </Moment>
            </span>
            <img className="card-img-top" src="http://guinee7.com/wp-content/uploads/2017/11/football.jpg" alt="Card image cap"/>
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
