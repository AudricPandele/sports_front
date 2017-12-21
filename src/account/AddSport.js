import React, { Component } from 'react';
import Menu from './../home/menu.js';

class AddSport extends Component {
  render() {
    return (
      <div>
        <Menu active="account"/>

        <div className="row">
          <div className="col-sm-6 col-sm-offset-3">
            <div className="card text-center">
              <div className="card-header">
                Ajouter sport
              </div>
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-12" style={{marginBottom: '10px'}}>
                    <h3 className="card-title">My sports</h3><br/>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AddSport;
