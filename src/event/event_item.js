import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Eventitem extends Component {


  render() {
    return (
      <div>
        <Link to={"../event/"+this.props.id} >
          <div className="col-lg-4 col-md-4 col-sm-6">
             <div className="thumbnail img-thumb-bg" style={{ backgroundImage: 'url('+this.props.picture+')' }}>
                 <div className="overlay"></div>
                 <div className="caption">
                     <div className="tag">this.props.level}</div>
                     <div className="title"><Link to={"../event/"+this.props.id}>{this.props.name}</Link></div>
                     <div className="clearfix">
                         <span className="meta-data">By <Link to={"../user/"+this.props.owner_id}>{this.props.owner}</Link> on &nbsp;
                         <Moment format="DD/MM/YYYY">
                             {this.props.date}
                         </Moment></span>
                     </div>
                     <div className="content">
                         <p>{this.props.place}</p>
                     </div>
                 </div>
             </div>
          </div>
        </Link>
      </div>
    );
  }
}

export default Eventitem;
