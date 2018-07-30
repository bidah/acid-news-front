import React, { Component, Fragment } from 'react';
import Items from './Items';
import './App.css';
import { Link } from 'react-router-dom'
import burgerIcon from './images/bar-menu.svg';
class App extends Component {


  componentDidMount() {
    this.setLocalStorage();
  }

  setLocalStorage = () => {

    let readList = window.localStorage.getItem(
      window.navigator.userAgent.split(' ').join(''),
    )

    if(readList != null)
      return;

    window.localStorage.setItem(
      window.navigator.userAgent.split(' ').join(''),
      '[]'
    )
  }

  render() {
    return (
      <Fragment>
          <header className="App-header">
            <h1 className="App-title">Acid Hacker News</h1>
            <Link to="/menu">
              <img src={burgerIcon}/>
            </Link>
          </header>
        <Items/>
      </Fragment>
    );
  }
}

export default App;
