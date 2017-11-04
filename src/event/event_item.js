import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Eventitem extends Component {

  static propTypes = {
    item: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }

  render() {
    return (
      <div className="col-sm-12 col-md-3 mt-5">
        <div className="row">
          <div className="card col-sm-10 offset-sm-1">
            <div className="card-body">
              <h4 className="card-title">{this.props.name}- NIVEAU</h4>
              <h6 className="card-subtitle mb-2 text-muted">Date</h6>
              <p className="card-text">Lieu</p>
              <a href={"../event/"+this.props.id} className="card-link">Détails</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Eventitem;
