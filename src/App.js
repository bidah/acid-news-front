import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import Items from './Items';
import './App.css';

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
        </header>
        <Items/>
      </Fragment>
    );
  }
}

export default App;
