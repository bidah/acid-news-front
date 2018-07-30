import React, { Component } from 'react';
import logo from './logo.svg';
import Items from './Items';
import './App.css';

class App extends Component {


  componentDidMount() {
    this.setLocalStorage();
  }

  // create user based on userAgent
  setLocalStorage = () => {
    window.localStorage.setItem(
      'user', 
      'testing_user'
      // window.navigator.userAgent.split(' ').join('')
    )
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Acid Hacker News</h1>
        </header>
        <Items/>
      </div>
    );
  }
}

export default App;
