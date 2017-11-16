import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Eventitem extends Component {


  render() {
    return (
      <div className="col-11 col-xl-2 col-lg-3 col-md-4 mt-5 mx-auto">
        <div className="card">
          <div>
            <span className="cardDate">27/11</span>
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
    /*return (
      <div className="col-s-12 col-md-12 col-lg-3 mt-5">
        <div className="row">
          <div className="card col-sm-10 offset-sm-1">
            <div className="card-body">
              <div className="row">
                <div className="col-2">
                  <img className="mr-3 col-12" src="http://www.smadesep.com/cms/wp-content/uploads/anonyme.png" alt="Generic placeholder image" />
                </div>
                <div className="col-10">
                  <h4 className="card-title">{this.props.name} - {this.props.level}</h4>
                </div>
              </div>
              <div className="row">
                <div className="col-10">
                  <h6 className="text-muted"><b>{this.props.place}</b></h6>
                </div>
                <div className="col-2">
                  <span className="badge badge-pill bg-success">{this.props.number_of_participants}</span>
                </div>
              </div>
              <p className="card-text mb-4">{this.props.sport}</p>
              <Link to={"../event/"+this.props.id} className="btn btn-primary">Détails</Link>
            </div>
          </div>
        </div>
      </div>
    );*/
  }
}

export default Eventitem;
