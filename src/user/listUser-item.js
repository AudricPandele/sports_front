import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
      <div className="list-group-item list-group-item-action" id="list-home-list">
        <div className="row">
          <div className="col-8">
            <img src={this.props.photo} className="profilePic mr-2" />
            <Link to={"/user/"+this.props.userId}>
              {this.props.name}
            </Link>
          </div>
          <div className="col-4 text-right">
            {this.props.owner == "true" ? (
              <i className="material-icons text-warning float-right col-4">star_rate</i>
            ) : (
              <span className={this.state.className}>{this.props.status.name}</span>
            )}

          </div>
        </div>
      </div>
    )
  }
}

export default ListUserItem;
