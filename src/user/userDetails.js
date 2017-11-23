import React, { Component } from 'react';
import Menu from '../home/menu';
import Opinion from '../opinion/opinion';
import ListOpinion from '../opinion/list_opinion';
import EventHistory from '../event/event_history';

class userDetails extends Component {
  constructor(){
    super();
    this.state = {
      actualise: 0,
    }
  }

  ChangeOpinion = (value) =>{
    this.setState({actualise : this.state.actualise + 1});
  }

  render() {
    return(
      <div>
        <Menu />

        <div className="col-sm-8 col-sm-offset-2">
          <EventHistory user={this.props.match.params.id}/>
        </div>

        <div className="col-sm-8 col-sm-offset-2 mt-5">
          <div className="card">
            <div className="card-body">
              <Opinion recipient={this.props.match.params.id}
              onChangeOpinion={this.ChangeOpinion}/>
            </div>
            <ul className="list-group list-group-flush">
              <ListOpinion
                recipient={this.props.match.params.id}
                actualise={this.state.actualise}
              />
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default userDetails;
