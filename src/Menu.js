import React, { Component, Fragment } from 'react';
import './Menu.css';
import { Link } from 'react-router-dom'

class Menu extends Component {

  render() {
    return (
      <ul className="menu">
        <Link to="/">
          <li>Home</li>
        </Link>

        <Link to="/read-later">
          <li>Read Later Items</li>
        </Link>
      </ul>
    );
  }
}

export default Menu;
