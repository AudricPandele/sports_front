import React, { Component } from 'react';
import Check from '../auth/Check'

class Menu extends Component {
  render() {
    return (
      <div>
        <Check />
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
          <a className="navbar-brand" href="#">ABESTROS</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active" href="/home">Accueil <span className="sr-only">(current)</span></a>
              <a className="nav-item nav-link" href="/event">Mes évenements</a>
              <a className="nav-item nav-link" href="/createEvent">Créer un évenement</a>
              <a className="nav-item nav-link" href="/account">Mon compte</a>
              <a className="nav-item nav-link" href="/logout">Décconexion</a>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Menu;
