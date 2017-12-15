import React, { Component } from 'react';

class Select extends Component {
  handleChange  = (e) => {
    const selected = e.target.value;
    this.props.onSelectChange(selected);
  }

  render() {
    return (
      <div className="col-auto">
        <div className="input-group mb-2 mb-sm-0">
          <div className="input-group-addon"><i className="little-icon material-icons">{this.props.icon}</i></div>
          <select
            className="form-control custom-select"
            onChange={this.handleChange}>
            <option value="" disabled selected>{this.props.label}</option>
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
        </div>
      </div>
    );
  }
}

export default Select;
