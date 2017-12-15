import React, { Component } from 'react';
import ToggleButton from 'react-toggle';
import "react-toggle/style.css";

class Toggle extends Component {
  constructor(){
    super();
    this.state = {
      isChecked: false,
    }
  }

  handleChange  = (e) => {
    this.setState({
      isChecked: !this.state.isChecked
     }, function() {
       this.props.onToggleChange(this.state);
     }.bind(this));
  }

  render() {
    return (
      <label className='d-flex align-items-center'>
        <ToggleButton
          onChange={this.handleChange}
          icons={false} />
          <span className="ml-2">Afficher tous les évenements</span>
      </label>
    );
  }
}

export default Toggle;
