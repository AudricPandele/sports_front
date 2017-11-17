import React, { Component } from 'react';

class Select extends Component {
  handleChange  = (e) => {
    const selected = e.target.value;
    this.props.onSelectChange(selected);
  }

  render() {
    return (
      <select
        className="form-control"
        onChange={this.handleChange}>
        <option></option>
        {!this.props.data ? (
          <div className="center">
            No {this.props.label} selected
          </div>
        ) : (
          this.props.data.map((item) => {
            return <option value={item.id}>{item.name ? item.name : item.value}</option>
          })
        )}
      </select>
    );
  }
}

export default Select;
