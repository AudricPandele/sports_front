import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Eventitem extends Component {


  render() {
    return (
      <div className="col-sm-12 col-md-3 mt-5">
        <div className="row">
          <div className="card col-sm-10 offset-sm-1">
            <div className="card-body">
              <h4 className="card-title">{this.props.name} - {this.props.level}</h4>
              <h6 className="card-subtitle mb-2 text-muted">{this.props.place}</h6>
              <p className="card-text">{this.props.sport}</p>
              <a href={"../event/"+this.props.id} className="card-link">Détails</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventitem;
