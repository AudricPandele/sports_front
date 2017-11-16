import React, { Component } from 'react';
import Select from './select.js';
import axios from 'axios';
import Cookies from 'universal-cookie';

class SportsList extends Component {
  constructor(){
    super();
    this.state = {
      sports: [],
      levels: [],
    }
  }

  componentDidMount() {
    axios.get('http://localhost:1337/sport')
    .then((response) => {
      this.setState({
        sports: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:1337/level')
    .then((response) => {
      this.setState({
        levels: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const cookies = new Cookies();
    const user_id = cookies.get('sport_id');

    return (
      <div>
        {this.props.data.length === 0 ? (
          <div className="center">
            <p>No sport selected</p>
          </div>
        ) : (
          this.props.data.map((item) => {
            return <div className="row text-left" style={{marginBottom: '10px'}}>
              <div class="col-sm-6 col-sm-offset-3">
                <div className="col-sm-6">
                  {this.state.sports.lenght == 0 ? (
                    <div className="center">
                      No sports
                    </div>
                  ) : (
                    <Select
                      name={item.sport.name}
                      value={item.sport.id}
                      data={this.state.sports}
                      label="sport"
                    />
                  )}
                </div>
                <div className="col-sm-6">
                  {this.state.levels.lenght == 0 ? (
                    <div className="center">
                      No levels
                    </div>
                  ) : (
                    <Select
                      name={item.level.value}
                      value={item.level.id}
                      data={this.state.levels}
                      label="level"
                    />
                  )}
                </div>
              </div>
            </div>
          })
        )}
        <a href="/add_sport" className="btn btn-primary">Add sport</a>
      </div>
    );
  }
}

export default SportsList;
