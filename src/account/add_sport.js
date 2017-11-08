import React, { Component } from 'react';
import Select from './select.js';
import axios from 'axios';
import Cookies from 'universal-cookie';

class AddSport extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   data: '',
    // }
  }

  // componentDidMount() {
  //   const sportList = this.props.data;
  //   if (sportList) {
  //     console.log(sportList);
  //     this.setState({
  //       data: sportList,
  //     })
  //   }
  // }

  render() {
    return (
      <div>
        {!this.props.data ? (
          <div className="center">
            Pas encore de sports sélectionnés.
          </div>
        ) : (
          this.props.data.map((item) => {
            return item.sport.name
          })
        )}

      </div>
    );
  }
}

export default AddSport;
