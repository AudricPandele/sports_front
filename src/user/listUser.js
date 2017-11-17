import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios'
import ListUserItem from './listUser-item';

class ListUser extends Component {

  render() {
      if(this.props.data){
        return (
        <div className="col-12 col-sm-12 col-md-4 col-sm-offset-1 mt-5 mt-md-0">
          <div className="list-group" id="list-tab" role="tablist">
            <ListUserItem userId={this.props.owner.id} name={this.props.owner.name} owner="true" />
          {this.props.data.map((item) =>{
            if(item.status.name != "Refusé")
              return <ListUserItem userId={item.user.id} name={item.user.name} owner="false" status={item.status}/>
          })}
          </div>
        </div>
        );
      }
    else{ return ( <div> </div>);}
  }
}

export default ListUser;
