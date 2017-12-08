import React, { Component } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';

class Opinion extends Component {
  constructor(){
    super();
    this.state = {
      comment: null,
      transmitter : null,
      recipient : null,
      disabled : true,
      redirect : null
    }
  }

  comment = () => {
    const cookies = new Cookies();
    const token = cookies.get('sport_token');

    if(this.state.comment && this.state.comment != "" && this.state.transmitter && this.state.recipient){
      axios.post('http://localhost:1337/opinion', {
        recipient : this.state.recipient,
        transmitter : this.state.transmitter,
        message : this.state.comment,
      },
      {
        crossdomain: true ,
        headers: {
           'Authorization': 'Bearer '+token
        }
      })
      .then((response) => {
        this.props.onChangeOpinion(true);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  componentDidMount(){
    const cookies = new Cookies();
    const recipient = this.props.recipient;
    const transmitter = cookies.get('sport_id');
    this.setState({
      transmitter : transmitter,
      recipient : recipient
    })
  }

  change = (e) =>{
    switch (e.target.name) {
      case "comment" :
        this.setState({comment : e.target.value})
        if(e.target.value != "")
          this.setState({disabled : false});
        else
          this.setState({disabled : true});
        break;
    }

  }

  render() {
    return (
        <div className="form-group">
          <label>Comment:</label>
          <textarea className="form-control" rows="5" name="comment" onChange={this.change}></textarea>
          <button type="button" className="btn btn-primary mt-3" disabled={this.state.disabled} onClick={this.comment}>Commenter</button>
        </div>
    );
  }
}

export default Opinion;
