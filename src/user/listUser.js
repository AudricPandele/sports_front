import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Menu from '../home/menu';
import axios from 'axios'
import ListUserItem from './listUser-item';

class ListUser extends Component {

  constructor(){
    super();
    this.state = {
      data : [],
      props : [],
      name : [],
      status: [],
    }
  }

  getUsr = (id, status, i) => {
   axios.get('http://localhost:1337/user/'+id)
   .then((response) => {
     let props = [];
     props.push(response.data.name);
     this.setState({ props : props });
   })
   .catch(function (error) {
     console.log(error);
   });
   //this.getStatus(status, i);
  }

  getStatus = (id, i) =>{
   axios.get('http://localhost:1337/status/'+id)
   .then((response) => {
     let props = this.state.props;
     let data = this.state.data;
     props.push(response.data.name);
     this.setState({ props : props });
     data.push(this.state.props);
     this.setState({ data : data})
   })
   .catch(function (error) {
     console.log(error);
   });
  }

  componentWillMount(){
    if(this.props.data){
      let i = 0;
      this.props.data.map((item) =>{
        this.getUsr(item.user,item.status, i);
        i++;
      })
    }
  }

  render() {
      if(this.state.props){
        return (
        <div className="col-12 col-sm-12 col-md-4 col-sm-offset-1 mt-5 mt-md-0">
          <div className="list-group" id="list-tab" role="tablist">
          {this.state.props.map((item) =>{
            return <ListUserItem name={item}/>
          })}
          </div>
        </div>
        );
      }
    else{ return ( <div> </div>);}
  }
}

export default ListUser;
