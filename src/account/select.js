import React, { Component } from 'react';

class Select extends Component {
  render() {
    return (
      <select className="form-control">
        {!this.props.data ? (
          <div className="center">
            No {this.props.label} selected
          </div>
        ) : (
          <option value={this.props.value}>{this.props.name}</option>
        )}
      </select>
    );
  }
}

export default Select;
