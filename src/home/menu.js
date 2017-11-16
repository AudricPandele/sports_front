import React, { Component } from 'react';
import Check from '../auth/Check';
import Cookies from 'universal-cookie';
import { Link } from 'react-router-dom';

class Menu extends Component {
  constructor(props){
    super(props);
  }

  render() {
  const cookies = new Cookies();
  const user_id = cookies.get('sport_id');

    return (
      <div>
        <Check />
        <nav className="navbar navbar-dark menu hidden-lg">
          <Link to={"/home"} className="navbar-brand">
            <i className="material-icons">home</i>
          </Link>
          <Link to={"/event"} className="navbar-brand">
            <i className="material-icons">event</i>
          </Link>
          <Link to={"/create_event"} className="navbar-brand">
            <i className="material-icons">add</i>
          </Link>
          <Link to={"/account"} className="navbar-brand">
            <i className="material-icons">account_circle</i>
          </Link>
          <Link to={"/logout"} className="navbar-brand">
            <i className="material-icons">power_settings_new</i>
          </Link>
        </nav>

        <nav className="navbar navbar-expand-lg navbar-dark menu hidden-md hidden-sm hidden-xs">
          <a className="navbar-brand" href="#">ABESTROS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className={this.props.active == 'home' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/home">Accueil <span className="sr-only">(current)</span></a>
              <a className={this.props.active == 'myEvent' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/event">Mes évenements</a>
              <a className={this.props.active == 'createEvent' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/create_event">Créer un évenement</a>
              <a className={this.props.active == 'account' ? 'nav-item nav-link active' : 'nav-item nav-link'} href={"/account/"+user_id}>Mon compte</a>
              <a className={this.props.active == 'logout' ? 'nav-item nav-link active' : 'nav-item nav-link'} href="/logout">Décconexion</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
