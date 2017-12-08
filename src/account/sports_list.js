import React, { Component } from 'react';
import Select from './select.js';
import axios from 'axios';
import Cookies from 'universal-cookie';

class SportsList extends Component {
  constructor(props){
    super(props);
    this.state = {
      sports: [],
      levels: [],
      newSport: null,
      newLevel: null,
    }
  }

  componentDidMount() {
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.get('http://localhost:1337/sport',
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.setState({
        sports: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('http://localhost:1337/level',
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.setState({
        levels: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  deleteList = (id) => {
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    axios.delete('http://localhost:1337/sportlist/'+id,
    {
      crossdomain: true ,
      headers: {
         'Authorization': 'Bearer '+token
      }
    })
    .then((response) => {
      this.props.onListUpdate(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleSportChange = (sport) => {
    this.setState({
      newSport: sport
    })
  }

  handleLevelChange = (level) => {
    this.setState({
      newLevel: level
    })
  }

  createNewList = () => {
    if (this.state.newSport && this.state.newLevel) {
      const cookies = new Cookies();
      const user_id = cookies.get('sport_id');
      const token = cookies.get('sport_token');

      axios.post('http://localhost:1337/user/'+user_id+'/sportlist', {
        sport: this.state.newSport,
        level: this.state.newLevel
      },
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response) => {
        this.props.onListUpdate(true)
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      alert('Sélectionnez un sport et un niveau')
    }
  }

  render() {

    return (
      <div className="col-sm-10 col-sm-offset-1">
        <ul className="list-group text-left">
        {this.props.data.length === 0 ? (
          <div className="center">
            <p>No sport selected</p>
          </div>
        ) : (
            this.props.data.map((item) => {
              return <div>
                <div className="col-sm-11">
                  <li className="list-group-item justify-content-between">
                    {item.sport.name}
                    <span className="badge badge-default badge-pill">{item.level.value}</span>
                  </li>
                </div>

                <div className="col-sm-1">
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => { this.deleteList(item.id) }}>
                    <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                  </button>
                </div>
              </div>
            })
        )}
        </ul>

        <h3>Nouveau sport</h3>

        <div className="row">
          <div className="col-sm-5 col-sm-offset-1">
            {this.state.sports.length === 0 ? (
              <p>loading</p>
            ) : (
              <Select
                data={this.state.sports}
                onSelectChange={this.handleSportChange}/>
            )}
          </div>
          <div className="col-sm-5">
            {this.state.levels.length === 0 ? (
              <p>loading</p>
            ) : (
              <Select
                data={this.state.levels}
                onSelectChange={this.handleLevelChange}/>
            )}
          </div>
        </div>
        <br/>
        <button
          className="btn btn-primary"
          onClick={this.createNewList}>
          Add sport
        </button>
      </div>
    );
  }
}

export default SportsList;
