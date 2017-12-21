import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Eventitem extends Component {


  render() {
    return (
      <div>
        <Link to={"../event/"+this.props.id} >
           <div className="thumbnail img-thumb-bg mb-0" style={{ backgroundImage: 'url('+this.props.picture+')' }}>
               <div className="overlay"></div>
               <div className="caption">
                {this.props.level === 'Débutant'? (
                  <div className="tag"><a className="bg-info">{this.props.level}</a></div>
                ):(null)}
                {this.props.level === 'Moyen'? (
                  <div className="tag"><a className="bg-warning">{this.props.level}</a></div>
                ):(null)}
                {this.props.level === 'Expert'? (
                  <div className="tag"><a className="bg-danger">{this.props.level}</a></div>
                ):(null)}
                   <div className="title"><Link to={"../event/"+this.props.id}>{this.props.name}</Link></div>
                   <div className="clearfix">
                       <span className="meta-data">Par <Link to={"../user/"+this.props.owner_id}>{this.props.owner}</Link> le &nbsp;
                       <Moment format="DD/MM/YYYY">
                           {this.props.date}
                       </Moment> à {this.props.hour+'h'+this.props.minutes}</span>
                   </div>
                   <div className="content">
                       <p>{this.props.place}</p>
                       <p>{this.props.description}</p>
                   </div>
               </div>
           </div>
        </Link>
      </div>
    );
  }
}

export default Eventitem;
