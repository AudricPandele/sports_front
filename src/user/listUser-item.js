import React, { Component } from 'react';

class ListUserItem extends Component {

    constructor(){
      super();
      this.state = {
        className: 'label',
      }
    }

    componentDidMount(){
      if(this.props.status){
        switch (this.props.status.name) {
          case 'En attente':
            this.setState({className : this.state.className + ' label-warning'});
            break;
          case 'Validé':
            this.setState({className : this.state.className + ' label-success'});
            break;
          case 'Refusé':
            this.setState({className : this.state.className + ' label-danger'});
            break;
        }
      }
    }

  render() {
    return (
      <a className="list-group-item list-group-item-action" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home">
        <div className="row">
          <div className="col-8">
            <img src="https://cdn2.iconfinder.com/data/icons/perfect-flat-icons-2/256/User_man_male_profile_account_person_people.png" className="profilePic" />
            {this.props.name}
          </div>
          <div className="col-4 text-right">
            {this.props.owner == "true" ? (
              <i className="material-icons text-warning float-right col-4">star_rate</i>
            ) : (
              <span className={this.state.className}>{this.props.status.name}</span>
            )}

          </div>
        </div>
      </a>
    )
  }
}

export default ListUserItem;
