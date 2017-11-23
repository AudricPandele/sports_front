import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

class Eventitem extends Component {


  render() {
    return (
      <div class="col-lg-4 col-md-4 col-sm-6">
         <div class="thumbnail img-thumb-bg" style={{ backgroundImage: 'url('+this.props.picture+')' }}>
             <div class="overlay"></div>
             <div class="caption">
                 <div class="tag"><a href="#">{this.props.level}</a></div>
                 <div class="title"><Link to={"../event/"+this.props.id}>{this.props.name}</Link></div>
                 <div class="clearfix">
                     <span class="meta-data">By <Link to={"../user/"+this.props.owner_id}>{this.props.owner}</Link> on &nbsp;
                     <Moment format="DD/MM/YYYY">
                         {this.props.date}
                     </Moment></span>
                 </div>
                 <div class="content">
                     <p>{this.props.place}</p>
                 </div>
             </div>
         </div>
      </div>
    );
  }
}

export default Eventitem;
