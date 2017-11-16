import React, { Component } from 'react';

class ListUserItem extends Component {
  render() {
    return (
      <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
        <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/User_man_male_profile_account_person_people.png" className="profilePic" />
        {this.props.name}
      </a>
    )
  }
}

export default ListUserItem;
